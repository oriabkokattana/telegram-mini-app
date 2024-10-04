import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Big from 'big.js';
import { toast } from 'sonner';
import { DialogTitle } from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Flex, IconButton, Separator } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { useShowMainButton } from '@/hooks/use-show-main-button';
import HomeButton from '@/modules/core/components/HomeButton';
import { Dialog, DialogDescription } from '@/modules/core/design-system/dialog';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useAssetPrice } from '@/services/user/asset-price/api';
import { useSwap } from '@/services/user/swap/api';
import { useBalancesStore } from '@/store/balances-store';
import { useDepositStore } from '@/store/deposit-store';
import { useTradingStore } from '@/store/trading-store';
import { formatNumberWithCommas } from '@/utils/numbers';
import { getAvailableBalance } from '@/utils/token-with-balance';
import TradingInput from './TradingInput';

import { styles } from './UISwap.styles';

const DEFAULT_TRADING_BASE_TOKEN = 'USDT';
const DEFAULT_TRADING_BASE_TOKEN_NAME = 'Tether USD';

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
  const [savingsOpen, setSavingsOpen] = useState(false);
  const rotateRef = useRef<HTMLDivElement>(null);
  const fundsEnabledRef = useRef(true);

  const balances = useBalancesStore((state) => state.balances);
  const setDepositToken = useDepositStore((state) => state.setToken);
  const {
    base,
    baseName,
    baseAmount,
    quote,
    quoteAmount,
    setBase,
    setBaseAmount,
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

  const fundEnabled = !!base && !!baseAmount && baseAmountNumber.gt(baseBalance);
  const swapEnabled = !!base && !!quote && !!Number(baseAmount);

  const saveOnTrade = useMemo(() => {
    return swapEnabled
      ? formatNumberWithCommas(
          baseAmountUSD.times((Math.random() * (1 - 0.5) + 0.5) / 100).toNumber(),
          4
        )
      : 0;
  }, [baseAmountUSD.toString(), swapEnabled]);

  const onSwap = useCallback(() => {
    const amount = Number(baseAmount);
    if (!amount || !base || !quote) {
      toast.error('Please check if parameters are valid');
      return;
    }

    swap.mutate({ amountA: amount, tokenA: base, tokenB: quote });
  }, [baseAmount, base, quote]);

  const onFund = useCallback(() => {
    if (base) {
      setDepositToken({ symbol: base, name: baseName || base });
      navigate('/?fund=true');
    }
  }, [base, baseName]);

  useShowMainButton({
    variant: swapEnabled || fundEnabled ? 'default' : 'disabled',
    text: fundEnabled ? 'Add Funds' : 'Swap',
    enabled: swapEnabled || fundEnabled,
    loading: swap.isPending,
    callback: fundEnabled ? onFund : onSwap,
  });

  useEffect(() => {
    if (!base && !quote) {
      const assets = Object.keys(balances);
      if (assets.length && !assets.includes(DEFAULT_TRADING_BASE_TOKEN)) {
        const tradingBaseToken = assets[0];
        setBase(tradingBaseToken, balances[tradingBaseToken].currency_name || tradingBaseToken);
      } else {
        setBase(DEFAULT_TRADING_BASE_TOKEN, DEFAULT_TRADING_BASE_TOKEN_NAME);
      }
    }
  }, []);

  useEffect(() => {
    if (fundEnabled && !baseInputFocused && !quoteInputFocused && fundsEnabledRef.current) {
      setFundOpen(true);
    } else {
      setFundOpen(false);
    }
  }, [fundEnabled, baseInputFocused, quoteInputFocused]);

  useEffect(() => {
    if (baseAmount) {
      setQuoteAmount(Big(baseAmount).times(basePrice).prec(12).toString());
    } else {
      setQuoteAmount(baseAmount);
    }
  }, [basePrice.toString()]);

  const onSetBaseAmount = (value: string) => {
    setBaseAmount(value);
    if (value) {
      setQuoteAmount(Big(value).times(basePrice).prec(18).toString());
    } else {
      setQuoteAmount(value);
    }
  };

  const onSetQuoteAmount = (value: string) => {
    setQuoteAmount(value);
    if (value) {
      setBaseAmount(Big(value).times(quotePrice).prec(18).toString());
    } else {
      setBaseAmount(value);
    }
  };

  const onChangeBalancePercent = (value?: string) => {
    if (value) {
      return baseInputFocused
        ? onSetBaseAmount(baseBalance.times(value).div(100).toString())
        : onSetQuoteAmount(quoteBalance.times(value).div(100).toString());
    }
    return baseInputFocused ? onSetBaseAmount('0') : onSetQuoteAmount('0');
  };

  const onRotate = () => {
    rotate();
    if (rotateRef.current) {
      if (!rotateRef.current.dataset.rotated) {
        rotateRef.current.dataset.rotated = 'true';
        rotateRef.current.style.rotate = '-360deg';
      } else {
        rotateRef.current.dataset.rotated = '';
        rotateRef.current.style.rotate = '0deg';
      }
    }
  };

  return (
    <Flex
      id='swap-screen'
      minHeight='100vh'
      direction='column'
      gap='5'
      px='4'
      pt='4'
      pb={isBottomGap ? '6' : '4'}
    >
      <HomeButton top={12} />
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
          ref={rotateRef}
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
      {base && quote && (
        <Text color='gray' size='2' weight='medium' align='center' lineHeight='20px'>
          1 {base} = {formatNumberWithCommas(basePrice.toNumber())} {quote}
        </Text>
      )}
      <Flex direction='column' gap='2'>
        <Flex height='32px' justify='between' align='center'>
          <Text size='2' weight='medium' align='center' lineHeight='12px'>
            Save on this trade: {saveOnTrade} $
          </Text>
          <Flex asChild align='center' gap='2' px='3' style={{ cursor: 'pointer' }}>
            <Label.Root>
              <Text size='2' weight='bold' align='center' lineHeight='12px'>
                Compare
              </Text>
              <IconButton size='1' variant='ghost' onClick={() => setSavingsOpen(!savingsOpen)}>
                <Icon
                  name='chevron-up'
                  size={16}
                  style={{
                    ...styles.compareSavings,
                    ...(savingsOpen && styles.compareSavingsRotate),
                  }}
                />
              </IconButton>
            </Label.Root>
          </Flex>
        </Flex>
        {savingsOpen && (
          <>
            <Separator size='4' />
            <Text size='4' weight='bold' align='center' lineHeight='16px' my='4'>
              Coming soon...
            </Text>
          </>
        )}
      </Flex>
      <Dialog
        asChild
        open={fundOpen}
        trigger={null}
        setOpen={(value) => {
          if (!value) {
            fundsEnabledRef.current = false;
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
