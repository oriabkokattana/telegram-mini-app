/**
 * A hook that is responsible for generating the user's signature so that he can log in
 */
import { useEffect, useRef } from 'react';
import { Address } from 'viem';
import { useAccount, useSignTypedData } from 'wagmi';
import { z } from 'zod';
import { useWalletAuth } from '@/services/auth/wallet/api';
import { WalletAuthPayloadSchema } from '@/services/auth/wallet/schema';

const TWO_WEEKS_IN_SEC = 1209600;
const DESCRIPTION =
  'Sign up to create a user session that will allow you to work with limit orders, price alerts, watchlist and other features of Kattana Broker. Note: This permission does not apply to token management';

const types = {
  Auth: [
    { name: 'comment', type: 'string' },
    { name: 'network', type: 'string' },
    { name: 'wallet', type: 'address' },
    { name: 'device', type: 'string' },
    { name: 'expired_at', type: 'int64' },
    { name: 'ip_restricted', type: 'bool' },
  ],
};

const primaryType = 'Auth';

export const useSignAuth = () => {
  const authPayloadRef = useRef<z.infer<typeof WalletAuthPayloadSchema>>();

  const { address, chain, isConnected } = useAccount();
  const { mutate } = useWalletAuth();
  const { signTypedData, isPending } = useSignTypedData({
    mutation: {
      onSuccess: (signature) => {
        if (authPayloadRef.current) {
          mutate({ payload: authPayloadRef.current, signature });
        }
      },
    },
  });

  const onSignAuth = (network: string, chainId: number, address: Address, device: string) => {
    if (isPending) {
      console.log('provider doesn`t ready');
      return;
    }

    const expiredAt = Math.floor(new Date().getTime() / 1000) + TWO_WEEKS_IN_SEC;
    const ipRestricted = false;
    const message: Omit<z.infer<typeof WalletAuthPayloadSchema>, 'chainId'> = {
      comment: DESCRIPTION,
      network,
      wallet: address,
      device,
      expired_at: expiredAt.toString(),
      ip_restricted: ipRestricted,
    };

    const domain = {
      name: 'Kattana Auth',
      version: '1',
      chainId,
    };

    authPayloadRef.current = { ...message, chainId };
    signTypedData({ domain, types, primaryType, message });
  };

  useEffect(() => {
    if (address && chain?.id && isConnected) {
      onSignAuth('EVM', chain.id, address, window.navigator.userAgent);
    }
  }, [address, isConnected]);
};
