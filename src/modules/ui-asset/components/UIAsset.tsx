import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Flex } from '@radix-ui/themes';
import { ETimeframe } from '@/enums';
import CustomChart from '@/modules/core/components/CustomChart';
import TimeframeRange from '@/modules/core/components/TimeframeRange';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useAssetChart } from '@/services/user/asset-chart/api';
import { useAssetSummary } from '@/services/user/asset-summary/api';
import { useSystemCurrencyStore } from '@/store/system-currency-store';
import { formatDate } from '@/utils/date';
import { formatNumberWithCommas, formatPercent } from '@/utils/numbers';

const UIAsset = () => {
  const [timeframe, setTimeframe] = useState(ETimeframe.m);

  const { asset } = useParams();
  const { data: assetSummaryData } = useAssetSummary(asset);
  const { data: assetChartData } = useAssetChart(timeframe, asset);
  const rates = useSystemCurrencyStore((state) => state.rates);

  const profitPositive = Number(assetChartData?.pnl_percent || 0) >= 0;
  const profitString = `${formatNumberWithCommas(Number(assetChartData?.pnl_usd || 0))} $ (${formatPercent(Number(assetChartData?.pnl_percent || 0) * 100)}%)`;

  return (
    <Flex direction='column' gap='5' px='4' py='2'>
      <Flex direction='column' align='center' gap='2'>
        <Flex align='center' pl='5'>
          <Flex width='44px' height='44px' justify='center' align='center' mx='auto'>
            <TokenIcon customSize='30px' name={asset} />
          </Flex>
          <Icon name='bell' />
        </Flex>
        <Text size='7' weight='bold' lineHeight='26px'>
          {formatNumberWithCommas(Number(assetSummaryData?.total_balance || 0), 12)} {asset}
        </Text>
        <Flex align='center' justify='center' gap='2'>
          <Text color='gray' size='3' weight='bold'>
            ≈ $ {formatNumberWithCommas(Number(assetSummaryData?.total_balance_usd || 0))}
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
      </Flex>
      <Flex direction='column' gap='3'>
        <CustomChart variant='violet' height={108} data={assetChartData?.chard_data} />
        <TimeframeRange timeframe={timeframe} setTimeframe={setTimeframe} />
      </Flex>
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
              ${formatNumberWithCommas(rates[asset || ''] || 0)} per {asset}
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Flex height='24px' justify='between' align='center' style={{ cursor: 'pointer' }}>
        <Text size='3' weight='bold'>
          Transaction history
        </Text>
        <Icon name='chevron-down' variant='secondary' size={24} />
      </Flex>
    </Flex>
  );
};

export default UIAsset;
