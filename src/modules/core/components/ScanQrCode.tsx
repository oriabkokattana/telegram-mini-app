import * as stylex from '@stylexjs/stylex';
import ImagePlaceholderIcon from '@/assets/image-placeholder.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import { QrCode } from '../design-system/qr-code';

import { styles } from './ScanQrCode.styles';

const ScanQrCode = () => {
  useSetAppBg('gray');

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Scan QR Code</span>
        <ImagePlaceholderIcon />
      </div>
      <div {...stylex.props(styles.qrCodeFrame)}>
        <div {...stylex.props(styles.qrCodeWrapper)}>
          <QrCode value='0x84dB9A9baee9159CC3923161aaF491EEb91c4C4F' size={305} />
        </div>
      </div>
    </div>
  );
};

export default ScanQrCode;
