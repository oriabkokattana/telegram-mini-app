import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { isAddress } from 'viem';
import * as Separator from '@radix-ui/react-separator';
import * as stylex from '@stylexjs/stylex';
import { usePopup, useQRScanner, useUtils } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import QrCodeIcon from '@/assets/qr-code.svg?react';
import ReceiptIcon from '@/assets/receipt.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import UXChainSelectDialog from '@/modules/core/components/UXChainSelectDialog';
import { Button } from '@/modules/core/design-system/button';
import { Input } from '@/modules/core/design-system/input';
import { useNetworks } from '@/services/user/networks/api';
import { useWithdraw } from '@/services/user/withdraw/api';
import { useBalancesStore } from '@/store/balances-store';
import { useWithdrawStore } from '@/store/withdraw-store';
import { convertSeconds } from '@/utils/duration';
import { transformCommaToDot } from '@/utils/numbers';

import { styles } from './UXWithdraw.styles';

const UXWithdraw = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'token' | 'usdt'>('usdt');
  const addressRef = useRef<HTMLInputElement>(null);
  const pasteTriggeredRef = useRef(false);

  const token = useWithdrawStore((state) => state.token);
  const chain = useWithdrawStore((state) => state.network);
  const setChain = useWithdrawStore((state) => state.setNetwork);
  const getActualBalanceByTokenAndChain = useBalancesStore(
    (state) => state.getActualBalanceByTokenAndChain
  );
  const getTotalUSDBalanceByTokenAndChain = useBalancesStore(
    (state) => state.getTotalUSDBalanceByTokenAndChain
  );

  const { mutate } = useWithdraw();
  const { data: networksData } = useNetworks('withdraw', token?.symbol);

  const networksWithBalance = useMemo(
    () =>
      networksData?.filter((item) => !!getActualBalanceByTokenAndChain(token?.symbol, item.name)),
    [networksData, token]
  );

  useEffect(() => () => setChain(null), []);

  useSetAppBg('gray');

  const utils = useUtils();
  const popup = usePopup();
  const qrScanner = useQRScanner();

  const onPasteAddress = () => {
    if (!pasteTriggeredRef.current && utils.supports('readTextFromClipboard')) {
      pasteTriggeredRef.current = true;
      utils
        .readTextFromClipboard()
        .then((text) => {
          if (text && isAddress(text)) {
            popup
              .open({
                title: 'Use copied address!',
                message: 'Do you want to use copied address for withdraw?',
                buttons: [{ type: 'ok', id: 'ok' }, { type: 'close' }],
              })
              .then((id) => {
                if (id === 'ok') {
                  setAddress(text);
                  addressRef.current?.blur();
                }
              });
          }
        })
        .catch((e) => console.error(e));
    }
  };

  const onSend = () => {
    if (isNaN(Number(amount)) || !chain || !address || !token) {
      toast.error('Please check if parameters are valid');
      return;
    }

    if (!isAddress(address)) {
      toast.error('Address not valid');
      return;
    }

    const currentBalance = getActualBalanceByTokenAndChain(token?.symbol, chain?.name);

    if (Number(amount) > currentBalance) {
      toast.error('Entered amount is bigger than available balance');
    }

    mutate({
      token: token.symbol,
      amount: Number(amount),
      network: chain.name,
      destination_address: address,
    });
  };

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

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow only numbers, commas, and dots
    const cleanedInput = input.replace(/[^0-9.,]/g, '');

    // Format the cleaned input: remove all commas except the last one and replace it with a dot
    const formattedValue = transformCommaToDot(cleanedInput);

    setAmount(formattedValue);
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Withdraw {token?.name}</span>
        <ReceiptIcon />
      </div>
      <Input
        ref={addressRef}
        size='md'
        variant='grey300'
        w='100%'
        label={`Address ${token?.symbol}`}
        rightElement={
          qrScanner.supports('open') ? (
            <QrCodeIcon {...stylex.props(styles.click)} onClick={onQrScan} />
          ) : undefined
        }
        placeholder='Enter address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onClick={onPasteAddress}
      />
      <UXChainSelectDialog
        data={networksWithBalance?.length ? networksWithBalance : networksData}
        token={token}
        chain={chain}
        direction='withdraw'
        onSelect={setChain}
      >
        <Input
          size='md'
          variant='grey300'
          w='100%'
          label='Network for withdrawal'
          rightElement={<ChevronDownIcon />}
          placeholder='Select Network'
          value={`${chain?.token_standard ? `${chain.token_standard} ` : ''}${chain?.name || ''}`}
          readOnly
        />
      </UXChainSelectDialog>
      <Input
        size='md'
        variant='grey300'
        w='100%'
        label='Amount'
        extraLabel={
          <span>
            Balance:{' '}
            {currency === 'token'
              ? getActualBalanceByTokenAndChain(token?.symbol, chain?.name)
              : `$${getTotalUSDBalanceByTokenAndChain(token?.symbol, chain?.name)}`}
          </span>
        }
        rightElement={
          <div {...stylex.props(styles.amountAction)}>
            <span
              {...stylex.props(styles.click)}
              onClick={() => setCurrency(currency === 'token' ? 'usdt' : 'token')}
            >
              {currency === 'token' ? 'USD' : token?.symbol}
            </span>
            <Separator.Root {...stylex.props(styles.separator)} orientation='vertical' />
            <span
              {...stylex.props(styles.click)}
              onClick={() =>
                setAmount(getActualBalanceByTokenAndChain(token?.symbol, chain?.name).toString())
              }
            >
              MAX
            </span>
          </div>
        }
        placeholder='Min 0'
        inputMode='decimal'
        pattern='[0-9,.]*'
        value={amount}
        onChange={onAmountChange}
      />
      <div {...stylex.props(styles.descriptionWrapper)}>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Fee</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>{chain?.token_fee_percent || 0}</span>{' '}
            <span {...stylex.props(styles.currency)}>%</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Processing Time</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>
              {convertSeconds(chain?.processing_time_seconds)}
            </span>
          </div>
        </div>
        <Button size='md' onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default UXWithdraw;
