import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DialogTitle } from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import { Button, Card, Flex, IconButton, Skeleton } from '@radix-ui/themes';
import { usePopup, useUtils } from '@telegram-apps/sdk-react';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import Link from '@/modules/core/components/Link';
import { Dialog } from '@/modules/core/design-system/dialog';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/modules/core/design-system/dropdown';
import { Icon } from '@/modules/core/design-system/icon';
import { QrCode } from '@/modules/core/design-system/qr-code';
import { Text } from '@/modules/core/design-system/text';
import { useCustodialWallet } from '@/services/user/custodial-wallet/api';
import { useDepositStore } from '@/store/deposit-store';
import { transformAddress } from '@/utils/address';
import {
  trackCoinAndNetworkForDepositSelected,
  trackWalletAddressForDepositCopied,
  trackWalletAddressShared,
  trackWalletFullAddressViewed,
} from '@/utils/amplitude-events';
import { base64UrlEncode } from '@/utils/base64';
import { convertSeconds } from '@/utils/duration';

const UIDeposit = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = useDepositStore((state) => state.token);
  const network = useDepositStore((state) => state.network);
  const reset = useDepositStore((state) => state.reset);

  const { data: custodialWalletData, isLoading } = useCustodialWallet(network?.name);
  const isBottomGap = useCheckBottomGap();
  const utils = useUtils();
  const popup = usePopup();
  const navigate = useNavigate();

  useEffect(() => {
    if (popup.supports('open') && (!network || !token)) {
      popup
        .open({
          title: 'Oops, something went wrong',
          message: "It seems you didn't select network or token!",
        })
        .then(() => {
          navigate('/');
        });
    }
  }, []);

  const onCopyAddress = async (notify?: boolean) => {
    if (custodialWalletData?.address) {
      await navigator.clipboard.writeText(custodialWalletData?.address);
      if (notify) {
        toast.success('Copied to clipboard!');
      } else {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
      trackWalletAddressForDepositCopied();
    } else {
      toast.error('Custody wallet address not defined');
    }
  };

  const onViewFullAddress = () => {
    setAddressOpen(true);
    trackWalletFullAddressViewed();
  };

  const onShare = () => {
    utils.shareURL(
      `https://broker-api.kattana.trade/v1/internal/qr-code?data=${base64UrlEncode(custodialWalletData?.address)}`,
      `🏦 Wallet: ${'```' + custodialWalletData?.address + '```'}\n🌐 Network: ${network?.description} (${network?.name})`
    );
    trackWalletAddressShared();
  };

  const onDone = () => {
    trackCoinAndNetworkForDepositSelected(token?.symbol, network?.name);
    reset();
  };

  return (
    <Flex minHeight='100vh' direction='column' gap='6' px='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <Flex direction='column' align='center' gap='5'>
        <Text size='4' align='center' weight='bold' lineHeight='16px'>
          Deposit {token?.name}
        </Text>
        <QrCode value={custodialWalletData?.address} size={200} loading={isLoading} />
      </Flex>
      <Flex direction='column' align='center' gap='4'>
        {!custodialWalletData?.address || isLoading ? (
          <Skeleton width='200px' height='16px' />
        ) : (
          <Text size='3' weight='bold'>
            {transformAddress(custodialWalletData?.address)}
          </Text>
        )}
        <Flex justify='center' align='center' gap='2'>
          <Skeleton loading={isLoading}>
            <Button
              color={copied ? 'mint' : 'violet'}
              size='3'
              style={{ pointerEvents: copied ? 'none' : 'auto' }}
              onClick={() => onCopyAddress()}
            >
              <Icon name={copied ? 'circle-check' : 'copy'} variant={copied ? 'black' : 'white'} />
              <Text color={copied ? 'amber' : 'sky'} size='2' weight='bold' lineHeight='12px'>
                {copied ? 'Address Copied' : 'Copy Address'}
              </Text>
            </Button>
          </Skeleton>
          {isLoading ? (
            <Skeleton width='36px' height='36px' style={{ borderRadius: 'var(--radius-full)' }} />
          ) : (
            <Dropdown>
              <DropdownTrigger>
                <IconButton
                  color='gray'
                  variant='soft'
                  size='2'
                  style={{ height: '36px', width: '36px' }}
                >
                  <Icon name='ellipsis' variant='tertiary' />
                </IconButton>
              </DropdownTrigger>
              <DropdownContent width='182px' align='center' sideOffset={12}>
                <DropdownItem onSelect={onViewFullAddress}>
                  <Text color='bronze' size='2' lineHeight='12px'>
                    View full address
                  </Text>
                </DropdownItem>
                <DropdownItem onSelect={onShare}>
                  <Text color='bronze' size='2' lineHeight='12px'>
                    Share Info
                  </Text>
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          )}
          <Dialog asChild open={addressOpen} trigger={null} setOpen={setAddressOpen}>
            <Flex direction='column' gap='4' px='4'>
              <DialogTitle asChild>
                <Text size='4' align='center' weight='bold' lineHeight='16px'>
                  Full Address
                </Text>
              </DialogTitle>
              <Flex direction='column' gap='2'>
                <Card size='2' variant='classic'>
                  <Flex width='280px' justify='center' mx='auto'>
                    <Text
                      size='4'
                      weight='medium'
                      align='center'
                      lineHeight='24px'
                      wordBreak='break-word'
                    >
                      {custodialWalletData?.address}
                    </Text>
                  </Flex>
                </Card>
                <Button size='4' onClick={() => onCopyAddress(true)}>
                  <Text color='sky' size='3' weight='bold'>
                    Copy
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </Dialog>
        </Flex>
      </Flex>
      <Flex direction='column' gap='2'>
        <Flex justify='between' align='center' py='2'>
          <Text size='2' weight='medium' lineHeight='12px'>
            Deposit Network
          </Text>
          <Label.Root>
            <Flex asChild align='center' gap='2' maxWidth='250px'>
              <Link to='/deposit-network-select'>
                <Text size='2' weight='medium' lineHeight='12px'>
                  {network?.token_standard}
                </Text>
                <Text color='gray' size='1' weight='medium' truncate>
                  {network?.description} ({network?.name})
                </Text>
                <IconButton size='1' variant='ghost'>
                  <Icon name='chevron-down' />
                </IconButton>
              </Link>
            </Flex>
          </Label.Root>
        </Flex>
        <Flex justify='between' align='center' py='2'>
          <Text size='2' weight='medium' lineHeight='12px'>
            Fee
          </Text>
          <Flex align='center' gap='2'>
            <Text size='2' weight='medium' lineHeight='12px'>
              {network?.token_fee_percent}{' '}
              <Text color='gray' size='2' weight='medium' lineHeight='12px' style={{ top: 0 }}>
                %
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex justify='between' align='center' py='2'>
          <Text size='2' weight='medium' lineHeight='12px'>
            Minimum deposit
          </Text>
          <Flex align='center' gap='2'>
            <Text size='2' weight='medium' lineHeight='12px'>
              &gt;{network?.token_min_deposit}
            </Text>
            <Text color='gray' size='2' weight='medium' lineHeight='12px'>
              {token?.symbol}
            </Text>
          </Flex>
        </Flex>
        <Flex justify='between' align='center' py='2'>
          <Text size='2' weight='medium' lineHeight='12px'>
            Processing Time
          </Text>
          <Text size='2' weight='medium' lineHeight='12px'>
            {convertSeconds(network?.processing_time_seconds)}
          </Text>
        </Flex>
      </Flex>
      <Button asChild color='gray' variant='soft' size='4' mt='auto' onClick={onDone}>
        <Link to='/'>
          <Text color='brown' size='3' weight='bold'>
            Done
          </Text>
        </Link>
      </Button>
    </Flex>
  );
};

export default UIDeposit;
