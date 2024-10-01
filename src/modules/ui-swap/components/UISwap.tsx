import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Flex } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { useShowMainButton } from '@/hooks/use-show-main-button';
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
  const [percent, setPercent] = useState<BalancePercent>();

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

  const basePriceUSD = Number(basePriceData?.price_usd || 0);
  const basePriceChangePercent = Number(basePriceData?.price_change_1h || 0);
  const baseAmountUSD = (Number(baseAmount) || 0) * basePriceUSD;
  const quotePriceUSD = Number(quotePriceData?.price_usd || 0);
  const quotePriceChangePercent = Number(quotePriceData?.price_change_1h || 0);
  const quoteAmountUSD = (Number(quoteAmount) || 0) * quotePriceUSD;
  const basePrice = quotePriceUSD ? basePriceUSD / quotePriceUSD : 0;
  const baseBalance = base ? getAvailableBalance(balances[base]?.total_balance).balance : 0;
  const quoteBalance = quote ? getAvailableBalance(balances[quote]?.total_balance).balance : 0;

  const swapEnabled = !!Number(baseAmount) && Number(baseAmount) <= baseBalance;

  const onSwap = useCallback(() => {
    const amount = Number(baseAmount);
    if (!amount || !base || !quote) {
      toast.error('Please check if parameters are valid');
      return;
    }

    swap.mutate({ amountA: amount, tokenA: base, tokenB: quote });
  }, [baseAmount, base, quote]);

  useShowMainButton({
    variant: swapEnabled ? 'default' : 'disabled',
    text: 'Swap',
    enabled: swapEnabled,
    loading: swap.isPending,
    callback: onSwap,
  });

  useEffect(() => {
    if (baseInputFocused) {
      const baseAmountNumber = Number(baseAmount) || 0;
      const basePercent = ((baseAmountNumber / baseBalance) * 100).toString() as BalancePercent;
      const isPresented = BALANCE_PERCENTS.includes(basePercent);
      if (isPresented) {
        setPercent(basePercent);
      } else {
        setPercent(undefined);
      }
    }
    if (quoteInputFocused) {
      const quoteAmountNumber = Number(quoteAmount) || 0;
      const quotePercent = ((quoteAmountNumber / quoteBalance) * 100).toString() as BalancePercent;
      const isPresented = BALANCE_PERCENTS.includes(quotePercent);
      if (isPresented) {
        setPercent(quotePercent);
      } else {
        setPercent(undefined);
      }
    }
  }, [baseInputFocused, quoteInputFocused, baseAmount, quoteAmount]);

  useEffect(() => {
    const baseAmountNumber = Number(baseAmount) || 0;
    if (baseAmount) {
      setQuoteAmount((baseAmountNumber * basePrice).toString());
    }
  }, [baseAmount, basePrice]);

  useEffect(() => {
    const quoteAmountNumber = Number(quoteAmount) || 0;
    if (quoteAmount) {
      setBaseAmount((quoteAmountNumber / basePrice).toString());
    }
  }, [quoteAmount, basePrice]);

  const onChangeBalancePercent = (value?: string) => {
    if (value) {
      if (baseInputFocused) {
        return setBaseAmount(((baseBalance * Number(value)) / 100).toString());
      }
      return setQuoteAmount(((quoteBalance * Number(value)) / 100).toString());
    }
    if (baseInputFocused) {
      return setBaseAmount('0');
    }
    return setQuoteAmount('0');
  };

  return (
    <Flex minHeight='100vh' direction='column' gap='5' px='4' pt='2' pb={isBottomGap ? '6' : '4'}>
      <Flex height='40px' align='center' pl='7'>
        <Text size='4' weight='bold' lineHeight='16px' mx='auto'>
          Market Swap
        </Text>
      </Flex>
      <Flex direction='column' gap='2' position='relative'>
        <TradingInput
          type='base'
          error={Number(baseAmount) > baseBalance}
          balance={baseBalance}
          priceUSD={basePriceUSD}
          priceChangePercent={basePriceChangePercent}
          amountUSD={baseAmountUSD}
          token={base}
          value={baseAmount}
          onChange={setBaseAmount}
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
          onClick={rotate}
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
          onChange={setQuoteAmount}
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
              value={percent}
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
        1 {base} = {formatNumberWithCommas(basePrice)} {quote}
      </Text>
      <Text size='2' weight='medium' align='center' lineHeight='12px'>
        Savings on this trade: {formatNumberWithCommas(1000)} $
      </Text>
    </Flex>
  );
};

export default UISwap;
