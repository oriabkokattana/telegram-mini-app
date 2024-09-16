import { useNavigate } from 'react-router-dom';
import UXTokenSelectScreen from '@/modules/core/components/UXTokenSelectScreen';
import { useTokens } from '@/services/user/tokens/api';
import { useWithdrawStore } from '@/store/withdraw-store';

import { TokenItem } from '@/types';

const UXWithdrawTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useWithdrawStore((state) => state.setToken);

  const { data } = useTokens('deposit');

  const onSelect = (token: TokenItem) => {
    setToken(token);
    navigate('/ux/withdraw');
  };

  return <UXTokenSelectScreen data={data} onSelect={onSelect} />;
};

export default UXWithdrawTokenSelect;
