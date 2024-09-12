import { useNavigate } from 'react-router-dom';
import UXTokenSelectScreen, { TokenItem } from '@/modules/core/components/UXTokenSelectScreen';
import { useDepositStore } from '@/store/deposit-store';

const UXDepositTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useDepositStore((state) => state.setToken);

  const onSelect = (token: TokenItem) => {
    setToken(token.currency);
    navigate('/ux/deposit');
  };

  return <UXTokenSelectScreen extended onSelect={onSelect} />;
};

export default UXDepositTokenSelect;
