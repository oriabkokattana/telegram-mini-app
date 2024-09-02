import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import ImagePlaceholderIcon from '@/assets/image-placeholder.svg?react';
import qrCode from '@/assets/qr-code.png';

import { styles } from './ScanQrCode.styles';

const ScanQrCode = () => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor('#F7F7F7');
    miniApp.setBgColor('#F7F7F7');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Scan QR Code</span>
        <ImagePlaceholderIcon />
      </div>
      <div {...stylex.props(styles.qrCodeFrame)}>
        <div {...stylex.props(styles.qrCodeWrapper)}>
          <img {...stylex.props(styles.qrCode)} src={qrCode} alt='QR Code' />
        </div>
      </div>
    </div>
  );
};

export default ScanQrCode;
