import { useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as stylex from '@stylexjs/stylex';
import AddIcon from '@/assets/add.svg?react';
import ExportIcon from '@/assets/export.svg?react';
import ImportIcon from '@/assets/import.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import StatsChartIcon from '@/assets/stats-chart.svg?react';
import { useSetAppBg } from '@/hooks/use-set-app-bg';
import Link from '@/modules/core/components/Link';
import { IconButton } from '@/modules/core/design-system/icon-button';
import { Input } from '@/modules/core/design-system/input';
import { useLogout } from '@/services/auth/logout/api';
import { useBalances } from '@/services/user/balances/api';
import { useProfile } from '@/services/user/profile/api';
import { useSystemRates } from '@/services/user/system-rates/api';
import { useBalancesStore } from '@/store/balances-store';
import { useProfileStore } from '@/store/profile-store';
import { useSystemCurrencyStore } from '@/store/system-currency';
import Footer from './Footer';
import Overall from './Overall';
import Tables from './Tables';

import { styles } from './UXMain.styles';

const UXMain = () => {
  const { mutate } = useLogout();
  const systemRates = useSystemRates();
  const profile = useProfile();
  const balances = useBalances();

  const setRates = useSystemCurrencyStore((state) => state.setRates);
  const setProfile = useProfileStore((state) => state.setProfile);
  const setBalances = useBalancesStore((state) => state.setBalances);

  useSetAppBg('white');

  useEffect(() => {
    if (systemRates.data && systemRates.isSuccess) {
      setRates(systemRates.data);
    }
  }, [systemRates.data, systemRates.isSuccess]);

  useEffect(() => {
    if (profile.data && profile.isSuccess) {
      setProfile(profile.data);
    }
  }, [balances.data, profile.isSuccess]);

  useEffect(() => {
    if (balances.data && balances.isSuccess) {
      setBalances(balances.data);
    }
  }, [balances.data, balances.isSuccess]);

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.header)}>
        <Avatar.Root {...stylex.props(styles.avatarWrapper)} onClick={() => mutate()}>
          <Avatar.Image
            {...stylex.props(styles.avatar)}
            src={profile.data?.avatar_image}
            alt='avatar'
          />
          <Avatar.Fallback {...stylex.props(styles.fallback)}>A</Avatar.Fallback>
        </Avatar.Root>
        <Input
          size='sm'
          variant='grey100'
          leftElement={<SearchIcon />}
          w='calc(100% - 120px)'
          placeholder='Search'
        />
        <IconButton asChild size='sm' variant='light-gray' Icon={StatsChartIcon}>
          <Link to='/profile' />
        </IconButton>
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
          <Link to='/deposit-token-select' />
        </IconButton>
        <IconButton
          asChild
          size='md'
          variant='gray'
          w='calc(100% / 3)'
          label='Withdraw'
          Icon={ExportIcon}
        >
          <Link to='/withdraw-token-select' />
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
