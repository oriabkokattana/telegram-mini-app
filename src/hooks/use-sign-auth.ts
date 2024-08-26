/**
 * A hook that is responsible for generating the user's signature so that he can log in
 */
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Address } from 'viem';
import { useAccount, useDisconnect, useSignTypedData } from 'wagmi';
import { z } from 'zod';
import { useLaunchParams, usePopup } from '@telegram-apps/sdk-react';
import { useWalletAuth } from '@/services/auth/wallet/api';
import { WalletAuthPayloadSchema } from '@/services/auth/wallet/schema';
import { useUserStore } from '@/store/user-store';
import { openExternalLink } from '@/utils/open-link';

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
  const popup = usePopup();
  const lp = useLaunchParams();
  const authPayloadRef = useRef<z.infer<typeof WalletAuthPayloadSchema>>();

  const { user } = useUserStore();
  const { connector, address, chain, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { mutate } = useWalletAuth();
  const { signTypedData, isPending } = useSignTypedData({
    mutation: {
      onSuccess: (signature) => {
        if (authPayloadRef.current) {
          mutate({ payload: authPayloadRef.current, signature });
        }
      },
      onError: async (error) => {
        toast.warning(error.message);
        await disconnectAsync({ connector });
      },
    },
  });

  const onSignAuth = async (network: string, chainId: number, address: Address, device: string) => {
    if (isPending) {
      console.log('provider doesn`t ready');
      return;
    }
    console.log('signing');

    const data = await popup.open({
      title: 'Broker message sign request!',
      message: 'Please sign a message to get authorized',
      buttons: [
        { id: 'open', type: 'ok' },
        { id: 'cancel', type: 'cancel' },
      ],
    });
    if (!data || data === 'cancel') {
      toast.warning('Action was canceled');
      await disconnectAsync({ connector });
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = (await connector?.getProvider?.()) as any;

    if (
      connector?.id === 'walletConnect' &&
      provider?.signer?.session?.peer?.metadata?.name === 'MetaMask Wallet' &&
      lp.platform === 'ios'
    ) {
      openExternalLink('https://metamask.app.link/wc');
    }
  };

  useEffect(() => {
    if (address && chain?.id && isConnected && !user) {
      onSignAuth('EVM', chain.id, address, window.navigator.userAgent);
    }
  }, [address, isConnected, user]);
};
