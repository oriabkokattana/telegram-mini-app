import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useBalancesStore } from '@/store/balances-store';
import { useSystemCurrencyStore } from '@/store/system-currency';
import { formatNumberToWhiteSpaces } from '@/utils/numbers';

import { styles } from './Assets.styles';

const Assets = () => {
  const balances = useBalancesStore((state) => state.balances);
  const currency = useSystemCurrencyStore((state) => state.currency);
  const currencyRate = useSystemCurrencyStore((state) => state.currencyRate);

  const assetList = Object.keys(balances);

  if (!assetList.length) {
    return (
      <div {...stylex.props(styles.base)}>
        <span {...stylex.props(styles.placeholder)}>No data found</span>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.base)}>
      {assetList.map((item, idx) => (
        <Link {...stylex.props(styles.assetRow)} key={item} to={`/asset/${item}`}>
          <div {...stylex.props(styles.token)}>
            <TokenIcon size='md' variant='with-border' name={item} />
            <span {...stylex.props(styles.tokenName)}>{item}</span>
          </div>
          <div {...stylex.props(styles.amount)}>
            <span {...stylex.props(styles.tokenName)}>{balances[item].total_balance.balance}</span>
            <span {...stylex.props(styles.amountUsd)}>
              ~{currency}{' '}
              {formatNumberToWhiteSpaces(balances[item].total_balance.balance_usd * currencyRate)}
            </span>
          </div>
          <div {...stylex.props(styles.badgeWrapper)}>
            <span
              {...stylex.props(styles.badge, idx % 2 === 0 ? styles.even : styles.odd)}
            >{`${balances[item].total_balance.price_change >= 0 ? '+' : ''}${balances[item].total_balance.price_change}%`}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Assets;
