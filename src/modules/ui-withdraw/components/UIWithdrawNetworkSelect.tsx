import { useNavigate } from 'react-router-dom';
import UINetworkSelectScreen from '@/modules/core/components/UINetworkSelectScreen';
import { useNetworks } from '@/services/user/networks/api';
import { useWithdrawStore } from '@/store/withdraw-store';

import { NetworkItem } from '@/types';

const UIWithdrawNetworkSelect = () => {
  const navigate = useNavigate();
  const token = useWithdrawStore((state) => state.token);
  const setNetwork = useWithdrawStore((state) => state.setNetwork);

  const { data, isLoading } = useNetworks('withdraw', token?.symbol);

  const onSelect = (network: NetworkItem) => {
    setNetwork(network);
    navigate('/withdraw');
  };

  return (
    <UINetworkSelectScreen
      data={data}
      loading={isLoading}
      token={token}
      direction='withdraw'
      onSelect={onSelect}
    />
  );
};

export default UIWithdrawNetworkSelect;
