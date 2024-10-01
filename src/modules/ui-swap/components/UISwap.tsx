import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Big from 'big.js';
import { toast } from 'sonner';
import { DialogTitle } from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import { Dialog, DialogDescription } from '@/modules/core/design-system/dialog';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useAssetPrice } from '@/services/user/asset-price/api';
import { useSwap } from '@/services/user/swap/api';
import { useBalancesStore } from '@/store/balances-store';
import { useTradingStore } from '@/store/trading-store';
import { formatNumberWithCommas } from '@/utils/numbers';
import { getAvailableBalance } from '@/utils/token-with-balance';
import TradingInput from './TradingInput';

import { styles } from './UISwap.styles';

enum BalancePercent {
  twenty = '20',
  thirtyFive = '35',
  fifty = '50',
  oneHundred = '100',
}

const BALANCE_PERCENTS = [
  BalancePercent.twenty,
  BalancePercent.thirtyFive,
  BalancePercent.fifty,
  BalancePercent.oneHundred,
];

const UISwap = () => {
  const [baseInputFocused, setBaseInputFocused] = useState(false);
  const [quoteInputFocused, setQuoteInputFocused] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);

  const balances = useBalancesStore((state) => state.balances);
  const {
    base,
    baseAmount,
    quote,
    quoteAmount,
    setBase,
    setBaseAmount,
    setQuote,
    setQuoteAmount,
    rotate,
  } = useTradingStore();

  const { data: basePriceData } = useAssetPrice(base);
  const { data: quotePriceData } = useAssetPrice(quote);
  const swap = useSwap();
  const isBottomGap = useCheckBottomGap();
  const navigate = useNavigate();

  const baseAmountNumber = Big(baseAmount || 0);
  const basePriceUSD = Big(basePriceData?.price_usd || 0);
  const basePriceChangePercent = Big(basePriceData?.price_change_1h || 0);
  const baseAmountUSD = baseAmountNumber.times(basePriceUSD);
  const quoteAmountNumber = Big(quoteAmount || 0);
  const quotePriceUSD = Big(quotePriceData?.price_usd || 0);
  const quotePriceChangePercent = Big(quotePriceData?.price_change_1h || 0);
  const quoteAmountUSD = quoteAmountNumber.times(quotePriceUSD);
  const basePrice = quotePriceUSD.gt(0) ? basePriceUSD.div(quotePriceUSD) : Big(0);
  const baseBalance = base
    ? Big(getAvailableBalance(balances[base]?.total_balance).balance)
    : Big(0);
  const baseBalancePercent = baseBalance.gt(0)
    ? baseAmountNumber.div(baseBalance).times(100)
    : Big(0);
  const quotePrice = basePriceUSD.gt(0) ? quotePriceUSD.div(basePriceUSD) : Big(0);
  const quoteBalance = quote
    ? Big(getAvailableBalance(balances[quote]?.total_balance).balance)
    : Big(0);
  const quoteBalancePercent = quoteBalance.gt(0)
    ? quoteAmountNumber.div(quoteBalance).times(100)
    : Big(0);

  const fundEnabled = !!baseAmount && baseAmountNumber.gt(baseBalance);
  const swapEnabled = !!Number(baseAmount);

  const onSwap = useCallback(() => {
    const amount = Number(baseAmount);
    if (!amount || !base || !quote) {
      toast.error('Please check if parameters are valid');
      return;
    }

    swap.mutate({ amountA: amount, tokenA: base, tokenB: quote });
  }, [baseAmount, base, quote]);

  const onFund = useCallback(() => {
    navigate(`/?fund=${base}`);
  }, [base]);

  useShowMainButton({
    variant: swapEnabled || fundEnabled ? 'default' : 'disabled',
    text: fundEnabled ? 'Add Funds' : 'Swap',
    enabled: swapEnabled || fundEnabled,
    loading: swap.isPending,
    callback: fundEnabled ? onFund : onSwap,
  });

  useEffect(() => {
    if (
      baseAmountNumber.gt(baseBalance) &&
      !baseInputFocused &&
      !quoteInputFocused &&
      sessionStorage.getItem('funds-enabled') !== 'false'
    ) {
      setFundOpen(true);
    } else {
      setFundOpen(false);
    }
  }, [baseAmountNumber.gt(baseBalance), baseInputFocused, quoteInputFocused]);

  useEffect(() => {
    setQuoteAmount(baseAmountNumber.times(basePrice).toNumber().toString());
  }, [basePrice.toString()]);

  const onSetBaseAmount = (value: string) => {
    setBaseAmount(value);
    setQuoteAmount(Big(value).times(basePrice).toNumber().toString());
  };

  const onSetQuoteAmount = (value: string) => {
    setQuoteAmount(value);
    setBaseAmount(Big(value).times(quotePrice).toNumber().toString());
  };

  const onRotate = () => {
    setBaseAmount(quoteAmount);
    setQuoteAmount(baseAmount);
    rotate();
  };

  const onChangeBalancePercent = (value?: string) => {
    if (value) {
      return baseInputFocused
        ? onSetBaseAmount(baseBalance.times(value).div(100).toString())
        : onSetQuoteAmount(quoteBalance.times(value).div(100).toString());
    }
    return baseInputFocused ? onSetBaseAmount('0') : onSetQuoteAmount('0');
  };

  return (
    <Flex minHeight='100vh' direction='column' gap='5' px='4' pt='2' pb={isBottomGap ? '6' : '4'}>
      <Flex height='40px' align='center' px='7'>
        <Text size='4' weight='bold' lineHeight='16px' mx='auto'>
          Market Swap
        </Text>
      </Flex>
      <Flex direction='column' gap='2' position='relative'>
        <TradingInput
          type='base'
          error={baseAmountNumber.gt(baseBalance)}
          balance={baseBalance}
          priceUSD={basePriceUSD}
          priceChangePercent={basePriceChangePercent}
          amountUSD={baseAmountUSD}
          token={base}
          value={baseAmount}
          onChange={onSetBaseAmount}
          onSetCoin={setBase}
          onFocus={() => setBaseInputFocused(true)}
          onBlur={() => setBaseInputFocused(false)}
        />
        <Flex
          width='40px'
          height='40px'
          justify='center'
          align='center'
          position='absolute'
          top='50%'
          left='50%'
          {...stylex.props(styles.rotate)}
          onClick={onRotate}
        >
          <Icon name='rotate' variant='reverse-primary' />
        </Flex>
        <TradingInput
          type='quote'
          balance={quoteBalance}
          priceUSD={quotePriceUSD}
          priceChangePercent={quotePriceChangePercent}
          amountUSD={quoteAmountUSD}
          token={quote}
          value={quoteAmount}
          onChange={onSetQuoteAmount}
          onSetCoin={setQuote}
          onFocus={() => setQuoteInputFocused(true)}
          onBlur={() => setQuoteInputFocused(false)}
        />
        <Flex
          width='100%'
          py='2'
          position='absolute'
          bottom='0'
          left='0'
          {...stylex.props(
            styles.sample,
            baseInputFocused || quoteInputFocused ? styles.appear : undefined
          )}
        >
          {(baseInputFocused || quoteInputFocused) && (
            <ToggleGroup.Root
              {...stylex.props(styles.percentGroup)}
              type='single'
              aria-label='Select balance percent'
              value={
                quoteInputFocused ? quoteBalancePercent.toString() : baseBalancePercent.toString()
              }
              onValueChange={onChangeBalancePercent}
            >
              {BALANCE_PERCENTS.map((item) => (
                <ToggleGroup.Item
                  key={item}
                  {...stylex.props(styles.percent)}
                  value={item}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Text color='gold' size='1' weight='medium' lineHeight='10px'>
                    {item}
                  </Text>
                  <Text color='gray' size='1' lineHeight='10px'>
                    %
                  </Text>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          )}
        </Flex>
      </Flex>
      <Text color='gray' size='2' weight='medium' align='center' lineHeight='20px'>
        1 {base} = {formatNumberWithCommas(basePrice.toNumber())} {quote}
      </Text>
      <Text size='2' weight='medium' align='center' lineHeight='12px'>
        Savings on this trade: {formatNumberWithCommas(1000)} $
      </Text>
      <Dialog
        asChild
        open={fundOpen}
        trigger={null}
        setOpen={(value) => {
          if (!value) {
            sessionStorage.setItem('funds-enabled', 'false');
          }
          setFundOpen(value);
        }}
      >
        <Flex direction='column' gap='4' px='4'>
          <DialogTitle asChild>
            <Text size='4' align='center' weight='bold' lineHeight='16px'>
              Fund your account
            </Text>
          </DialogTitle>
          <DialogDescription asChild>
            <Text size='2' align='center' lineHeight='12px'>
              Make a {formatNumberWithCommas(baseAmountNumber.minus(baseBalance).toNumber())} {base}{' '}
              deposit to continue the swap
            </Text>
          </DialogDescription>
        </Flex>
      </Dialog>
    </Flex>
  );
};

export default UISwap;
