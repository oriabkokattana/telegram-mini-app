import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as stylex from '@stylexjs/stylex';
import ArrowSwapHorizontal from '@/assets/arrow-swap-horizontal.svg?react';
import ProgressIcon from '@/assets/progress.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import { useSwap } from '@/services/user/swap/api';
import { useTradingStore } from '@/store/trading-store';
import graph from '../media/graph.svg';
import LogoBinanceIcon from '../media/logo-binance.svg?react';
import TradingInput from './TradingInput';

import { styles } from './UXSwap.styles';

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

const UXSwap = () => {
  const [baseAmount, setBaseAmount] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [baseInputFocused, setBaseInputFocused] = useState(false);
  const [quoteInputFocused, setQuoteInputFocused] = useState(false);
  const [percent, setPercent] = useState<BalancePercent>();

  const params = useParams();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSwap();
  const {
    base,
    baseBalance,
    quote,
    quoteBalance,
    setBase,
    setBaseBalance,
    setQuote,
    setQuoteBalance,
  } = useTradingStore();

  useSetAppBg('white');

  useEffect(() => {
    if (params.asset) {
      setBase(params.asset);
    }
  }, [params]);

  useEffect(() => {
    if (baseInputFocused) {
      const basePercent = (
        ((Number(baseAmount || 0) || 0) / baseBalance) *
        100
      ).toString() as BalancePercent;
      const isPresented = BALANCE_PERCENTS.includes(basePercent);
      if (isPresented) {
        setPercent(basePercent);
      } else {
        setPercent(undefined);
      }
    }
    if (quoteInputFocused) {
      const quotePercent = (
        ((Number(quoteAmount || 0) || 0) / quoteBalance) *
        100
      ).toString() as BalancePercent;
      const isPresented = BALANCE_PERCENTS.includes(quotePercent);
      if (isPresented) {
        setPercent(quotePercent);
      } else {
        setPercent(undefined);
      }
    }
  }, [baseInputFocused, quoteInputFocused, baseAmount, quoteAmount]);

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

  const onRotate = () => {
    setBase(quote);
    setBaseBalance(quoteBalance);
    setBaseAmount(quoteAmount);
    setQuote(base);
    setQuoteBalance(baseBalance);
    setQuoteAmount(baseAmount);
  };

  const mainButtonCallback = useCallback(() => {
    const amount = Number(baseAmount);
    if (!amount || !base || !quote) {
      toast.error('Please check if parameters are valid');
      return;
    }

    mutateAsync({ amountA: amount, tokenA: base, tokenB: quote });
  }, [baseAmount, base, quote]);

  useShowMainButton({
    variant: 'dark',
    text: 'Swap',
    loading: isPending,
    callback: mainButtonCallback,
  });

  return (
    <div {...stylex.props(styles.base, styles.smallGap)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Market Swap</span>
        <div {...stylex.props(styles.statistics)}>
          <div {...stylex.props(styles.stat)}>
            <span {...stylex.props(styles.label)}>{base}:</span>
            <span {...stylex.props(styles.statValue)}>$2,627.94 +0.10</span>
          </div>
          <div {...stylex.props(styles.stat)}>
            <span {...stylex.props(styles.label)}>{quote}:</span>
            <span {...stylex.props(styles.statValue)}>$1.00 +0.01%</span>
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.trading)}>
        <TradingInput
          type='base'
          balance={baseBalance}
          coin={base}
          value={baseAmount}
          onChange={setBaseAmount}
          onSetCoin={setBase}
          onFocus={() => setBaseInputFocused(true)}
          onBlur={() => setBaseInputFocused(false)}
        />
        <div {...stylex.props(styles.rotate)} onClick={onRotate}>
          <ArrowSwapHorizontal />
        </div>
        <TradingInput
          type='quote'
          balance={quoteBalance}
          coin={quote}
          value={quoteAmount}
          onChange={setQuoteAmount}
          onSetCoin={setQuote}
          onFocus={() => setQuoteInputFocused(true)}
          onBlur={() => setQuoteInputFocused(false)}
        />
      </div>
      <div {...stylex.props(styles.priceWrapper)}>
        <span {...stylex.props(styles.price)}>
          1 {base} = 3,191.35598 {quote}
        </span>
        <ProgressIcon />
      </div>
      <div {...stylex.props(styles.savingsWrapper)} onClick={() => navigate('/ux/token-graph')}>
        <div {...stylex.props(styles.savings)}>
          <span {...stylex.props(styles.title)}>Savings on this trade</span>
          <span {...stylex.props(styles.amount)}>1,000 $</span>
        </div>
        <div {...stylex.props(styles.graphWrapper)}>
          <img {...stylex.props(styles.graph)} src={graph} alt='Savings graph' />
        </div>
      </div>
      <div {...stylex.props(styles.benefitWrapper)}>
        <span {...stylex.props(styles.benefit)}>50% more more beneficial than</span>
        <LogoBinanceIcon />
      </div>
      <div
        {...stylex.props(
          styles.footer,
          !baseInputFocused && !quoteInputFocused ? styles.bottomGap : undefined
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
                {...stylex.props(styles.percent)}
                value={item}
                onMouseDown={(e) => e.preventDefault()}
              >
                <span {...stylex.props(styles.percentValue)}>{item}</span>
                <span {...stylex.props(styles.sign)}>%</span>
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        )}
      </div>
    </div>
  );
};

export default UXSwap;
