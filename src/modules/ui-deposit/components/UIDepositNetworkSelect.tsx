import { useNavigate } from 'react-router-dom';
import UINetworkSelectScreen from '@/modules/core/components/UINetworkSelectScreen';
import { useNetworks } from '@/services/user/networks/api';
import { useDepositStore } from '@/store/deposit-store';

import { NetworkItem } from '@/types';

const UIDepositNetworkSelect = () => {
  const navigate = useNavigate();
  const token = useDepositStore((state) => state.token);
  const setNetwork = useDepositStore((state) => state.setNetwork);

  const { data, isLoading } = useNetworks('deposit', token?.symbol);

  const onSelect = (network: NetworkItem) => {
    setNetwork(network);
    navigate('/deposit');
  };

  return (
    <UINetworkSelectScreen
      data={data}
      loading={isLoading}
      token={token}
      direction='deposit'
      onSelect={onSelect}
    />
  );
};

export default UIDepositNetworkSelect;
