import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import CopyIcon from '@/assets/copy.svg?react';
import qrCode from '@/assets/qr-code.png';
import ReceiptIcon from '@/assets/receipt.svg?react';
import ThreeDotsIcon from '@/assets/three-dots.svg?react';
import UXChainSelect, { ChainItem } from '@/modules/core/components/UXChainSelect';
import { Button } from '@/modules/core/design-system/button';
import { useCustodialWallet } from '@/services/user/custodial-wallet/api';
import { useDepositStore } from '@/store/deposit-store';
import { transformAddress } from '@/utils/address';

import { styles } from './UXDeposit.styles';

const UXDeposit = () => {
  const [chain, setChain] = useState<ChainItem>();

  const miniApp = useMiniApp();
  const { data } = useCustodialWallet(chain?.value);
  const setStoreChain = useDepositStore((state) => state.setChain);

  useEffect(() => {
    miniApp.setHeaderColor('#F7F7F7');
    miniApp.setBgColor('#F7F7F7');
  }, []);

  const onSetChain = (chain: ChainItem) => {
    setStoreChain(chain.value);
    setChain(chain);
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Deposit USDT</span>
        <ReceiptIcon />
      </div>
      <div {...stylex.props(styles.qrCodeWrapper)}>
        <img {...stylex.props(styles.qrCode)} src={qrCode} alt='QR Code' />
      </div>
      <span {...stylex.props(styles.address)}>{transformAddress(data?.address)}</span>
      <div {...stylex.props(styles.actions)}>
        <Button size='sm'>
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
          <UXChainSelect onSelect={onSetChain}>
            <div {...stylex.props(styles.networkWrapper)}>
              {chain?.prefix && (
                <div {...stylex.props(styles.valueWrapper)}>
                  <span {...stylex.props(styles.value)}>{chain.prefix}</span>
                </div>
              )}
              <span {...stylex.props(styles.network)}>{chain?.name}</span>
              <ChevronDownIcon />
            </div>
          </UXChainSelect>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Fee</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>0</span>{' '}
            <span {...stylex.props(styles.currency)}>USDT</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Minimum deposit</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>&gt;0.01</span>{' '}
            <span {...stylex.props(styles.currency)}>USDT</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Processing Time</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>4 minutes</span>
          </div>
        </div>
      </div>
      <Button size='md'>Save Image</Button>
    </div>
  );
};

export default UXDeposit;
