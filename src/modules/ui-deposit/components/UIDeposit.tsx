import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Box, Button, Card, Flex, IconButton } from '@radix-ui/themes';
import { useUtils } from '@telegram-apps/sdk-react';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import Link from '@/modules/core/components/Link';
import { Dialog } from '@/modules/core/design-system/dialog';
import { Icon } from '@/modules/core/design-system/icon';
import { QrCode } from '@/modules/core/design-system/qr-code';
import { Text } from '@/modules/core/design-system/text';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/modules/core/design-system/ui-dropdown';
import { useCustodialWallet } from '@/services/user/custodial-wallet/api';
import { useDepositStore } from '@/store/deposit-store';
import { splitAddress, transformAddress } from '@/utils/address';
import { convertSeconds } from '@/utils/duration';

const UIDeposit = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = useDepositStore((state) => state.token);
  const network = useDepositStore((state) => state.network);
  const reset = useDepositStore((state) => state.reset);
  const isBottomGap = useCheckBottomGap();

  const utils = useUtils();
  const { data: custodialWalletData } = useCustodialWallet(network?.name);

  const onCopyAddress = async (notify?: boolean) => {
    if (custodialWalletData?.address) {
      await navigator.clipboard.writeText(custodialWalletData?.address);
      if (notify) {
        toast.success('Copied to clipboard!');
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Custody wallet address not defined');
    }
  };

  const onShare = () => {
    utils.shareURL('t.me/CryptoBrokerTGBot/app', custodialWalletData?.address);
  };

  return (
    <Flex minHeight='100vh' direction='column' gap='6' px='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <Flex direction='column' align='center' gap='5'>
        <Text size='4' align='center' weight='bold' lineHeight='16px'>
          Deposit {token?.symbol}
        </Text>
        <Box width='200px' height='200px'>
          {custodialWalletData?.address && (
            <QrCode value={custodialWalletData.address} size={200} />
          )}
        </Box>
      </Flex>
      <Flex direction='column' align='center' gap='4'>
        <Flex height='16px'>
          <Text size='3' weight='bold'>
            {transformAddress(custodialWalletData?.address)}
          </Text>
        </Flex>
        <Flex justify='center' gap='2'>
          <Button color={copied ? 'mint' : 'violet'} size='3' onClick={() => onCopyAddress()}>
            <Icon name={copied ? 'circle-check' : 'copy'} variant={copied ? 'black' : 'white'} />
            <Text color={copied ? 'amber' : 'sky'} size='2' weight='bold' lineHeight='12px'>
              {copied ? 'Address Copied' : 'Copy Address'}
            </Text>
          </Button>
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
              <DropdownItem onClick={() => setAddressOpen(true)}>
                <Text color='bronze' size='2' lineHeight='12px'>
                  View full address
                </Text>
              </DropdownItem>
              <DropdownItem onClick={onShare}>
                <Text color='bronze' size='2' lineHeight='12px'>
                  Share Info
                </Text>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
          <Dialog asChild open={addressOpen} trigger={null} setOpen={setAddressOpen}>
            <Flex direction='column' gap='4' px='4'>
              <DialogTitle asChild>
                <Text size='4' align='center' weight='bold' lineHeight='16px'>
                  Full Address
                </Text>
              </DialogTitle>
              <Flex direction='column' gap='2'>
                <Card size='2' variant='classic'>
                  <Flex direction='column' align='center' gap='2'>
                    {splitAddress(custodialWalletData?.address).map((row, rowIndex) => (
                      <Flex key={rowIndex} align='center' gap='2'>
                        {row.map((item, itemIndex) => (
                          <Text
                            key={`${rowIndex}-${itemIndex}`}
                            color='plum'
                            size='4'
                            weight='medium'
                            lineHeight='16px'
                          >
                            {[...item].map((symbol, symbolIndex) =>
                              isNaN(Number(symbol)) ? (
                                <Text
                                  key={`${rowIndex}-${itemIndex}-${symbolIndex}`}
                                  color='brown'
                                  size='4'
                                  weight='medium'
                                  lineHeight='16px'
                                >
                                  {symbol}
                                </Text>
                              ) : (
                                <Fragment key={`${rowIndex}-${itemIndex}-${symbolIndex}`}>
                                  {symbol}
                                </Fragment>
                              )
                            )}
                          </Text>
                        ))}
                      </Flex>
                    ))}
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
          <Flex align='center' gap='2' maxWidth='200px'>
            <Text size='2' weight='medium' lineHeight='12px'>
              {network?.token_standard}
            </Text>
            <Text color='gray' size='2' weight='medium' lineHeight='12px' truncate>
              {network?.description} ({network?.name})
            </Text>
          </Flex>
        </Flex>
        <Flex justify='between' align='center' py='2'>
          <Text size='2' weight='medium' lineHeight='12px'>
            Fee
          </Text>
          <Flex align='center' gap='2'>
            <Text size='2' weight='medium' lineHeight='12px'>
              {network?.token_fee_percent}{' '}
              <Text color='gray' size='2' weight='medium' lineHeight='12px'>
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
      <Button asChild color='gray' variant='soft' size='4' mt='auto' onClick={reset}>
        <Link to='/ui-main'>
          <Text color='brown' size='3' weight='bold'>
            Done
          </Text>
        </Link>
      </Button>
    </Flex>
  );
};

export default UIDeposit;
