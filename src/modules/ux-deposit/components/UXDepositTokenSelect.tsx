import { useNavigate } from 'react-router-dom';
import UXTokenSelectScreen from '@/modules/core/components/UXTokenSelectScreen';
import { useTokens } from '@/services/user/tokens/api';
import { useDepositStore } from '@/store/deposit-store';

import { TokenItem } from '@/types';

const UXDepositTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useDepositStore((state) => state.setToken);

  const { data } = useTokens('deposit');

  const onSelect = (token: TokenItem) => {
    setToken(token);
    navigate('/ux/deposit');
  };

  return <UXTokenSelectScreen data={data} extended onSelect={onSelect} />;
};

export default UXDepositTokenSelect;
