import { useNavigate } from 'react-router-dom';
import UXTokenSelect, { TokenItem } from '@/modules/core/components/UXTokenSelect';
import { useWithdrawStore } from '@/store/withdraw-store';

const UXWithdrawTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useWithdrawStore((state) => state.setToken);

  const onSelect = (token: TokenItem) => {
    setToken(token.currency);
    navigate('/ux/withdraw');
  };

  return <UXTokenSelect onSelect={onSelect} />;
};

export default UXWithdrawTokenSelect;
