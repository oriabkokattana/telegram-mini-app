import { useNavigate } from 'react-router-dom';
import UXTokenSelectScreen, { TokenItem } from '@/modules/core/components/UXTokenSelectScreen';
import { useWithdrawStore } from '@/store/withdraw-store';

const UXWithdrawTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useWithdrawStore((state) => state.setToken);

  const onSelect = (token: TokenItem) => {
    setToken(token.currency);
    navigate('/ux/withdraw');
  };

  return <UXTokenSelectScreen onSelect={onSelect} />;
};

export default UXWithdrawTokenSelect;
