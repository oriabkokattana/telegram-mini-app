import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import { Dropdown } from '@/modules/core/design-system/dropdown/Dropdown';
import { useSystemCurrencyStore } from '@/store/system-currency';
import { formatNumberWithCommas } from '@/utils/numbers';
import TransactionHistory from '../../core/components/TransactionHistory';
import Portfolio from './Portfolio';
import Profit from './Profit';

import { styles } from './UXProfile.styles';

const UXProfile = () => {
  const miniApp = useMiniApp();
  const { currency, currencyRate, setCurrency } = useSystemCurrencyStore();

  useEffect(() => {
    miniApp.setHeaderColor('#FFFFFF');
    miniApp.setBgColor('#FFFFFF');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.portfolio)}>
        <span {...stylex.props(styles.label)}>Portfolio</span>
        <div {...stylex.props(styles.value)}>
          <div {...stylex.props(styles.amountWrapper)}>
            <span {...stylex.props(styles.amount)}>
              {formatNumberWithCommas(32455 * currencyRate)}
            </span>
            <Dropdown items={['BTC', 'USDT', 'ETH']} selected={currency} onSelect={setCurrency}>
              <span {...stylex.props(styles.currency)}>{currency}</span>
              <ChevronDownIcon {...stylex.props(styles.chevronDownIcon)} />
            </Dropdown>
          </div>
          <span {...stylex.props(styles.change)}>+ 1,400.90 $ (2%)</span>
        </div>
      </div>
      <Portfolio />
      <Profit />
      <TransactionHistory variant='filterable' />
    </div>
  );
};

export default UXProfile;