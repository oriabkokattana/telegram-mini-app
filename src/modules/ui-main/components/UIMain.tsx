import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useProfile } from '@/services/user/profile/api';
import Footer from './Footer';
import Profile from './Profile';
import Tables from './Tables';
import TotalBalance from './TotalBalance';

const UIMain = () => {
  const profile = useProfile();
  const [visible, setVisible] = useState(true);
  const { platform } = useLaunchParams();

  return (
    <Flex direction='column' gap='5' px='4' pt='2' pb={platform === 'ios' ? '102px' : '78px'}>
      <Profile avatar={profile.data?.avatar_image} nickname={profile.data?.nickname} />
      <TotalBalance
        balance={profile.data?.total_balance}
        dailyDiff={profile.data?.daily_profit_diff}
        dailyUSD={profile.data?.daily_profit_usd}
        allTimeDiff={profile.data?.all_time_profit_diff}
        allTimeUSD={profile.data?.all_time_profit_usd}
        visible={visible}
        setVisible={setVisible}
      />
      <Tables visible={visible} />
      <Footer />
    </Flex>
  );
};

export default UIMain;
