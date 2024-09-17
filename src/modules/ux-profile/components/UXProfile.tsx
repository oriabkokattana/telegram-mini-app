import * as stylex from '@stylexjs/stylex';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import { Dropdown } from '@/modules/core/design-system/dropdown/Dropdown';
import { useProfileStore } from '@/store/profile-store';
import { useSystemCurrencyStore } from '@/store/system-currency';
import { formatNumberWithCommas } from '@/utils/numbers';
import UXTransactionHistory from '../../core/components/UXTransactionHistory';
import Portfolio from './Portfolio';
import Profit from './Profit';

import { styles } from './UXProfile.styles';

const UXProfile = () => {
  const { currency, currencyRate, currencies, setCurrency } = useSystemCurrencyStore();
  const profile = useProfileStore((state) => state.profile);

  useSetAppBg('white');

  const totalBalance = profile?.total_balance || 0;
  const dailyProfitDiff = profile?.daily_profit_diff || 0;
  const dailyProfitUSD = profile?.daily_profit_usd || 0;

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.portfolio)}>
        <span {...stylex.props(styles.label)}>Portfolio</span>
        <div {...stylex.props(styles.value)}>
          <div {...stylex.props(styles.amountWrapper)}>
            <span {...stylex.props(styles.amount)}>
              {formatNumberWithCommas(totalBalance * currencyRate)}
            </span>
            <Dropdown items={currencies} selected={currency} onSelect={setCurrency}>
              <span {...stylex.props(styles.currency)}>{currency}</span>
              <ChevronDownIcon {...stylex.props(styles.chevronDownIcon)} />
            </Dropdown>
          </div>
          <span {...stylex.props(styles.change)}>
            {dailyProfitDiff >= 0 ? '+' : '-'} {Math.abs(dailyProfitUSD)} $ (
            {dailyProfitDiff >= 0 ? '+' : '-'}
            {Math.abs(dailyProfitDiff)}%)
          </span>
        </div>
      </div>
      <Portfolio />
      <Profit />
      <UXTransactionHistory variant='filterable' />
    </div>
  );
};

export default UXProfile;
