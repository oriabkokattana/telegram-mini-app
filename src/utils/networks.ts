import { toast } from 'sonner';
import { openExternalLink } from './open-link';

export const NETWORK_TX_SCAN_MAP: Record<string, string> = {
  BSC: 'https://bscscan.com/tx/',
  ETH: 'https://etherscan.io/tx/',
  POLYGON: 'https://polygonscan.com/tx/',
};

export const onTxScan = (tx?: string, network?: string) => {
  if (tx && network && NETWORK_TX_SCAN_MAP[network]) {
    openExternalLink(NETWORK_TX_SCAN_MAP[network] + tx);
  } else {
    toast.error('Wrong network or transaction hash');
  }
};
