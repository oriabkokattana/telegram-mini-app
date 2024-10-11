import Big from 'big.js';
import { Flex } from '@radix-ui/themes';
import Link from '@/modules/core/components/Link';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useBalancesVisibleStore } from '@/store/balance-visible-store';
import { useBalancesStore } from '@/store/balances-store';
import { useSystemCurrencyStore } from '@/store/system-currency-store';
import { getBalanceFontSize } from '@/utils/balances';
import { formatNumber, formatNumberWithSpaces, formatPercent } from '@/utils/numbers';

const Assets = () => {
  const visible = useBalancesVisibleStore((state) => state.visible);
  const balances = useBalancesStore((state) => state.balances);
  const currency = useSystemCurrencyStore((state) => state.currency);
  const currencyRate = useSystemCurrencyStore((state) => state.currencyRate);

  const assetList = Object.keys(balances);
  const sortedAssetList = assetList.sort(
    (a, b) =>
      Number(balances[b].total_balance.balance_usd) - Number(balances[a].total_balance.balance_usd)
  );

  return (
    <Flex direction='column' gap='4'>
      {sortedAssetList.map((item) => {
        const balanceString = formatNumber(balances[item].total_balance.balance);
        const balanceInSystemCurrecnyString = `${currency === 'USD' ? '$' : ''}${formatNumberWithSpaces(Big(balances[item].total_balance.balance_usd).times(currencyRate))}${currency === 'USD' ? '' : ` ${currency}`}`;
        const profitPercentString = `${formatPercent(balances[item].total_balance.pnl_percent)}%`;
        const positiveProfit = Number(balances[item].total_balance.pnl_percent) >= 0;
        return (
          <Flex key={item} asChild justify='between' align='center' gap='2'>
            <Link to={`/asset/${item}`}>
              <Flex gap='2' align='center'>
                <Flex width='36px' height='36px' justify='center' align='center'>
                  <TokenIcon name={item} size='sm' variant='monochrome' />
                </Flex>
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
                  <Text weight='bold' lineHeight='14px' {...getBalanceFontSize(balanceString, 14)}>
                    {visible ? balanceString : balanceString.replace(/./g, '*')}
                  </Text>
                  <Text
                    color='gray'
                    weight='bold'
                    align='right'
                    lineHeight='14px'
                    {...getBalanceFontSize(balanceString)}
                  >
                    {visible
                      ? balanceInSystemCurrecnyString
                      : balanceInSystemCurrecnyString.replace(/./g, '*')}
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
