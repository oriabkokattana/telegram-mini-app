import { Flex, Skeleton } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import Link from '@/modules/core/components/Link';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import AssetsSkeleton from '@/modules/core/skeletons/AssetsSkeleton';
import { useBalancesStore } from '@/store/balances-store';
import { getBalanceFontSize } from '@/utils/balances';
import { formatNumber, formatNumberWithSpaces, formatPercent } from '@/utils/numbers';

import { BalanceItem, SwapTokenItem, SwapTokenType } from '@/types';

const DEFAULT_YOUR_TOKENS: Record<string, { currency_name: string; total_balance: BalanceItem }> = {
  BNB: {
    total_balance: {
      balance: '0',
      reserved_balance: '0',
      balance_usd: '0',
      reserved_balance_usd: '0',
      pnl_usd: '0',
      pnl_percent: '0',
    },
    currency_name: 'Binance Coin',
  },
  // BTC: {
  //   total_balance: {
  //     balance: '0',
  //     reserved_balance: '0',
  //     balance_usd: '0',
  //     reserved_balance_usd: '0',
  //     pnl_usd: '0',
  //     pnl_percent: '0',
  //   },
  //   currency_name: 'Bitcoin',
  // },
  ETH: {
    total_balance: {
      balance: '0',
      reserved_balance: '0',
      balance_usd: '0',
      reserved_balance_usd: '0',
      pnl_usd: '0',
      pnl_percent: '0',
    },
    currency_name: 'Ethereum',
  },
  USDC: {
    total_balance: {
      balance: '0',
      reserved_balance: '0',
      balance_usd: '0',
      reserved_balance_usd: '0',
      pnl_usd: '0',
      pnl_percent: '0',
    },
    currency_name: 'USD Coin',
  },
  USDT: {
    total_balance: {
      balance: '0',
      reserved_balance: '0',
      balance_usd: '0',
      reserved_balance_usd: '0',
      pnl_usd: '0',
      pnl_percent: '0',
    },
    currency_name: 'Tether USD',
  },
};

interface OwnTokensProps {
  data?: SwapTokenItem[];
  type: SwapTokenType;
  loading: boolean;
  onSelect(symbol: string, name: string): void;
}

const OwnTokens = ({ data, type, loading, onSelect }: OwnTokensProps) => {
  const balances = useBalancesStore((state) => state.balances);
  const isBottomGap = useCheckBottomGap();

  const mergedBalances = { ...DEFAULT_YOUR_TOKENS, ...balances };

  const assetList =
    type === 'base'
      ? Object.keys(mergedBalances)
      : Object.keys(mergedBalances).filter((item) =>
          data?.some((swapToken) => swapToken.symbol === item)
        );

  if (loading) {
    return (
      <Flex direction='column' gap='5' pt='6' pb={isBottomGap ? '6' : '4'}>
        <Flex height='20px' justify='between' align='center'>
          <Text color='gray' size='2' lineHeight='12px'>
            <Skeleton>Asset</Skeleton>
          </Text>
          <Text color='gray' size='2' lineHeight='12px'>
            <Skeleton>Balance</Skeleton>
          </Text>
        </Flex>
        <AssetsSkeleton gap='5' />
      </Flex>
    );
  }

  if (!assetList.length) {
    return (
      <Flex direction='column' gap='5' pt='6'>
        <NoDataPlaceholder
          variant='list'
          title="You don't have assets yet"
          description='No tokens found for swapping with USDT'
        />
      </Flex>
    );
  }

  const sortedAssetList = assetList.sort(
    (a, b) =>
      Number(mergedBalances[b].total_balance.balance_usd) -
      Number(mergedBalances[a].total_balance.balance_usd)
  );

  return (
    <Flex direction='column' gap='5' pt='6' pb={isBottomGap ? '6' : '4'}>
      <Flex height='20px' justify='between' align='center'>
        <Text color='gray' size='2' lineHeight='12px'>
          Asset
        </Text>
        <Text color='gray' size='2' lineHeight='12px'>
          Balance
        </Text>
      </Flex>
      <Flex direction='column' gap='5'>
        {sortedAssetList.map((item) => {
          const balanceString = formatNumber(mergedBalances[item].total_balance.balance);
          const balanceInSystemCurrecnyString = `$${formatNumberWithSpaces(mergedBalances[item].total_balance.balance_usd)}`;
          const profitPercentString = `${formatPercent(mergedBalances[item].total_balance.pnl_percent)}%`;
          const positiveProfit = Number(mergedBalances[item].total_balance.pnl_percent) >= 0;
          return (
            <Flex
              key={`own-${item}`}
              asChild
              justify='between'
              align='center'
              gap='2'
              onClick={() => onSelect(item, mergedBalances[item].currency_name || item)}
            >
              <Link to='/swap'>
                <Flex gap='2' align='center'>
                  <Flex width='36px' height='36px' justify='center' align='center'>
                    <TokenIcon name={item} size='sm' variant='monochrome' />
                  </Flex>
                  <Flex direction='column' gap='1'>
                    <Text size='3' weight='bold'>
                      {item}
                    </Text>
                    <Text color='gray' size='2' lineHeight='12px'>
                      {mergedBalances[item].currency_name || item}
                    </Text>
                  </Flex>
                </Flex>
                <Flex direction='column' align='end' gap='1'>
                  <Flex align='center' gap='2'>
                    <Text
                      weight='bold'
                      lineHeight='14px'
                      {...getBalanceFontSize(balanceString, 14)}
                    >
                      {balanceString}
                    </Text>
                    <Text
                      color='gray'
                      weight='bold'
                      align='right'
                      lineHeight='14px'
                      {...getBalanceFontSize(balanceString)}
                    >
                      {balanceInSystemCurrecnyString}
                    </Text>
                  </Flex>
                  <Flex height='16px' align='center' gap='1'>
                    <Icon
                      name={positiveProfit ? 'top-right-arrow' : 'bottom-right-arrow'}
                      variant={positiveProfit ? 'accent-violet' : 'accent-pink'}
                      size={16}
                    />
                    <Text
                      color={positiveProfit ? 'violet' : 'crimson'}
                      size='2'
                      weight='bold'
                      lineHeight='12px'
                    >
                      {profitPercentString}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default OwnTokens;
