import { useEffect, useRef, useState } from 'react';
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

import { styles } from './UXWithdraw.styles';

const UXWithdraw = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'token' | 'usdt'>('usdt');
  const popupTriggeredRef = useRef(false);

  const token = useWithdrawStore((state) => state.token);
  const chain = useWithdrawStore((state) => state.chain);
  const setChain = useWithdrawStore((state) => state.setChain);
  const getBalanceByTokenAndChain = useBalancesStore((state) => state.getBalanceByTokenAndChain);

  const { mutate } = useWithdraw();
  const { data: networksData } = useNetworks('withdraw', token?.symbol);

  useSetAppBg('gray');

  const utils = useUtils();
  const popup = usePopup();
  const qrScanner = useQRScanner();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      console.log(utils.supports('readTextFromClipboard'));

      if (chain && utils.supports('readTextFromClipboard') && !popupTriggeredRef.current) {
        popupTriggeredRef.current = true;
        utils.readTextFromClipboard().then((text) => {
          console.log(text);

          if (text && isAddress(text)) {
            popup
              .open({
                title: 'Use copied address!',
                message: 'Do you want to use copied address for withdraw?',
                buttons: [{ type: 'ok', id: 'ok' }, { type: 'close' }],
              })
              .then((id) => id === 'ok' && setAddress(text));
          }
        });
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [chain]);

  const onSend = () => {
    if (isNaN(Number(amount)) || !chain || !address || !token) {
      toast.error('Please check if parameters are valid');
      return;
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

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Withdraw {token?.name}</span>
        <ReceiptIcon />
      </div>
      <Input
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
      />
      <UXChainSelectDialog
        data={networksData}
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
              ? getBalanceByTokenAndChain(token?.symbol || '', chain?.name || '')?.balance || 0
              : `$${getBalanceByTokenAndChain(token?.symbol || '', chain?.name || '')?.balance_usd || 0}`}
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
                setAmount(
                  (
                    getBalanceByTokenAndChain(token?.symbol || '', chain?.name || '')?.balance || 0
                  ).toString()
                )
              }
            >
              MAX
            </span>
          </div>
        }
        placeholder='Min 0'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div {...stylex.props(styles.descriptionWrapper)}>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Fee</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>{chain?.token_fee_percent}</span>{' '}
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
