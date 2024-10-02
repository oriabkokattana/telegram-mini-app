import { Flex } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { formatNumber, formatPercent } from '@/utils/numbers';

import { SwapTokenItem } from '@/types';

interface AllTokensProps {
  data?: SwapTokenItem[];
  onSelect(token: string): void;
}

const AllTokens = ({ data, onSelect }: AllTokensProps) => {
  if (!data?.length) {
    return (
      <Flex direction='column' gap='5' pt='6'>
        <Flex height='20px' justify='between' align='center'>
          <Text color='gray' size='2' lineHeight='12px'>
            Asset
          </Text>
          <Text color='gray' size='2' lineHeight='12px'>
            Price
          </Text>
        </Flex>
        <NoDataPlaceholder
          variant='list'
          title="You don't have assets yet"
          description='You can make a deposit to show your tokens here'
        />
      </Flex>
    );
  }

  return (
    <Flex direction='column' gap='5' pt='6'>
      <Flex height='20px' justify='between' align='center'>
        <Text color='gray' size='2' lineHeight='12px'>
          Asset
        </Text>
        <Text color='gray' size='2' lineHeight='12px'>
          Price
        </Text>
      </Flex>
      <Flex direction='column' gap='4'>
        {data.map((item) => {
          const priceString = formatNumber(Number(item.price_usd || 0));
          const profitPercentString = `${formatPercent(Number(item.price_change_1h || 0) * 100)}%`;
          const positiveProfit = Number(item.price_change_1h || 0) >= 0;
          return (
            <Flex
              asChild
              key={item.symbol}
              justify='between'
              align='center'
              gap='2'
              onClick={() => onSelect(item.symbol)}
            >
              <Link to='/swap'>
                <Flex gap='2' align='center'>
                  <TokenIcon name={item.symbol} size='ui-md' />
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

export default AllTokens;
