import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import { Card, Flex, IconButton } from '@radix-ui/themes';
import { ETimeframe } from '@/enums';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import CustomChart from '@/modules/core/components/CustomChart';
import Link from '@/modules/core/components/Link';
import NoDataPlaceholder from '@/modules/core/components/NoDataPlaceholder';
import TimeframeRange from '@/modules/core/components/TimeframeRange';
import { Icon } from '@/modules/core/design-system/icon';
import { Text } from '@/modules/core/design-system/text';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useAssetChart } from '@/services/user/asset-chart/api';
import { useAssetSummary } from '@/services/user/asset-summary/api';
import { useBalancesStore } from '@/store/balances-store';
import { useDepositStore } from '@/store/deposit-store';
import { useSystemCurrencyStore } from '@/store/system-currency-store';
import { useWithdrawStore } from '@/store/withdraw-store';
import { formatDate } from '@/utils/date';
import { formatNumberWithCommas, formatPercent } from '@/utils/numbers';
import AssetPriceChange from './AssetPriceChange';

const UIAsset = () => {
  const [timeframe, setTimeframe] = useState(ETimeframe.m);

  const { asset } = useParams();
  const { data: assetSummaryData } = useAssetSummary(asset);
  const { data: assetChartData } = useAssetChart(timeframe, asset);
  const rates = useSystemCurrencyStore((state) => state.rates);
  const balances = useBalancesStore((state) => state.balances);
  const setDepositToken = useDepositStore((state) => state.setToken);
  const setWithdrawToken = useWithdrawStore((state) => state.setToken);
  const isBottomGap = useCheckBottomGap();

  const profitPositive = Number(assetChartData?.pnl_percent || 0) >= 0;
  const profitString = `${formatPercent(Number(assetChartData?.pnl_percent || 0) * 100)}%`;
  const actionPossible = !!asset && !!balances[asset];

  const onDeposit = () => {
    if (actionPossible) {
      setDepositToken({ symbol: asset || '', name: balances[asset].currency_name });
    }
  };

  const onWithdraw = () => {
    if (actionPossible) {
      setWithdrawToken({ symbol: asset || '', name: balances[asset].currency_name });
    }
  };

  return (
    <Flex direction='column' gap='5' px='4' pt='2' pb={isBottomGap ? '100px' : '72px'}>
      <Flex direction='column' align='center' gap='2'>
        <Flex width='100%' align='center' pl='5'>
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
      <Flex>
        <Flex asChild flexGrow='1'>
          <Link
            to={actionPossible ? '/deposit-network-select' : '/deposit-token-select'}
            onClick={onDeposit}
          >
            <Flex asChild flexGrow='1' direction='column' align='center' gap='2'>
              <Label.Root>
                <IconButton size='4'>
                  <Icon name='arrow-down-half-circle' variant='white' />
                </IconButton>
                <Text size='2' lineHeight='12px'>
                  Deposit
                </Text>
              </Label.Root>
            </Flex>
          </Link>
        </Flex>
        <Flex asChild flexGrow='1'>
          <Link
            to={actionPossible ? '/withdraw-network-select' : '/withdraw-token-select'}
            onClick={onWithdraw}
          >
            <Flex asChild flexGrow='1' direction='column' align='center' gap='2'>
              <Label.Root>
                <IconButton color='gray' variant='soft' size='4'>
                  <Icon name='arrow-up-half-circle' variant='tertiary' />
                </IconButton>
                <Text size='2' lineHeight='12px'>
                  Withdraw
                </Text>
              </Label.Root>
            </Flex>
          </Link>
        </Flex>
        <Flex asChild flexGrow='1'>
          <Link to='/swap'>
            <Flex asChild flexGrow='1' direction='column' align='center' gap='2'>
              <Label.Root>
                <IconButton color='gray' variant='soft' size='4'>
                  <Icon name='swap' variant='tertiary' />
                </IconButton>
                <Text size='2' lineHeight='12px'>
                  Swap
                </Text>
              </Label.Root>
            </Flex>
          </Link>
        </Flex>
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
      {/* <Flex height='24px' justify='between' align='center' style={{ cursor: 'pointer' }}>
        <Text size='3' weight='bold'>
          Transaction history
        </Text>
        <Icon name='chevron-down' variant='secondary' size={24} />
      </Flex> */}
      <Flex direction='column' gap='4' pt='4'>
        <NoDataPlaceholder
          variant='list'
          title="You don't have history yet"
          description='Complete a transaction to see the history'
        />
      </Flex>
      <AssetPriceChange asset={asset} />
    </Flex>
  );
};

export default UIAsset;
