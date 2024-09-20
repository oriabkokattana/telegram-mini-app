import { ReactNode, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as Dialog from '@radix-ui/react-dialog';
import * as stylex from '@stylexjs/stylex';
import AlertCircleIcon from '@/assets/alert-circle.svg?react';
import CollapseIcon from '@/assets/collapse.svg?react';
import { convertSeconds } from '@/utils/duration';

import { styles } from './UXChainSelectDialog.styles';

import { ChainItem, TokenItem } from '@/types';

type Animation = 'appear' | 'hide';

interface UXChainSelectDialogProps {
  data?: ChainItem[];
  token: TokenItem | null;
  chain: ChainItem | null;
  direction: 'deposit' | 'withdraw';
  children: ReactNode;
  onSelect(network: ChainItem): void;
}

const UXChainSelectDialog = ({
  data,
  token,
  chain,
  direction,
  children,
  onSelect,
}: UXChainSelectDialogProps) => {
  const [animation, setAnimation] = useState<Animation>('appear');
  const [open, setOpen] = useState(true);

  const onOpenChange = (value: boolean, select?: boolean) => {
    if (!value) {
      if (chain || select) {
        setAnimation('hide');
        window.setTimeout(() => setOpen(value), 300);
      }
    } else {
      setAnimation('appear');
      setOpen(value);
    }
  };

  const handleSelect = (chain: ChainItem) => {
    onSelect(chain);
    onOpenChange(false, true);
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
                Select the network you will use to {direction} your
              </span>{' '}
              <span {...stylex.props(styles.token)}>{token?.name}</span>
              <span {...stylex.props(styles.warning)}>
                . Using the wrong network will result in a loss of funds.
              </span>
            </Dialog.Description>
          </div>
          {data?.map((chain) => (
            <div
              {...stylex.props(styles.chainWrapper)}
              key={chain.name}
              onClick={() => handleSelect(chain)}
            >
              <span
                {...stylex.props(styles.chain)}
              >{`${chain.name}${chain.token_standard ? ` ${chain.token_standard}` : ''}`}</span>
              <span {...stylex.props(styles.description)}>
                {convertSeconds(chain.processing_time_seconds)}
              </span>
              <span {...stylex.props(styles.description)}>
                {direction === 'deposit' ? chain.min_deposit_usd : chain.min_withdraw_usd}{' '}
                {token?.symbol} minimum
              </span>
            </div>
          ))}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UXChainSelectDialog;
