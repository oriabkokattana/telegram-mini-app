import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flex } from '@radix-ui/themes';
import { usePopup } from '@telegram-apps/sdk-react';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import { useProfile } from '@/services/user/profile/api';
import Footer from './Footer';
import Profile from './Profile';
import Tables from './Tables';
import TotalBalance from './TotalBalance';

const UIMain = () => {
  const [visible, setVisible] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const popup = usePopup();
  const profile = useProfile();
  const isBottomGap = useCheckBottomGap();
  const navigate = useNavigate();

  const fund = searchParams.get('fund');

  useEffect(() => {
    if (fund) {
      searchParams.delete('fund');
      setSearchParams(searchParams);
      if (popup.supports('open')) {
        popup
          .open({
            title: 'Fund your account',
            message: 'Make a deposit to start trading',
            buttons: [{ id: 'add', type: 'default', text: 'Add Funds' }, { type: 'close' }],
          })
          .then((value) => value === 'add' && navigate('/deposit-network-select'));
      }
    }
  }, [fund]);

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
