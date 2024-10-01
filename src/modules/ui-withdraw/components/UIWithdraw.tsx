import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { isAddress } from 'viem';
import * as Label from '@radix-ui/react-label';
import { Button, Flex, IconButton, Separator } from '@radix-ui/themes';
import { useQRScanner } from '@telegram-apps/sdk-react';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TextField, TextFieldSlot } from '@/modules/core/design-system/text-field';
import { useAssetPrice } from '@/services/user/asset-price/api';
import { useWithdraw } from '@/services/user/withdraw/api';
import { useBalancesStore } from '@/store/balances-store';
import { useWithdrawStore } from '@/store/withdraw-store';
import { convertSecondsShort } from '@/utils/duration';
import { formatNumber, formatNumberWithCommas, transformCommaToDot } from '@/utils/numbers';
import { getAvailableBalance } from '@/utils/token-with-balance';
import WithdrawInProgress from './WithdrawInProgress';

const UIWithdraw = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const balances = useBalancesStore((state) => state.balances);
  const token = useWithdrawStore((state) => state.token);
  const network = useWithdrawStore((state) => state.network);

  const { data: assetPriceData } = useAssetPrice(token?.symbol);
  const withdraw = useWithdraw();
  const qrScanner = useQRScanner();
  const isBottomGap = useCheckBottomGap();

  useEffect(() => {
    if (withdraw.isSuccess) {
      setInProgress(true);
    }
  }, [withdraw.isSuccess]);

  const balance =
    token && network
      ? getAvailableBalance(balances[token.symbol]?.network_balances[network.name]).balance
      : 0;
  const priceUSD = Number(assetPriceData?.price_usd || 0);
  const tokenAmount = Number(amount) || 0;
  const tokenAmountUSD = tokenAmount * priceUSD;
  const duration = convertSecondsShort(network?.processing_time_seconds);
  const fee = tokenAmount * (network?.token_fee_percent || 0);

  const onQrScan = () => {
    qrScanner.open('Scan wallet address').then((text) => {
      if (text && isAddress(text)) {
        setAddress(text);
      } else {
        toast.error('Address not valid!');
      }
      qrScanner.close();
    });
  };

  const onAmountChange = (value: string) => {
    // Allow only numbers, commas, and dots
    const cleanedInput = value.replace(/[^0-9.,]/g, '');

    // Format the cleaned input: remove all commas except the last one and replace it with a dot
    const formattedValue = transformCommaToDot(cleanedInput);

    setAmount(formattedValue);
  };

  const onSend = async () => {
    if (!amount || isNaN(Number(amount)) || !network || !address || !token) {
      toast.error('Please check if parameters are valid');
      return;
    }

    if (!isAddress(address)) {
      toast.error('Address not valid');
      return;
    }

    if (Number(amount) > balance) {
      toast.error('Entered amount is bigger than available balance');
    }

    withdraw.mutate({
      token: token.symbol,
      amount: Number(amount),
      network: network.name,
      destination_address: address,
    });
  };

  if (inProgress) {
    return (
      <WithdrawInProgress
        token={token?.symbol}
        network={network?.description}
        amount={tokenAmount}
        amountUSD={tokenAmountUSD}
        fee={fee}
        duration={duration}
        address={address}
        isBottomGap={isBottomGap}
      />
    );
  }

  return (
    <Flex minHeight='100vh' direction='column' gap='5' px='4' pt='4' pb={isBottomGap ? '6' : '4'}>
      <Text size='4' align='center' weight='bold' lineHeight='16px'>
        Withdraw {token?.name}
      </Text>
      <Flex direction='column' gap='1'>
        <Text asChild size='1' weight='medium' lineHeight='10px'>
          <Label.Root htmlFor='address'>Address</Label.Root>
        </Text>
        <TextField value={address} onChange={setAddress} placeholder='Scan or paste address'>
          <TextFieldSlot />
          {qrScanner.supports('open') && (
            <TextFieldSlot>
              <IconButton variant='ghost' size='1' onClick={onQrScan}>
                <Icon name='qr-code' variant='secondary' />
              </IconButton>
            </TextFieldSlot>
          )}
        </TextField>
      </Flex>
      <Flex direction='column' gap='1'>
        <Text asChild size='1' weight='medium' lineHeight='10px'>
          <Label.Root htmlFor='address'>Network</Label.Root>
        </Text>
        <Link to='/withdraw-network-select'>
          <TextField value={network?.description} readOnly>
            <TextFieldSlot style={{ cursor: 'pointer' }} />
            <TextFieldSlot style={{ cursor: 'pointer' }}>
              <Icon name='chevron-down' variant='tertiary' />
            </TextFieldSlot>
          </TextField>
        </Link>
      </Flex>
      <Flex direction='column' gap='1'>
        <Flex justify='between' align='center'>
          <Text asChild size='1' weight='medium' lineHeight='10px'>
            <Label.Root htmlFor='address'>Amount</Label.Root>
          </Text>
          <Text asChild color='gray' size='1' weight='medium' lineHeight='10px'>
            <Label.Root htmlFor='address' onClick={() => setAmount(balance.toString())}>
              Balance: {formatNumber(balance)} {token?.symbol}
            </Label.Root>
          </Text>
        </Flex>
        <TextField
          value={amount}
          onChange={onAmountChange}
          placeholder={`Min ${network?.token_min_withdraw || 0}`}
          inputMode='decimal'
          pattern='[0-9,.]*'
        >
          <TextFieldSlot />
          <TextFieldSlot>
            <Flex gap='2' align='center'>
              <Text color='gold' size='2' weight='medium' lineHeight='12px'>
                {token?.symbol}
              </Text>
              <Button color='gold' variant='soft' onClick={() => setAmount(balance.toString())}>
                <Text color='plum' size='1' weight='medium' lineHeight='10px'>
                  MAX
                </Text>
              </Button>
            </Flex>
          </TextFieldSlot>
        </TextField>
      </Flex>
      <Flex direction='column' mt='auto'>
        <Separator size='4' mb='4' />
        <Flex direction='column' gap='2' mb='4'>
          <Flex height='20px' justify='between' align='center'>
            <Text size='2' weight='medium' lineHeight='12px'>
              Withdrawal
            </Text>
            <Flex maxWidth='250px'>
              <Text size='2' weight='bold' lineHeight='12px' truncate>
                {tokenAmount}{' '}
                <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                  {token?.symbol}
                  {tokenAmountUSD ? ` (~$${formatNumberWithCommas(tokenAmountUSD)})` : ''}
                </Text>
              </Text>
            </Flex>
          </Flex>
          <Flex height='20px' justify='between' align='center'>
            <Text size='2' weight='medium' lineHeight='12px'>
              Fee
            </Text>
            <Text size='2' weight='bold' lineHeight='12px'>
              {formatNumber(fee)}{' '}
              <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                {token?.symbol}
              </Text>
            </Text>
          </Flex>
          <Flex height='20px' justify='between' align='center'>
            <Text size='2' weight='medium' lineHeight='12px'>
              Processing Time
            </Text>
            <Text size='2' weight='bold' lineHeight='12px'>
              {duration.number}{' '}
              <Text color='gray' size='2' weight='bold' lineHeight='12px'>
                {duration.of}
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Button
          color='violet'
          size='4'
          loading={withdraw.isPending}
          disabled={!amount || Number(amount) > balance || !isAddress(address)}
          onClick={onSend}
        >
          <Text color='sky' size='3' weight='bold'>
            Send
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default UIWithdraw;
