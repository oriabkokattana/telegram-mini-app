import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as stylex from '@stylexjs/stylex';
import { useUtils } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import { Dropdown } from '@/modules/core/design-system/dropdown/Dropdown';
import { useProfileStore } from '@/store/profile-store';
import { useSystemCurrencyStore } from '@/store/system-currency';
import { formatNumberWithCommas } from '@/utils/numbers';
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

const TABS_LEN = 2;

const Overall = (): JSX.Element => {
  const utils = useUtils();
  const [period, setPeriod] = useState(Period.daily);
  const [currentIndex, setCurrentIndex] = useState(Tab.balance);

  const { currency, currencyRate, currencies, setCurrency } = useSystemCurrencyStore();
  const profile = useProfileStore((state) => state.profile);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < TABS_LEN - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const onPeriodChange = () => setPeriod(period === Period.daily ? Period.allTime : Period.daily);

  return (
    <TabsPrimitive.Root
      {...stylex.props(styles.base)}
      value={currentIndex.toString()}
      onValueChange={(value) => setCurrentIndex(Number(value))}
    >
      <TabsPrimitive.List {...stylex.props(styles.tabList)}>
        <TabsPrimitive.Trigger {...stylex.props(styles.tabTrigger)} value={Tab.balance.toString()}>
          Total balance
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger {...stylex.props(styles.tabTrigger)} value={Tab.fees.toString()}>
          Savings on fees
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>

      {profile && (
        <div {...swipeHandlers} {...stylex.props(styles.swipeContainer)}>
          <div {...stylex.props(styles.tabContentWrapper, styles.tx(currentIndex))}>
            <TabsPrimitive.Content
              {...stylex.props(styles.tabContent)}
              value={Tab.balance.toString()}
              onClick={onPeriodChange}
              forceMount
            >
              <div {...stylex.props(styles.analytics)}>
                <span {...stylex.props(styles.amountWrapper, styles.amount)}>
                  {formatNumberWithCommas(profile.total_balance * currencyRate)}
                </span>
                <Dropdown items={currencies} selected={currency} onSelect={setCurrency}>
                  <span {...stylex.props(styles.amountWrapper, styles.currency)}>{currency}</span>
                  <ChevronDownIcon {...stylex.props(styles.chevronDownIcon)} />
                </Dropdown>
              </div>
              <div {...stylex.props(styles.changeWrapper)}>
                <span {...stylex.props(styles.change)}>
                  {period === Period.daily
                    ? `${profile.daily_profit_diff >= 0 ? '+' : '-'} ${Math.abs(profile.daily_profit_usd)} $ (${profile.daily_profit_diff >= 0 ? '+' : '-'}${Math.abs(profile.daily_profit_diff)}%)`
                    : `${profile.all_time_profit_diff >= 0 ? '+' : '-'} ${Math.abs(profile.all_time_profit_usd)} $ (${profile.all_time_profit_diff >= 0 ? '+' : '-'}${Math.abs(profile.all_time_profit_diff)}%)`}
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
              onClick={() => utils.shareURL('t.me/KattanaTG_bot/app', 'Successfully saved 2000$!')}
              forceMount
            >
              <div {...stylex.props(styles.amountWrapper)}>
                <span {...stylex.props(styles.amount)}>{profile.fees_saving_usd}</span>{' '}
                <span {...stylex.props(styles.currency)}>USD</span>
              </div>
              <span {...stylex.props(styles.badge)}>Share</span>
            </TabsPrimitive.Content>
          </div>
        </div>
      )}
    </TabsPrimitive.Root>
  );
};

export default Overall;
