import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Flex, Theme } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { Icon } from '../icon';

import { styles } from './Dialog.styles';

type Animation = 'appear' | 'hide';

export type DialogProps = {
  open: boolean;
  trigger: ReactNode;
  setOpen(value: boolean): void;
} & DialogPrimitive.DialogTriggerProps;

export const Dialog = forwardRef<HTMLButtonElement, DialogProps>(
  ({ open, trigger, children, setOpen, ...props }, forwardedRef) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [animation, setAnimation] = useState<Animation>('appear');

    const isBottomGap = useCheckBottomGap();

    const onOpenChange = (value: boolean) => {
      if (value === dialogOpen && value === open) {
        return;
      }
      if (!value) {
        setAnimation('hide');
        window.setTimeout(() => {
          setDialogOpen(value);
          setOpen(value);
        }, 300);
      } else {
        setAnimation('appear');
        setDialogOpen(value);
        setOpen(value);
      }
    };

    const swipeHandlers = useSwipeable({
      onSwipedDown: () => onOpenChange(false),
      trackMouse: true,
      preventScrollOnSwipe: true,
    });

    useEffect(() => {
      onOpenChange(open);
    }, [open]);

    return (
      <DialogPrimitive.Root open={dialogOpen} onOpenChange={onOpenChange}>
        <DialogPrimitive.Trigger {...props} ref={forwardedRef}>
          {trigger}
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay {...stylex.props(styles.overlay)} />
          <Theme accentColor='violet' grayColor='gray' radius='full'>
            <DialogPrimitive.Content
              {...stylex.props(styles.content, isBottomGap && styles.bottomGap, styles[animation])}
              aria-describedby={undefined}
            >
              <Flex width='100%' height='37px' justify='center' py='4' {...swipeHandlers}>
                <Icon name='collapse' variant='fill' />
              </Flex>
              {children}
            </DialogPrimitive.Content>
          </Theme>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
