import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as Separator from '@radix-ui/react-separator';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import QrCodeIcon from '@/assets/qr-code.svg?react';
import ReceiptIcon from '@/assets/receipt.svg?react';
import Link from '@/modules/core/components/Link';
import UXChainSelectDialog, { ChainItem } from '@/modules/core/components/UXChainSelectDialog';
import { Button } from '@/modules/core/design-system/button';
import { Input } from '@/modules/core/design-system/input';
import { useWithdraw } from '@/services/user/withdraw/api';
import { useWithdrawStore } from '@/store/withdraw-store';

import { styles } from './UXWithdraw.styles';

const UXWithdraw = () => {
  const [chain, setChain] = useState<ChainItem>();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const params = useParams();
  const miniApp = useMiniApp();
  const { mutate } = useWithdraw();
  const token = useWithdrawStore((state) => state.token);
  const setStoreToken = useWithdrawStore((state) => state.setToken);
  const setStoreChain = useWithdrawStore((state) => state.setChain);

  useEffect(() => {
    miniApp.setHeaderColor('#F7F7F7');
    miniApp.setBgColor('#F7F7F7');
  }, []);

  useEffect(() => {
    if (params.asset) {
      setStoreToken(params.asset);
    }
  }, [params]);

  const onSetChain = (chain: ChainItem) => {
    setStoreChain(chain.value);
    setChain(chain);
  };

  const onSend = () => {
    if (isNaN(Number(amount)) || !chain || !address || !token) {
      toast.error('Please check if parameters are valid');
      return;
    }

    mutate({ token, amount: Number(amount), network: chain.value, destination_address: address });
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Withdraw {token}</span>
        <ReceiptIcon />
      </div>
      <Input
        size='md'
        variant='grey300'
        w='100%'
        label={`Address ${token}`}
        rightElement={
          <Link {...stylex.props(styles.addressAction)} to='/ux/qr-code'>
            <QrCodeIcon />
          </Link>
        }
        placeholder='Enter address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <UXChainSelectDialog onSelect={onSetChain}>
        <Input
          size='md'
          variant='grey300'
          w='100%'
          label='Network for withdrawal'
          rightElement={<ChevronDownIcon />}
          placeholder='Select Network'
          value={`${chain?.prefix ? `${chain.prefix} ` : ''}${chain?.name || ''}`}
          readOnly
        />
      </UXChainSelectDialog>
      <Input
        size='md'
        variant='grey300'
        w='100%'
        label='Amount'
        extraLabel={<span>Balance: $2,000</span>}
        rightElement={
          <div {...stylex.props(styles.amountAction)}>
            <span>{token}</span>
            <Separator.Root {...stylex.props(styles.separator)} orientation='vertical' />
            <span>MAX</span>
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
            <span {...stylex.props(styles.value)}>0</span>{' '}
            <span {...stylex.props(styles.currency)}>{token}</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Processing Time</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>4 minutes</span>
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
