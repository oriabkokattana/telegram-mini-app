import { Flex } from '@radix-ui/themes';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { getBalanceUSDFontSize } from '@/utils/balances';
import { formatNumber, formatNumberWithSpaces, formatPercent } from '@/utils/numbers';

const ASSETS_PLACEHOLDER_DATA = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 5,
    balance_usd: 318538,
    pnl_percent: 2.81,
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 106,
    balance_usd: 281649,
    pnl_percent: 4.76,
  },
  {
    id: 3,
    name: 'Solana',
    symbol: 'SOL',
    balance: 50,
    balance_usd: 7340.86,
    pnl_percent: 1.19,
  },
  {
    id: 4,
    name: 'BNB Coin',
    symbol: 'BNB',
    balance: 0.00000809,
    balance_usd: 0.0047374,
    pnl_percent: 2.2,
  },
  {
    id: 5,
    name: 'Polygon',
    symbol: 'POL',
    balance: 10.9,
    balance_usd: 4.440508,
    pnl_percent: 2.2,
  },
  {
    id: 6,
    name: 'USD Tether',
    symbol: 'USDT',
    balance: 1000,
    balance_usd: 1000.25,
    pnl_percent: 2.2,
  },
  {
    id: 7,
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 5,
    balance_usd: 318538,
    pnl_percent: 2.81,
  },
  {
    id: 8,
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 106,
    balance_usd: 281649,
    pnl_percent: 4.76,
  },
  {
    id: 9,
    name: 'Solana',
    symbol: 'SOL',
    balance: 50,
    balance_usd: 7340.86,
    pnl_percent: 1.19,
  },
  {
    id: 10,
    name: 'BNB Coin',
    symbol: 'BNB',
    balance: 0.00000809,
    balance_usd: 0.0047374,
    pnl_percent: 2.2,
  },
  {
    id: 11,
    name: 'Polygon',
    symbol: 'POL',
    balance: 10.9,
    balance_usd: 4.440508,
    pnl_percent: 2.2,
  },
  {
    id: 12,
    name: 'USD Tether',
    symbol: 'USDT',
    balance: 1000,
    balance_usd: 1000.25,
    pnl_percent: 2.2,
  },
];

const AssetsPlaceholder = () => {
  return (
    <Flex direction='column' gap='4'>
      {ASSETS_PLACEHOLDER_DATA.map((item) => {
        const balanceString = formatNumber(item.balance);
        const balanceInSystemCurrecnyString = `$${formatNumberWithSpaces(item.balance_usd)}`;
        const profitPercentString = `${formatPercent(item.pnl_percent)}%`;
        const positiveProfit = item.pnl_percent >= 0;
        return (
          <Flex key={item.id} justify='between' align='center' gap='2'>
            <Flex gap='2' align='center'>
              <TokenIcon name={item.symbol} size='ui-md' />
              <Flex direction='column' gap='1'>
                <Text size='3' weight='bold'>
                  {item.symbol}
                </Text>
                <Text color='gray' size='2' lineHeight='12px'>
                  {item.name}
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
          </Flex>
        );
      })}
    </Flex>
  );
};

export default AssetsPlaceholder;
