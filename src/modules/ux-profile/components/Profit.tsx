import * as stylex from '@stylexjs/stylex';
import ChartWithTimeframes from '@/modules/core/components/ChartWithTimeframes';

import { styles } from './Profit.styles';

const Profit = () => {
  return (
    <div {...stylex.props(styles.base)}>
      <span {...stylex.props(styles.header)}>Profit</span>
      <ChartWithTimeframes />
      <div {...stylex.props(styles.statistics)}>
        <div {...stylex.props(styles.stat)}>
          <span {...stylex.props(styles.text)}>Deposits</span>
          <span {...stylex.props(styles.text)}>+ 0,0004</span>
        </div>
        <div {...stylex.props(styles.stat)}>
          <span {...stylex.props(styles.text)}>Withdrawals</span>
          <span {...stylex.props(styles.text)}>- 0,0004</span>
        </div>
        <div {...stylex.props(styles.stat)}>
          <span {...stylex.props(styles.text)}>Savings on fees</span>
          <span {...stylex.props(styles.text)}>+ 100,400.90 $ (2%)</span>
        </div>
      </div>
    </div>
  );
};

export default Profit;
