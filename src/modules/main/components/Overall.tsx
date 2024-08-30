import { useState } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as stylex from '@stylexjs/stylex';
import { useUtils } from '@telegram-apps/sdk-react';
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
        <div {...stylex.props(styles.amount)}>
          <span {...stylex.props(styles.amountValue)}>32,455</span>{' '}
          <span {...stylex.props(styles.currency)}>USDT</span>
        </div>
        <div {...stylex.props(styles.growthInfo)}>
          <span {...stylex.props(styles.growthInfoText)}>
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
        <div {...stylex.props(styles.amount)}>
          <span {...stylex.props(styles.amountValue)}>2,455</span>{' '}
          <span {...stylex.props(styles.currency)}>USD</span>
        </div>
        <span {...stylex.props(styles.badge)}>Share</span>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
};

export default Overall;
