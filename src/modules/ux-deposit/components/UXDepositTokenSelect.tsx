import { useNavigate } from 'react-router-dom';
import UXTokenSelect, { TokenItem } from '@/modules/core/components/UXTokenSelect';
import { useDepositStore } from '@/store/deposit-store';

const UXDepositTokenSelect = () => {
  const navigate = useNavigate();
  const setToken = useDepositStore((state) => state.setToken);

  const onSelect = (token: TokenItem) => {
    setToken(token.currency);
    navigate('/ux/deposit');
  };

  return <UXTokenSelect extended onSelect={onSelect} />;
};

export default UXDepositTokenSelect;
