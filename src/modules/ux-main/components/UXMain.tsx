import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import AddIcon from '@/assets/add.svg?react';
import ChevronDownIcon from '@/assets/chevron-down.svg?react';
import ExportIcon from '@/assets/export.svg?react';
import ImportIcon from '@/assets/import.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import StatsChartIcon from '@/assets/stats-chart.svg?react';
import Link from '@/modules/core/components/Link';
import { IconButton } from '@/modules/core/design-system/icon-button';
import Footer from './Footer';
import Overall from './Overall';
import Tables from './Tables';

import { styles } from './UXMain.styles';

const UXMain = () => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor('#FFFFFF');
    miniApp.setBgColor('#FFFFFF');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.account)}>
        <div {...stylex.props(styles.addressBar)}>
          <IconButton size='sm' variant='light-gray' Icon={SearchIcon} />
          <div {...stylex.props(styles.nickname)}>
            <span {...stylex.props(styles.nicknameText)}>0x07ae…8c52</span>
            <ChevronDownIcon />
          </div>
          <IconButton size='sm' variant='light-gray' Icon={StatsChartIcon} />
        </div>
      </div>
      <Overall />
      <div {...stylex.props(styles.actions)}>
        <IconButton
          asChild
          size='md'
          variant='black'
          w='calc(100% / 3)'
          label='Deposit'
          Icon={ImportIcon}
        >
          <Link to='/ux/deposit-token-select' />
        </IconButton>
        <IconButton
          asChild
          size='md'
          variant='gray'
          w='calc(100% / 3)'
          label='Withdraw'
          Icon={ExportIcon}
        >
          <Link to='/ux/withdraw-token-select' />
        </IconButton>
        <IconButton
          size='md'
          variant='outline'
          w='calc(100% / 3)'
          label='Add a label'
          Icon={AddIcon}
        />
      </div>
      <Tables />
      <Footer />
    </div>
  );
};

export default UXMain;
