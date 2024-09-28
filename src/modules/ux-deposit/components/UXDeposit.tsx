import { useEffect } from 'react';
import { toast } from 'sonner';
import * as stylex from '@stylexjs/stylex';
import { useUtils } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import CopyIcon from '@/assets/copy.svg?react';
import ReceiptIcon from '@/assets/receipt.svg?react';
import ThreeDotsIcon from '@/assets/three-dots.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import UXChainSelectDialog from '@/modules/core/components/UXChainSelectDialog';
import { Button } from '@/modules/core/design-system/button';
import { QrCode } from '@/modules/core/design-system/qr-code';
import { useCustodialWallet } from '@/services/user/custodial-wallet/api';
import { useNetworks } from '@/services/user/networks/api';
import { useDepositStore } from '@/store/deposit-store';
import { transformAddress } from '@/utils/address';
import { convertSeconds } from '@/utils/duration';

import { styles } from './UXDeposit.styles';

const UXDeposit = () => {
  const token = useDepositStore((state) => state.token);
  const chain = useDepositStore((state) => state.network);
  const setChain = useDepositStore((state) => state.setNetwork);

  const utils = useUtils();
  const { data: custodialWalletData } = useCustodialWallet(chain?.name);
  const { data: networksData } = useNetworks('deposit', token?.symbol);

  useSetAppBg('gray');

  useEffect(() => () => setChain(null), []);

  const onCopyAddress = () => {
    if (custodialWalletData?.address) {
      navigator.clipboard
        .writeText(custodialWalletData?.address)
        .then(() => toast.success('Copied to clipboard!'));
    } else {
      toast.error('Custody wallet address not defined');
    }
  };

  const onShare = () => {
    utils.shareURL('t.me/CryptoBrokerTGBot/app', custodialWalletData?.address);
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Deposit {token?.name}</span>
        <ReceiptIcon />
      </div>
      <div {...stylex.props(styles.qrCodeWrapper)}>
        {custodialWalletData?.address && <QrCode value={custodialWalletData.address} size={284} />}
      </div>
      <span {...stylex.props(styles.address)}>
        {transformAddress(custodialWalletData?.address)}
      </span>
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
          <UXChainSelectDialog
            data={networksData}
            token={token}
            chain={chain}
            direction='deposit'
            onSelect={setChain}
          >
            <div {...stylex.props(styles.networkWrapper)}>
              {chain?.token_standard && (
                <div {...stylex.props(styles.valueWrapper)}>
                  <span {...stylex.props(styles.value)}>{chain.token_standard}</span>
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
            <span {...stylex.props(styles.value)}>{chain?.token_fee_percent || 0}</span>{' '}
            <span {...stylex.props(styles.currency)}>%</span>
          </div>
        </div>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.label)}>Minimum deposit</span>
          <div {...stylex.props(styles.valueWrapper)}>
            <span {...stylex.props(styles.value)}>&gt;{chain?.token_min_deposit || 0}</span>{' '}
            <span {...stylex.props(styles.currency)}>{token?.symbol}</span>
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
      </div>
      <Button size='md' onClick={onShare} style={{ marginTop: 'auto' }}>
        Share
      </Button>
    </div>
  );
};

export default UXDeposit;
