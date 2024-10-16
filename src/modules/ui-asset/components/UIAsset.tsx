import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import * as Label from '@radix-ui/react-label';
import { Box, Card, Flex, IconButton, Skeleton } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { ETimeframe } from '@/enums';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import CustomChart from '@/modules/core/components/CustomChart';
import TimeframeRange from '@/modules/core/components/TimeframeRange';
import TransactionList from '@/modules/core/components/TransactionList';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useAssetChart } from '@/services/user/asset-chart/api';
import { useAssetPrice } from '@/services/user/asset-price/api';
import { useAssetSummary } from '@/services/user/asset-summary/api';
import { getSwapTokens } from '@/services/user/swap-tokens/api';
import { SwapTokensAPIResponseSchema } from '@/services/user/swap-tokens/schema';
import { getTokens } from '@/services/user/tokens/api';
import { TokensAPIResponseSchema } from '@/services/user/tokens/schema';
import { useBalancesStore } from '@/store/balances-store';
import { useDepositStore } from '@/store/deposit-store';
import { useTradingStore } from '@/store/trading-store';
import { useWithdrawStore } from '@/store/withdraw-store';
import {
  trackDepositIconButtonClicked,
  trackSwapIconButtonClicked,
  trackWithdrawIconButtonClicked,
} from '@/utils/amplitude-events';
import { DEFAULT_PRECISION } from '@/utils/balances';
import { formatDate } from '@/utils/date';
import { formatNumberWithCommas, formatPercent } from '@/utils/numbers';
import AssetPriceChange from './AssetPriceChange';

const UIAsset = () => {
  const [timeframe, setTimeframe] = useState(ETimeframe.m);
  const [transactionsOpen, setTransactionsOpen] = useState(true);
  const transactionListRef = useRef<HTMLDivElement>(null);

  const balances = useBalancesStore((state) => state.balances);
  const tradingQuote = useTradingStore((state) => state.quote);
  const setDepositToken = useDepositStore((state) => state.setToken);
  const setWithdrawToken = useWithdrawStore((state) => state.setToken);
  const setTradingBase = useTradingStore((state) => state.setBase);
  const setTradingBaseWithQuoteReset = useTradingStore((state) => state.setBaseWithQuoteReset);
  const isBottomGap = useCheckBottomGap();

  const queryClient = useQueryClient();
  const { asset } = useParams();
  const navigate = useNavigate();
  const { data: assetSummaryData, isLoading: assetSummaryLoading } = useAssetSummary(asset);
  const { data: assetChartData, isLoading: assetChartLoading } = useAssetChart(timeframe, asset);
  const { data: assetPriceData, isLoading: assetPriceLoading } = useAssetPrice(asset);

  const priceUSD = assetPriceData?.price_usd;
  const profitPositive = Number(assetChartData?.pnl_percent || 0) >= 0;
  const profitString = `${formatPercent(assetChartData?.pnl_percent)}%`;
  const actionPossible = !!asset && !!balances[asset];

  const onDeposit = async () => {
    if (actionPossible) {
      const tokens = await queryClient.ensureQueryData<z.infer<typeof TokensAPIResponseSchema>>({
        queryKey: ['tokens', 'deposit'],
        queryFn: () => getTokens({ params: { direction: 'deposit' } }),
      });

      if (tokens.some((item) => item.symbol === asset)) {
        setDepositToken({
          symbol: asset,
          name: balances[asset]?.currency_name || asset,
          precision: balances[asset]?.precision || DEFAULT_PRECISION,
        });
        navigate('/deposit-network-select');
        return;
      }
    }
    navigate('/deposit-token-select');
  };

  const onWithdraw = async () => {
    if (actionPossible) {
      const tokens = await queryClient.ensureQueryData<z.infer<typeof TokensAPIResponseSchema>>({
        queryKey: ['tokens', 'withdraw'],
        queryFn: () => getTokens({ params: { direction: 'withdraw' } }),
      });

      if (tokens.some((item) => item.symbol === asset)) {
        setWithdrawToken({
          symbol: asset,
          name: balances[asset]?.currency_name || asset,
          precision: balances[asset]?.precision || DEFAULT_PRECISION,
        });
        navigate('/withdraw-network-select');
        return;
      }
    }
    navigate('/withdraw-token-select');
  };

  const onSwap = async () => {
    if (actionPossible) {
      const swapTokens = await queryClient.ensureQueryData<
        z.infer<typeof SwapTokensAPIResponseSchema>
      >({
        queryKey: ['swap-tokens', tradingQuote],
        queryFn: () => getSwapTokens({ params: { token: tradingQuote } }),
      });

      if (swapTokens.some((item) => item.symbol === asset)) {
        setTradingBase(
          asset,
          balances[asset]?.currency_name || asset,
          balances[asset]?.precision || DEFAULT_PRECISION
        );
      } else {
        setTradingBaseWithQuoteReset(
          asset,
          balances[asset]?.currency_name || asset,
          balances[asset]?.precision || DEFAULT_PRECISION
        );
      }
    }
    navigate('/swap');
  };

  const onOpenTransactions = () => {
    setTransactionsOpen(!transactionsOpen);
    window.setTimeout(() => transactionListRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <Flex direction='column' gap='5' px='4' pt='2' pb={isBottomGap ? '100px' : '72px'}>
      <Flex direction='column' align='center' gap='2'>
        <Flex width='100%' align='center' pl='5'>
          <Skeleton loading={assetSummaryLoading} style={{ borderRadius: '6px' }}>
            <Flex width='44px' height='44px' justify='center' align='center' mx='auto'>
              <TokenIcon size='md' name={asset} variant='monochrome' />
            </Flex>
          </Skeleton>
          <Skeleton loading={assetSummaryLoading}>
            <Box width='24px' height='24px'>
              <Icon name='bell' />
            </Box>
          </Skeleton>
        </Flex>
        {assetSummaryLoading ? (
          <Skeleton width='130px' height='26px' />
        ) : (
          <Text size='7' weight='bold' lineHeight='26px'>
            {formatNumberWithCommas(assetSummaryData?.total_balance, 12)} {asset}
          </Text>
        )}
        {assetSummaryLoading ? (
          <Skeleton width='200px' height='20px' />
        ) : (
          <Flex height='20px' align='center' justify='center' gap='2'>
            <Text color='gray' size='3' weight='bold'>
              ≈ $ {formatNumberWithCommas(assetSummaryData?.total_balance_usd)}
            </Text>
            <Flex align='center' gap='1'>
              <Icon
                name={profitPositive ? 'top-right-arrow' : 'bottom-right-arrow'}
                variant={profitPositive ? 'accent-violet' : 'accent-pink'}
                size={20}
              />
              <Text color={profitPositive ? 'violet' : 'crimson'} size='3' weight='bold'>
                {profitString}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex direction='column' gap='3'>
        <CustomChart
          variant={profitPositive ? 'violet-to-pink' : 'pink-to-violet'}
          valueType='token'
          token={asset}
          height={108}
          data={assetChartData?.chard_data}
          loading={assetChartLoading}
        />
        <TimeframeRange timeframe={timeframe} setTimeframe={setTimeframe} />
      </Flex>
      <Flex>
        <Flex
          asChild
          flexGrow='1'
          flexShrink='1'
          flexBasis='0'
          direction='column'
          align='center'
          gap='2'
          style={{ cursor: 'pointer' }}
        >
          <Label.Root>
            <IconButton
              size='4'
              onClick={() => {
                trackDepositIconButtonClicked();
                onDeposit();
              }}
            >
              <Icon name='arrow-down-half-circle' variant='white' />
            </IconButton>
            <Text size='2' lineHeight='12px'>
              Deposit
            </Text>
          </Label.Root>
        </Flex>
        <Flex
          asChild
          flexGrow='1'
          flexShrink='1'
          flexBasis='0'
          direction='column'
          align='center'
          gap='2'
          style={{ cursor: 'pointer' }}
        >
          <Label.Root>
            <IconButton
              color='gray'
              variant='soft'
              size='4'
              onClick={() => {
                trackWithdrawIconButtonClicked();
                onWithdraw();
              }}
            >
              <Icon name='arrow-up-half-circle' variant='tertiary' />
            </IconButton>
            <Text size='2' lineHeight='12px'>
              Withdraw
            </Text>
          </Label.Root>
        </Flex>
        <Flex
          asChild
          flexGrow='1'
          flexShrink='1'
          flexBasis='0'
          direction='column'
          align='center'
          gap='2'
          style={{ cursor: 'pointer' }}
        >
          <Label.Root>
            <IconButton
              color='gray'
              variant='soft'
              size='4'
              onClick={() => {
                trackSwapIconButtonClicked();
                onSwap();
              }}
            >
              <Icon name='swap' variant='tertiary' />
            </IconButton>
            <Text size='2' lineHeight='12px'>
              Swap
            </Text>
          </Label.Root>
        </Flex>
      </Flex>
      <Skeleton loading={assetPriceLoading || assetSummaryLoading}>
        <Card size='2'>
          <Flex direction='column' gap='2'>
            <Flex height='24px' justify='between' align='center'>
              <Text color='gray' size='3' weight='medium' lineHeight='14px'>
                Purchased on:
              </Text>
              <Text color='gold' size='3' weight='bold'>
                {formatDate(assetSummaryData?.first_purchase_date)}
              </Text>
            </Flex>
            <Flex height='24px' justify='between' align='center'>
              <Text color='gray' size='3' weight='medium' lineHeight='14px'>
                Purchase Price:
              </Text>
              <Text color='gold' size='3' weight='bold'>
                ${formatNumberWithCommas(priceUSD)} per {asset}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Skeleton>
      <Flex direction='column' gap='5' pb='2'>
        <Flex asChild height='24px' justify='between' align='center' style={{ cursor: 'pointer' }}>
          <Label.Root>
            <Text size='3' weight='bold'>
              Transaction history
            </Text>
            <IconButton
              size='1'
              variant='ghost'
              onClick={onOpenTransactions}
              style={{ transition: 'rotate 0.15s', rotate: transactionsOpen ? '0deg' : '-180deg' }}
            >
              <Icon name='chevron-down' variant='secondary' size={24} />
            </IconButton>
          </Label.Root>
        </Flex>
        {transactionsOpen && (
          <TransactionList
            ref={transactionListRef}
            data={assetSummaryData?.recent_transactions}
            loading={assetSummaryLoading}
          />
        )}
      </Flex>
      <AssetPriceChange asset={asset} priceUSD={priceUSD} onSwap={onSwap} />
    </Flex>
  );
};

export default UIAsset;
