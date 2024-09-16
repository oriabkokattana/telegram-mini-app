import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { useBalancesStore } from '@/store/balances-store';
import { formatNumberToWhiteSpaces } from '@/utils/numbers';

import { styles } from './Assets.styles';

const Assets = () => {
  const balances = useBalancesStore((state) => state.balances);

  return (
    <div {...stylex.props(styles.base)}>
      {Object.keys(balances).map((item, idx) => (
        <Link {...stylex.props(styles.assetRow)} key={item} to={`/ux/asset/${item}`}>
          <div {...stylex.props(styles.token)}>
            <TokenIcon size='md' variant='with-border' name={item} />
            <span {...stylex.props(styles.tokenName)}>{item}</span>
          </div>
          <div {...stylex.props(styles.amount)}>
            <span {...stylex.props(styles.tokenName)}>{balances[item].total_balance.balance}</span>
            <span {...stylex.props(styles.amountUsd)}>
              ~${formatNumberToWhiteSpaces(balances[item].total_balance.balance_usd)}
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
