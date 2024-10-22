import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePopup } from '@telegram-apps/sdk-react';
import { useCheckBottomGap } from '@/hooks/use-check-bottom-gap';
import PullToUpdate from '../../core/components/PullToUpdate';
import Footer from './Footer';
import Profile from './Profile';
import Tables from './Tables';
import TotalBalance from './TotalBalance';

const UIMain = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const popup = usePopup();
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
    <>
      <PullToUpdate
        direction='column'
        gap='5'
        px='4'
        pt='2'
        pb={isBottomGap ? '102px' : '78px'}
        enabled
      >
        <Profile />
        <TotalBalance />
        <Tables />
      </PullToUpdate>
      <Footer />
    </>
  );
};

export default UIMain;
