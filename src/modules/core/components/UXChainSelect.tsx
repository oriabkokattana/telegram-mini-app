import { ReactNode, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as Dialog from '@radix-ui/react-dialog';
import * as stylex from '@stylexjs/stylex';
import AlertCircleIcon from '@/assets/alert-circle.svg?react';
import CollapseIcon from '@/assets/collapse.svg?react';

import { styles } from './UXChainSelect.styles';

type Animation = 'appear' | 'hide';

const NETWORK_LIST = [
  { name: 'Tron (TRC20)', time: '4 minutes', minimum: '>0.01 USDT minimum' },
  { name: 'Ethereum (ERC20)', time: '4 minutes', minimum: '>0.01 USDT minimum' },
  { name: 'Toncoin', time: '5 minutes', minimum: '>0.01 USDT minimum' },
  { name: 'Polygon', time: '6 minutes', minimum: '>0.01 USDT minimum' },
];

interface UXChainSelectProps {
  children: ReactNode;
}

const UXChainSelect = ({ children }: UXChainSelectProps) => {
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

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onOpenChange(false),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(styles.overlay)} />
        <Dialog.Content {...stylex.props(styles.base, styles[animation])}>
          <div {...swipeHandlers} {...stylex.props(styles.collapseWrapper)}>
            <CollapseIcon {...stylex.props(styles.collapseIcon)} />
          </div>
          <Dialog.Title {...stylex.props(styles.header)}>Select Network</Dialog.Title>
          <div {...stylex.props(styles.warningBlock)}>
            <AlertCircleIcon {...stylex.props(styles.alertCircleIcon)} />
            <Dialog.Description {...stylex.props(styles.warningWrapper)}>
              <span {...stylex.props(styles.warning)}>
                Select the network you will use to deposit your
              </span>{' '}
              <span {...stylex.props(styles.token)}>USDT</span>
              <span {...stylex.props(styles.warning)}>
                . Using the wrong network will result in a loss of funds.
              </span>
            </Dialog.Description>
          </div>
          {NETWORK_LIST.map((chain) => (
            <div
              {...stylex.props(styles.chainWrapper)}
              key={chain.name}
              onClick={() => onOpenChange(false)}
            >
              <span {...stylex.props(styles.chain)}>{chain.name}</span>
              <span {...stylex.props(styles.description)}>{chain.time}</span>
              <span {...stylex.props(styles.description)}>{chain.minimum}</span>
            </div>
          ))}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UXChainSelect;
