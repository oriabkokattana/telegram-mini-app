import { useNavigate } from 'react-router-dom';
import UXTokenSelect from '@/modules/core/components/UXTokenSelect';

const UXDepositTokenSelect = () => {
  const navigate = useNavigate();

  return <UXTokenSelect extended onSubmit={() => navigate('/ux/deposit')} />;
};

export default UXDepositTokenSelect;
