import { Flex } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useBalancesStore } from '@/store/balances-store';
import { useSystemCurrencyStore } from '@/store/system-currency-store';
import { formatNumber, formatNumberWithSpaces, formatPercent } from '@/utils/numbers';

interface AssetsProps {
  visible: boolean;
}

const Assets = ({ visible }: AssetsProps) => {
  const balances = useBalancesStore((state) => state.balances);
  const currency = useSystemCurrencyStore((state) => state.currency);
  const currencyRate = useSystemCurrencyStore((state) => state.currencyRate);

  const assetList = Object.keys(balances);

  if (!assetList.length) {
    return <NoDataPlaceholder text='No assets yet!' />;
  }

  const sortedAssetList = assetList.sort(
    (a, b) =>
      Number(balances[b].total_balance.balance_usd) - Number(balances[a].total_balance.balance_usd)
  );

  return (
    <Flex direction='column' gap='4'>
      {sortedAssetList.map((item) => {
        const balanceString = formatNumber(Number(balances[item].total_balance.balance));
        const balanceInSystemCurrecnyString = `${currency === 'USD' ? '$' : ''}${formatNumberWithSpaces(Number(balances[item].total_balance.balance_usd) * currencyRate)}${currency === 'USD' ? '' : ` ${currency}`}`;
        const profitPercentString = `${formatPercent(Number(balances[item].total_balance.pnl_percent) * 100)}%`;
        const positiveProfit = Number(balances[item].total_balance.pnl_percent) >= 0;
        return (
          <Flex key={item} asChild justify='between' align='center' gap='2'>
            <Link to={`/ui-asset/${item}`}>
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
                    {visible ? balanceString : balanceString.replace(/./g, '*')}
                  </Text>
                  <Text color='gray' size='1' weight='bold' align='right' lineHeight='10px'>
                    {visible
                      ? balanceInSystemCurrecnyString
                      : balanceInSystemCurrecnyString.replace(/./g, '*')}
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
                    {visible ? profitPercentString : profitPercentString.replace(/./g, '*')}
                  </Text>
                </Flex>
              </Flex>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Assets;
