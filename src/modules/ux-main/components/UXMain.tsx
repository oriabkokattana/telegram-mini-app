import { useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as stylex from '@stylexjs/stylex';
import { useMiniApp } from '@telegram-apps/sdk-react';
import AddIcon from '@/assets/add.svg?react';
import ExportIcon from '@/assets/export.svg?react';
import ImportIcon from '@/assets/import.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import StatsChartIcon from '@/assets/stats-chart.svg?react';
import Link from '@/modules/core/components/Link';
import { IconButton } from '@/modules/core/design-system/icon-button';
import { Input } from '@/modules/core/design-system/input';
import { useLogout } from '@/services/auth/logout/api';
import avatar from '../media/avatar.jpeg';
import Footer from './Footer';
import Overall from './Overall';
import Tables from './Tables';

import { styles } from './UXMain.styles';

const UXMain = () => {
  const miniApp = useMiniApp();
  const { mutate } = useLogout();

  useEffect(() => {
    miniApp.setHeaderColor('#FFFFFF');
    miniApp.setBgColor('#FFFFFF');
  }, []);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.header)}>
        <Avatar.Root {...stylex.props(styles.avatarWrapper)} onClick={() => mutate()}>
          <Avatar.Image {...stylex.props(styles.avatar)} src={avatar} alt='avatar' />
          <Avatar.Fallback {...stylex.props(styles.fallback)}>U</Avatar.Fallback>
        </Avatar.Root>
        <Input
          size='sm'
          variant='grey100'
          leftElement={<SearchIcon />}
          w='100%'
          placeholder='Search'
        />
        <IconButton size='sm' variant='light-gray' Icon={StatsChartIcon} />
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