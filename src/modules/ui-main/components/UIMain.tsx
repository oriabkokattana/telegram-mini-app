import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { useProfile } from '@/services/user/profile/api';
import Footer from './Footer';
import Profile from './Profile';
import Tables from './Tables';
import TotalBalance from './TotalBalance';

const UIMain = () => {
  const profile = useProfile();
  const [visible, setVisible] = useState(true);

  return (
    <Flex direction='column' gap='5' px='4' py='2'>
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
