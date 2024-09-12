import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as stylex from '@stylexjs/stylex';
import ChevronUpIcon from '@/assets/chevron-up.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import UXChartWithTimeframes from '@/modules/core/components/UXChartWithTimeframes';
import chartGraphic from '../media/chart-graphic.svg';
import chartPrice from '../media/chart-price.svg';

import { styles } from './PriceInfo.styles';

type Animation = 'appear' | 'hide';

interface PriceInfoProps {
  asset: string;
}

const PriceInfo = ({ asset }: PriceInfoProps) => {
  const [animation, setAnimation] = useState<Animation>('appear');
  const [open, setOpen] = useState(false);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setAnimation('hide');
      window.setTimeout(() => setOpen(value), 300);
    } else {
      setAnimation('appear');
      setOpen(value);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <div {...stylex.props(styles.base)}>
          <div {...stylex.props(styles.infoWrapper)}>
            <div {...stylex.props(styles.info)}>
              <span {...stylex.props(styles.label)}>Current price {asset}</span>
              <div {...stylex.props(styles.priceWrapper)}>
                <span>58 228,70 $</span>
                <span>-4.19%</span>
              </div>
            </div>
            <img {...stylex.props(styles.chart)} src={chartGraphic} alt='price chart' />
          </div>
          <ChevronUpIcon {...stylex.props(styles.chevronUpIcon)} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(styles.overlay)} />
        <Dialog.Content {...stylex.props(styles.dialog, styles[animation])}>
          <div {...stylex.props(styles.headerWrapper)}>
            <Dialog.Title {...stylex.props(styles.header)}>Current price {asset}</Dialog.Title>
            <Dialog.Close {...stylex.props(styles.close)}>
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Dialog.Description {...stylex.props(styles.priceInfo)}>
            <span {...stylex.props(styles.price)}>58 228,70 $</span>
            <span {...stylex.props(styles.change)}>+4.19%</span>
          </Dialog.Description>
          <UXChartWithTimeframes chartImage={chartPrice} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PriceInfo;
