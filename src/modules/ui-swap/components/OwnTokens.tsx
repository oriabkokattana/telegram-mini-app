import { Flex } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useBalancesStore } from '@/store/balances-store';
import { getBalanceUSDFontSize } from '@/utils/balances';
import { formatNumber, formatNumberWithSpaces, formatPercent } from '@/utils/numbers';

import { SwapTokenItem } from '@/types';

interface OwnTokensProps {
  data?: SwapTokenItem[];
  loading: boolean;
  onSelect(symbol: string, name: string): void;
}

const OwnTokens = ({ data, loading, onSelect }: OwnTokensProps) => {
  const balances = useBalancesStore((state) => state.balances);

  const assetList = Object.keys(balances).filter((item) =>
    data?.some((swapToken) => swapToken.symbol === item)
  );

  if (!assetList.length && !loading) {
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
      Number(balances[b].total_balance.balance_usd) - Number(balances[a].total_balance.balance_usd)
  );

  return (
    <Flex direction='column' gap='5' pt='6'>
      <Flex height='20px' justify='between' align='center'>
        <Text color='gray' size='2' lineHeight='12px'>
          Asset
        </Text>
        <Text color='gray' size='2' lineHeight='12px'>
          Balance
        </Text>
      </Flex>
      <Flex direction='column' gap='4'>
        {sortedAssetList.map((item) => {
          const balanceString = formatNumber(Number(balances[item].total_balance.balance));
          const balanceInSystemCurrecnyString = `$${formatNumberWithSpaces(Number(balances[item].total_balance.balance_usd))}`;
          const profitPercentString = `${formatPercent(Number(balances[item].total_balance.pnl_percent) * 100)}%`;
          const positiveProfit = Number(balances[item].total_balance.pnl_percent) >= 0;
          return (
            <Flex
              key={item}
              asChild
              justify='between'
              align='center'
              gap='2'
              onClick={() => onSelect(item, balances[item].currency_name || item)}
            >
              <Link to='/swap'>
                <Flex gap='2' align='center'>
                  <TokenIcon name={item} size='ui-md' />
                  <Flex direction='column' gap='1'>
                    <Text size='3' weight='bold'>
                      {item}
                    </Text>
                    <Text color='gray' size='2' lineHeight='12px'>
                      {balances[item].currency_name || item}
                    </Text>
                  </Flex>
                </Flex>
                <Flex direction='column' align='end' gap='1'>
                  <Flex align='center' gap='2'>
                    <Text size='3' weight='bold'>
                      {balanceString}
                    </Text>
                    <Text
                      color='gray'
                      weight='bold'
                      align='right'
                      lineHeight='14px'
                      {...getBalanceUSDFontSize(balanceString)}
                    >
                      {balanceInSystemCurrecnyString}
                    </Text>
                  </Flex>
                  <Flex align='center' gap='1'>
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
