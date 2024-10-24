import { useRef, useState } from 'react';
import Big from 'big.js';
import * as Label from '@radix-ui/react-label';
import { Button, Checkbox, Flex, Separator } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import CircularTimer from '@/modules/core/components/CircularTimer';
import Link from '@/modules/core/components/Link';
import { Dialog, DialogDescription, DialogTitle } from '@/modules/core/design-system/dialog';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useAutoSwapStore } from '@/store/auto-swap-store';
import { formatNumberWithCommas } from '@/utils/numbers';
import check from '../media/check.gif';
import FromToLineIcon from '../media/from-to-line.svg?react';

import { styles } from './SwapDialog.styles';

import { SwapDialogType } from '@/types';

const CONFIRMATION_INTERVAL_SECONDS = 5;

const getAmountFontSize = (amount: string) => {
  if (amount.length > 12) {
    return '3';
  }
  if (amount.length > 9) {
    return '4';
  }
  return '5';
};

interface SwapDialogProps {
  base?: string;
  quote?: string;
  baseAmount: string;
  quoteAmount: string;
  basePrice: Big;
  missingFunds: Big;
  dialog: SwapDialogType;
  setDialog(dialog: SwapDialogType): void;
  onDialogClose(): void;
  onSwapConfirm(): void;
}

const SwapDialog = ({
  base,
  quote,
  baseAmount,
  quoteAmount,
  basePrice,
  missingFunds,
  dialog,
  setDialog,
  onDialogClose,
  onSwapConfirm,
}: SwapDialogProps) => {
  const [success, setSuccess] = useState(false);
  const [oneTimeDisable, setOneTimeDisable] = useState(false);
  const { enabled, toggleEnabled } = useAutoSwapStore();

  const savedBaseAmountRef = useRef('');
  const savedQuoteAmountRef = useRef('');

  const handleSwapConfirm = () => {
    savedBaseAmountRef.current = baseAmount;
    savedQuoteAmountRef.current = quoteAmount;
    setSuccess(true);
    onSwapConfirm();
  };

  const handleSwapCancel = () => {
    setDialog('none');
  };

  const dialogContent = () => {
    if (dialog === 'swap-confirmation') {
      if (success) {
        return (
          <Flex direction='column' align='center' gap='5' px='5' my='2'>
            <img src={check} alt='check gif' width={100} height={100} style={{ padding: 18 }} />
            <DialogTitle asChild>
              <Text size='4' align='center' weight='bold' lineHeight='24px'>
                Swap Successfully Submitted!
              </Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Flex direction='column'>
                <Text color='gray' size='2' align='center' weight='medium' lineHeight='20px'>
                  Give: {savedBaseAmountRef.current || baseAmount} {base}
                </Text>
                <Text color='gray' size='2' align='center' weight='medium' lineHeight='20px'>
                  Received: ~{formatNumberWithCommas(savedQuoteAmountRef.current || quoteAmount)}{' '}
                  {quote}
                </Text>
              </Flex>
            </DialogDescription>
            <Button asChild size='4' style={{ width: '100%' }}>
              <Link to='/analytics?tab=History'>
                <Text color='sky' size='3' weight='bold'>
                  View History
                </Text>
              </Link>
            </Button>
          </Flex>
        );
      }
      return (
        <Flex direction='column' gap='4' px='4' onClick={() => setOneTimeDisable(true)}>
          <DialogTitle asChild>
            <Text size='4' align='center' weight='bold' lineHeight='24px'>
              Confirm Swap
            </Text>
          </DialogTitle>
          <Flex align='center'>
            <Flex
              height='104px'
              flexGrow='1'
              flexShrink='1'
              flexBasis='0'
              align='center'
              direction='column'
              justify='between'
            >
              <Text color='gray' size='1' weight='medium' lineHeight='18px'>
                From
              </Text>
              <TokenIcon name={base} size='lg' variant='monochrome' />
              <Text size={getAmountFontSize(baseAmount)} weight='medium' lineHeight='26px'>
                {baseAmount}
              </Text>
            </Flex>
            <FromToLineIcon style={{ marginTop: 38 }} />
            <Flex
              height='104px'
              flexGrow='1'
              flexShrink='1'
              flexBasis='0'
              align='center'
              direction='column'
              justify='between'
            >
              <Text color='gray' size='1' weight='medium' lineHeight='18px'>
                To
              </Text>
              <TokenIcon name={quote} size='lg' variant='monochrome' />
              <Text size={getAmountFontSize(quoteAmount)} weight='medium' lineHeight='26px'>
                ~ {formatNumberWithCommas(quoteAmount)}
              </Text>
            </Flex>
          </Flex>
          <Separator size='4' />
          <Flex direction='column' gap='2'>
            <Flex height='28px' justify='between' align='center'>
              <Text color='gray' size='2' weight='medium' lineHeight='20px'>
                Type
              </Text>
              <Text size='2' weight='medium' lineHeight='20px'>
                Market Swap
              </Text>
            </Flex>
            <Flex height='28px' justify='between' align='center'>
              <Text color='gray' size='2' weight='medium' lineHeight='20px'>
                Fee
              </Text>
              <Flex height='28px' align='center' px='3' {...stylex.props(styles.badge)}>
                <Text color='violet' size='2' weight='bold' lineHeight='20px'>
                  0 {base}
                </Text>
              </Flex>
            </Flex>
            <Flex height='28px' justify='between' align='center'>
              <Text color='gray' size='2' weight='medium' lineHeight='20px'>
                Rate
              </Text>
              <Text size='2' weight='medium' lineHeight='20px'>
                1 {base} = {formatNumberWithCommas(basePrice)} {quote}
              </Text>
            </Flex>
          </Flex>
          <Separator size='4' />
          <Flex justify='between' align='center'>
            <Flex asChild height='48px' align='center' gap='2' style={{ cursor: 'pointer' }}>
              <Label.Root>
                <Checkbox size='1' checked={!enabled} onCheckedChange={toggleEnabled} />
                <Text size='2' weight='medium' lineHeight='20px'>
                  Don't use autoswap
                </Text>
              </Label.Root>
            </Flex>
            {enabled && !oneTimeDisable && (
              <CircularTimer
                interval={CONFIRMATION_INTERVAL_SECONDS}
                onComplete={handleSwapConfirm}
              />
            )}
          </Flex>
          {(!enabled || oneTimeDisable) && (
            <Flex align='center' gap='4'>
              <Button
                color='gray'
                variant='soft'
                size='4'
                onClick={handleSwapCancel}
                style={{ flex: 1 }}
              >
                <Text color='brown' size='3' weight='bold'>
                  Cancel
                </Text>
              </Button>
              <Button size='4' onClick={handleSwapConfirm} style={{ flex: 1 }}>
                <Text color='sky' size='3' weight='bold'>
                  Confirm Swap
                </Text>
              </Button>
            </Flex>
          )}
        </Flex>
      );
    }
    if (dialog === 'funds') {
      return (
        <Flex direction='column' gap='4' px='4'>
          <DialogTitle asChild>
            <Text size='4' align='center' weight='bold' lineHeight='16px'>
              Fund your account
            </Text>
          </DialogTitle>
          <DialogDescription asChild>
            <Text size='2' align='center' lineHeight='12px'>
              Make a {formatNumberWithCommas(missingFunds)} {base} deposit to continue the swap
            </Text>
          </DialogDescription>
        </Flex>
      );
    }
    if (dialog === 'min-exceeded') {
      return (
        <Flex direction='column' gap='4' px='4'>
          <DialogTitle asChild>
            <Text size='4' align='center' weight='bold' lineHeight='16px'>
              Oooops...
            </Text>
          </DialogTitle>
          <DialogDescription asChild>
            <Text size='2' align='center' lineHeight='12px'>
              Minimum amount for swap 5 USD
            </Text>
          </DialogDescription>
        </Flex>
      );
    }
    return null;
  };

  return (
    <Dialog
      asChild
      open={dialog !== 'none'}
      trigger={null}
      setOpen={(value) => {
        if (!value) {
          onDialogClose();
          setSuccess(false);
          setOneTimeDisable(false);
          setDialog('none');
        } else {
          setDialog(dialog);
        }
      }}
    >
      {dialogContent()}
    </Dialog>
  );
};

export default SwapDialog;
