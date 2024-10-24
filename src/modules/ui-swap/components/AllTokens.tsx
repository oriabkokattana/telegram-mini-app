import { Flex, Skeleton } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import AssetsSkeleton from '@/modules/core/skeletons/AssetsSkeleton';
import { formatNumber, formatPercent } from '@/utils/numbers';

import { SwapTokenItem } from '@/types';

interface AllTokensProps {
  data?: SwapTokenItem[];
  loading: boolean;
  onSelect(symbol: string, name: string, precision: number): void;
}

const AllTokens = ({ data, loading, onSelect }: AllTokensProps) => {
  const isBottomGap = useCheckBottomGap();

  if (loading) {
    return (
      <Flex direction='column' gap='5' pt='6' pb={isBottomGap ? '6' : '4'}>
        <Flex height='20px' justify='between' align='center'>
          <Text color='gray' size='2' lineHeight='12px'>
            <Skeleton>Asset</Skeleton>
          </Text>
          <Text color='gray' size='2' lineHeight='12px'>
            <Skeleton>Price</Skeleton>
          </Text>
        </Flex>
        <AssetsSkeleton gap='5' />
      </Flex>
    );
  }

  if (!data?.length) {
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

  return (
    <Flex direction='column' gap='5' pt='6' pb={isBottomGap ? '6' : '4'}>
      <Flex height='20px' justify='between' align='center'>
        <Text color='gray' size='2' lineHeight='12px'>
          Asset
        </Text>
        <Text color='gray' size='2' lineHeight='12px'>
          Price
        </Text>
      </Flex>
      <Flex direction='column' gap='5'>
        {data?.map((item) => {
          const priceString = `$${formatNumber(item.price_usd, 8)}`;
          const profitPercentString = `${formatPercent(item.price_change_1h)}%`;
          const positiveProfit = Number(item.price_change_1h || 0) >= 0;
          return (
            <Flex
              key={`all-${item.symbol}`}
              justify='between'
              align='center'
              gap='2'
              onClick={() => onSelect(item.symbol, item.name, item.precision)}
            >
              <Flex gap='2' align='center'>
                <Flex width='36px' height='36px' justify='center' align='center'>
                  <TokenIcon name={item.symbol} size='sm' variant='monochrome' />
                </Flex>
                <Flex direction='column' gap='1'>
                  <Text size='3' weight='bold'>
                    {item.symbol}
                  </Text>
                  <Text color='gray' size='2' lineHeight='12px'>
                    {item.name || item.symbol}
                  </Text>
                </Flex>
              </Flex>
              <Flex direction='column' align='end' gap='1'>
                <Text size='3' weight='bold'>
                  {priceString}
                </Text>
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
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AllTokens;
