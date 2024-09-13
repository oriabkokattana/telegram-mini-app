import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { TokenIcon } from '@/modules/core/design-system/token-icon';
import { formatNumberToWhiteSpaces } from '@/utils/numbers';

import { styles } from './Assets.styles';

const BTC_ASSET = {
  name: 'BTC',
  total: 5,
  totalUsd: 290695,
  changePercent: 4.19,
};

const ETH_ASSET = {
  name: 'ETH',
  total: 106,
  totalUsd: 277104,
  changePercent: -4.19,
};

const assetsArray = [BTC_ASSET, ETH_ASSET, BTC_ASSET, ETH_ASSET, BTC_ASSET];

const Assets = () => {
  return (
    <div {...stylex.props(styles.base)}>
      {assetsArray.map((item, idx) => (
        <Link {...stylex.props(styles.assetRow)} key={idx} to={`/ux/asset/${item.name}`}>
          <div {...stylex.props(styles.token)}>
            <TokenIcon size='md' variant='with-border' name={item.name} />
            <span {...stylex.props(styles.tokenName)}>{item.name}</span>
          </div>
          <div {...stylex.props(styles.amount)}>
            <span {...stylex.props(styles.tokenName)}>{item.total}</span>
            <span {...stylex.props(styles.amountUsd)}>
              ~${formatNumberToWhiteSpaces(item.totalUsd)}
            </span>
          </div>
          <div {...stylex.props(styles.badgeWrapper)}>
            <span
              {...stylex.props(styles.badge, idx % 2 === 0 ? styles.even : styles.odd)}
            >{`${item.changePercent > 0 ? '+' : ''}${item.changePercent}%`}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Assets;
