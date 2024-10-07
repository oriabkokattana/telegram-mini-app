import { forwardRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Skeleton } from '@radix-ui/themes';
import qrCodeLogo from '@/assets/qr-code-logo.png';

export type QrCodeProps = {
  value?: string;
  size: number;
  loading: boolean;
};

export const QrCode = forwardRef<QRCode, QrCodeProps>(({ value, size, loading }, forwardedRef) => {
  if (loading || !value) {
    return <Skeleton width={`${size}px`} height={`${size}px`} style={{ borderRadius: 24 }} />;
  }
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
