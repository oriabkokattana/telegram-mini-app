import * as stylex from '@stylexjs/stylex';
import Link from '@/modules/core/components/Link';
import { formatNumberWithCommas } from '@/utils/numbers';

import { styles } from './Portfolio.styles';

const TOKENS = [
  { name: 'BTC', value: 5, changeUSD: 44214, change: 4.19 },
  { name: 'ETH', value: 106, changeUSD: 44214, change: -4.19 },
  { name: 'SOL', value: 50, changeUSD: 44214, change: 4.19 },
  { name: 'BNB', value: 0.09, changeUSD: 44214, change: 4.19 },
  { name: 'USDT', value: 2000, changeUSD: 44214, change: -4.19 },
];

type Change = 'positive' | 'negative';
export type PortfolioTokenRole = 'primary' | 'secondary';

const Portfolio = () => {
  return (
    <div {...stylex.props(styles.base)}>
      {TOKENS.map((token, index) => {
        const change: Change = token.change >= 0 ? 'positive' : 'negative';
        const role: PortfolioTokenRole = index < 2 ? 'primary' : 'secondary';
        return (
          <Link
            {...stylex.props(
              styles.tokenWrapper,
              styles[change],
              styles[role],
              styles.r(role === 'primary' ? index : index - 2, role)
            )}
            key={token.name}
            to={`/ux/asset/${token.name}`}
          >
            <div {...stylex.props(styles.amountWrapper)}>
              <span {...stylex.props(styles[`${role}-amount`])}>
                {formatNumberWithCommas(token.value)}
              </span>
              <span {...stylex.props(styles[`${role}-currency`])}>{token.name}</span>
            </div>
            <div {...stylex.props(styles.changeWrapper)}>
              <span {...stylex.props(styles.percent, styles[`${change}-percent`])}>
                {token.change > 0 ? '+' : ''}
                {token.change}%
              </span>
              <span {...stylex.props(styles.change, styles[`${change}-change`])}>
                {formatNumberWithCommas(token.changeUSD)} USD
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Portfolio;
