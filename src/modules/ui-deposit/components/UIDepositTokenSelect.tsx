import { useNavigate } from 'react-router-dom';
import UITokenSelectScreen from '@/modules/core/components/UITokenSelectScreen';
import { useTokens } from '@/services/user/tokens/api';
import { useDepositStore } from '@/store/deposit-store';

import { TokenItem } from '@/types';

const UIDepositTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useDepositStore((state) => state.setToken);

  const { data } = useTokens('deposit');

  const onSelect = (token: TokenItem) => {
    setToken(token);
    navigate('/ui-deposit-network-select');
  };

  return <UITokenSelectScreen data={data} direction='deposit' onSelect={onSelect} />;
};

export default UIDepositTokenSelect;
