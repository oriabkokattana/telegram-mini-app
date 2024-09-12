import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import OpenIcon from '@/assets/open.svg?react';
import { Button } from '@/modules/core/design-system/button';
import tokenGraph from '../media/token-graph.svg';

import { styles } from './TokenGraph.styles';

const TokenGraph = () => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor('#FFFFFF');
    miniApp.setBgColor('#FFFFFF');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <span {...stylex.props(styles.header)}>Route</span>
        <OpenIcon />
      </div>
      <div {...stylex.props(styles.tokenGraphWrapper)}>
        <img {...stylex.props(styles.tokenGraph)} src={tokenGraph} alt='Token route graph' />
        <span {...stylex.props(styles.from)}>50 USDT</span>
        <span {...stylex.props(styles.to)}>50 ETH</span>
      </div>
      <Button size='md'>
        <span>You're saving</span>
        <span {...stylex.props(styles.feeLabel)}>1.5% fee</span>
      </Button>
    </div>
  );
};

export default TokenGraph;
