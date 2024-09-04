import { useState } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as stylex from '@stylexjs/stylex';
import { useUtils } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import { Dropdown } from '@/modules/core/design-system/dropdown/Dropdown';
import { useSystemCurrencyStore } from '@/store/system-currency';
import allTimeChart from '../media/all-time.svg';
import dailyChart from '../media/daily.png';

import { styles } from './Overall.styles';

enum Tab {
  balance,
  fees,
}
enum Period {
  daily = 'Daily',
  allTime = 'All Time',
}

const Overall = (): JSX.Element => {
  const utils = useUtils();
  const [period, setPeriod] = useState(Period.daily);

  const currency = useSystemCurrencyStore((state) => state.currency);
  const setCurrency = useSystemCurrencyStore((state) => state.setCurrency);

  const onPeriodChange = () => setPeriod(period === Period.daily ? Period.allTime : Period.daily);

  return (
    <TabsPrimitive.Root {...stylex.props(styles.base)} defaultValue={Tab.balance.toString()}>
      <TabsPrimitive.List {...stylex.props(styles.tabList)}>
        <TabsPrimitive.Trigger {...stylex.props(styles.tabTrigger)} value={Tab.balance.toString()}>
          Total balance
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger {...stylex.props(styles.tabTrigger)} value={Tab.fees.toString()}>
          Savings on fees
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>

      <TabsPrimitive.Content
        {...stylex.props(styles.tabContent)}
        value={Tab.balance.toString()}
        onClick={onPeriodChange}
      >
        <div {...stylex.props(styles.analytics)}>
          <div {...stylex.props(styles.amountWrapper)}>
            <span {...stylex.props(styles.amount)}>32,455</span>{' '}
            <span {...stylex.props(styles.currency)}>{currency}</span>
          </div>
          <Dropdown items={['BTC', 'USDT', 'ETH']} selected={currency} onSelect={setCurrency}>
            <ChevronDownIcon {...stylex.props(styles.chevronDownIcon)} />
          </Dropdown>
        </div>
        <div {...stylex.props(styles.growthWrapper)}>
          <span {...stylex.props(styles.growth)}>
            {period === Period.daily ? '+ 1,400.90 $ (+2%)' : '+ 100,400.90 $ (+2%)'}
          </span>
          <span {...stylex.props(styles.badge)}>{period}</span>
        </div>
        <img
          {...stylex.props(styles.chart)}
          alt='chart'
          src={period === Period.daily ? dailyChart : allTimeChart}
          onClick={onPeriodChange}
        />
      </TabsPrimitive.Content>

      <TabsPrimitive.Content
        {...stylex.props(styles.tabContent)}
        value={Tab.fees.toString()}
        onClick={() => utils.shareURL('google.com', 'A lot of money were saved')}
      >
        <div {...stylex.props(styles.amountWrapper)}>
          <span {...stylex.props(styles.amount)}>2,455</span>{' '}
          <span {...stylex.props(styles.currency)}>USD</span>
        </div>
        <span {...stylex.props(styles.badge)}>Share</span>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
};

export default Overall;
