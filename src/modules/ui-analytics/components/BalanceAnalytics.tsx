import { useEffect, useState } from 'react';
import { Card, Flex } from '@radix-ui/themes';
import { ETimeframe } from '@/enums';
import CustomChart from '@/modules/core/components/CustomChart';
import TimeframeRange from '@/modules/core/components/TimeframeRange';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { useProfitChart } from '@/services/user/profit-chart/api';
import { useBalancesStore } from '@/store/balances-store';
import { useTimeframeStore } from '@/store/timeframe-store';
import { getTotalBalanceFontSize } from '@/utils/balances';
import { formatNumberWithCommas, formatPercent } from '@/utils/numbers';

const BalanceAnalytics = () => {
  const [timeframe, setTimeframe] = useState(ETimeframe.d);

  const { total_balance_usd, pnl_usd, pnl_percent } = useBalancesStore();
  const setBalanceTimeframe = useTimeframeStore((state) => state.setBalanceTimeframe);
  const { data: profitChartData, isLoading } = useProfitChart(timeframe);

  useEffect(() => {
    setBalanceTimeframe(timeframe);
  }, [timeframe]);

  const balanceString = `$ ${formatNumberWithCommas(total_balance_usd)}`;
  const profitPositive = Number(pnl_percent) >= 0;
  const profitString = `${formatNumberWithCommas(pnl_usd)} $ (${formatPercent(pnl_percent)}%)`;
  const depositsString = `+ ${formatNumberWithCommas(profitChartData?.total_deposit_usd)} $`;
  const withdrawalsString = `- ${formatNumberWithCommas(profitChartData?.total_withdraw_usd)} $`;
  const saveString = `+ ${formatNumberWithCommas(profitChartData?.total_savings_usd)} $`;

  return (
    <Flex direction='column' gap='5' pt='5'>
      <Flex direction='column' align='center' gap='2'>
        <Text color='gray' size='1' weight='medium' textTransform='uppercase'>
          Total Balance (USD)
        </Text>
        <Flex direction='column' align='center' gap='2px'>
          <Text {...getTotalBalanceFontSize(balanceString)} weight='bold' lineHeight='34px'>
            {balanceString}
          </Text>
          <Flex height='20px' align='center' gap='1'>
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
      </Flex>
      <Flex direction='column' gap='3'>
        <CustomChart
          variant={profitPositive ? 'violet-to-pink' : 'pink-to-violet'}
          height={108}
          data={profitChartData?.chard_data}
          loading={isLoading}
        />
        <TimeframeRange timeframe={timeframe} setTimeframe={setTimeframe} />
      </Flex>
      <Card size='2'>
        <Flex direction='column' gap='2'>
          <Flex height='24px' justify='between' align='center'>
            <Text color='gray' size='3' weight='medium' lineHeight='14px'>
              Deposits
            </Text>
            <Text color='gold' size='3' weight='bold'>
              {depositsString}
            </Text>
          </Flex>
          <Flex height='24px' justify='between' align='center'>
            <Text color='gray' size='3' weight='medium' lineHeight='14px'>
              Withdrawals
            </Text>
            <Text color='gold' size='3' weight='bold'>
              {withdrawalsString}
            </Text>
          </Flex>
          <Flex height='24px' justify='between' align='center'>
            <Text color='gray' size='3' weight='medium' lineHeight='14px'>
              Saved on fees
            </Text>
            <Text color='gold' size='3' weight='bold'>
              {saveString}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default BalanceAnalytics;
