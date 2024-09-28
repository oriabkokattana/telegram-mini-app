import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { useProfile } from '@/services/user/profile/api';
import Footer from './Footer';
import Profile from './Profile';
import Tables from './Tables';
import TotalBalance from './TotalBalance';

const UIMain = () => {
  const profile = useProfile();
  const [visible, setVisible] = useState(true);
  const isBottomGap = useCheckBottomGap();

  return (
    <Flex direction='column' gap='5' px='4' pt='2' pb={isBottomGap ? '102px' : '78px'}>
      <Profile avatar={profile.data?.avatar_image} nickname={profile.data?.nickname} />
      <TotalBalance visible={visible} setVisible={setVisible} />
      <Tables visible={visible} />
      <Footer />
    </Flex>
  );
};

export default UIMain;
