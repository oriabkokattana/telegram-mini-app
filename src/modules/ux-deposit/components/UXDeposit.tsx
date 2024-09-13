import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as stylex from '@stylexjs/stylex';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import CopyIcon from '@/assets/copy.svg?react';
import qrCode from '@/assets/qr-code.png';
import ReceiptIcon from '@/assets/receipt.svg?react';
import ThreeDotsIcon from '@/assets/three-dots.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import UXChainSelectDialog, { ChainItem } from '@/modules/core/components/UXChainSelectDialog';
import { Button } from '@/modules/core/design-system/button';
import { useCustodialWallet } from '@/services/user/custodial-wallet/api';
import { useDepositStore } from '@/store/deposit-store';
import { transformAddress } from '@/utils/address';

import { styles } from './UXDeposit.styles';

const UXDeposit = () => {
  const [chain, setChain] = useState<ChainItem>();

  const params = useParams();
  const { data } = useCustodialWallet(chain?.value);
  const token = useDepositStore((state) => state.token);
  const storeChain = useDepositStore((state) => state.chain);
  const setStoreToken = useDepositStore((state) => state.setToken);
  const setStoreChain = useDepositStore((state) => state.setChain);

  useSetAppBg('gray');

  useEffect(() => {
    if (params.asset) {
      setStoreToken(params.asset);
    }
  }, [params]);

  const onSetChain = (chain: ChainItem) => {
    setStoreChain(chain.value);
    setChain(chain);
  };

  const onCopyAddress = () => {
    if (data?.address) {
      navigator.clipboard
        .writeText(data?.address)
        .then(() => toast.success('Copied to clipboard!'));
    } else {
      toast.error('Custody wallet address not defined');
    }
  };

  const onShare = () => {
    toast.success('Shared');
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Deposit {token}</span>
        <ReceiptIcon />
      </div>
      <div {...stylex.props(styles.qrCodeWrapper)}>
        <img {...stylex.props(styles.qrCode)} src={qrCode} alt='QR Code' />
      </div>
      <span {...stylex.props(styles.address)}>{transformAddress(data?.address)}</span>
      <div {...stylex.props(styles.actions)}>
        <Button size='sm' onClick={onCopyAddress}>
          <CopyIcon />
          <span>Copy Address</span>
        </Button>
        <Button size='sm'>
          <ThreeDotsIcon />
        </Button>
      </div>
      <div {...stylex.props(styles.descriptionWrapper)}>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Deposit Network</span>
          <UXChainSelectDialog chain={storeChain} onSelect={onSetChain}>
            <div {...stylex.props(styles.networkWrapper)}>
              {chain?.prefix && (
                <div {...stylex.props(styles.valueWrapper)}>
                  <span {...stylex.props(styles.value)}>{chain.prefix}</span>
                </div>
              )}
              <span {...stylex.props(styles.network)}>{chain?.name || 'Select Network'}</span>
              <ChevronDownIcon />
            </div>
          </UXChainSelectDialog>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Fee</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>0</span>{' '}
            <span {...stylex.props(styles.currency)}>{token}</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Minimum deposit</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>&gt;0.01</span>{' '}
            <span {...stylex.props(styles.currency)}>{token}</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Processing Time</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>4 minutes</span>
          </div>
        </div>
      </div>
      <Button size='md' onClick={onShare} style={{ marginTop: 'auto' }}>
        Share
      </Button>
    </div>
  );
};

export default UXDeposit;
