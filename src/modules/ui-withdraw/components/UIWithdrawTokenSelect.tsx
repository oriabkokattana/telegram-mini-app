import { useNavigate } from 'react-router-dom';
import UITokenSelectScreen from '@/modules/core/components/UITokenSelectScreen';
import { useTokens } from '@/services/user/tokens/api';
import { useWithdrawStore } from '@/store/withdraw-store';

import { TokenItem } from '@/types';

const UIWithdrawTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useWithdrawStore((state) => state.setToken);

  const { data, isLoading } = useTokens('withdraw');

  const onSelect = (token: TokenItem) => {
    setToken(token);
    navigate('/withdraw-network-select');
  };

  return (
    <UITokenSelectScreen data={data} loading={isLoading} direction='withdraw' onSelect={onSelect} />
  );
};

export default UIWithdrawTokenSelect;
