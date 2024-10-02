import { forwardRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import qrCodeLogo from '@/assets/ui/qr-code-logo.png';

export type QrCodeProps = {
  value: string;
  size: number;
};

export const QrCode = forwardRef<QRCode, QrCodeProps>(({ value, size }, forwardedRef) => {
  return (
    <QRCode
      ecLevel='H'
      value={value}
      qrStyle='dots'
      size={size - 24}
      style={{ borderRadius: 24 }}
      quietZone={12}
      eyeRadius={size}
      logoImage={qrCodeLogo}
      logoHeight={60}
      logoWidth={60}
      ref={forwardedRef}
    />
  );
});
