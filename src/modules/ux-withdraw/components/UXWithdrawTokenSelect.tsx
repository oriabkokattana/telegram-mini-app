import { useNavigate } from 'react-router-dom';
import UXTokenSelect from '@/modules/core/components/UXTokenSelect';

const UXWithdrawTokenSelect = () => {
  const navigate = useNavigate();

  return <UXTokenSelect onSubmit={() => navigate('/ux/withdraw')} />;
};

export default UXWithdrawTokenSelect;
