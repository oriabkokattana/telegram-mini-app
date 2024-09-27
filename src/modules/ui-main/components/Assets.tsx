import { Flex } from '@radix-ui/themes';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useBalancesStore } from '@/store/balances-store';
import { useSystemCurrencyStore } from '@/store/system-currency';
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
    return (
      <Flex height='200px' justify='center' align='center'>
        <Text size='4'>No assets yet!</Text>
      </Flex>
    );
  }

  const sortedAssetList = assetList.sort(
    (a, b) => balances[b].total_balance.balance_usd - balances[a].total_balance.balance_usd
  );

  return (
    <Flex direction='column' gap='4'>
      {sortedAssetList.map((item) => {
        const balanceString = formatNumber(balances[item].total_balance.balance);
        const balanceInSystemCurrecnyString = `${currency === 'USD' ? '$' : ''}${formatNumberWithSpaces(balances[item].total_balance.balance_usd * currencyRate)}${currency === 'USD' ? '' : ` ${currency}`}`;
        const profitPercentString = `${formatPercent(balances[item].total_balance.price_change * 100)}%`;
        return (
          <Flex key={item} justify='between' align='center' gap='2'>
            <Flex gap='2' align='center'>
              <TokenIcon name={item} size='ui' />
              <Flex direction='column' gap='1'>
                <Text size='3' weight='bold' lineHeight='normal'>
                  {item}
                </Text>
                <Text color='gray' size='2' lineHeight='12px'>
                  {item}
                </Text>
              </Flex>
            </Flex>
            <Flex direction='column' align='end' gap='1'>
              <Flex align='center' gap='2'>
                <Text size='3' weight='bold' align='right' lineHeight='normal'>
                  {visible ? balanceString : balanceString.replace(/./g, '*')}
                </Text>
                <Text color='gray' size='3' weight='bold' align='right' lineHeight='14px'>
                  {visible
                    ? balanceInSystemCurrecnyString
                    : balanceInSystemCurrecnyString.replace(/./g, '*')}
                </Text>
              </Flex>
              <Flex align='center' gap='1'>
                <Icon
                  name={
                    balances[item].total_balance.price_change >= 0
                      ? 'top-right-arrow'
                      : 'bottom-right-arrow'
                  }
                  variant={
                    balances[item].total_balance.price_change >= 0 ? 'accent-violet' : 'accent-pink'
                  }
                  size={16}
                />
                <Text
                  color={balances[item].total_balance.price_change >= 0 ? 'violet' : 'crimson'}
                  size='2'
                  weight='bold'
                  lineHeight='12px'
                >
                  {visible ? profitPercentString : profitPercentString.replace(/./g, '*')}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Assets;
