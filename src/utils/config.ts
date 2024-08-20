import { arbitrum, base, bsc, mainnet, optimism, polygon } from 'viem/chains';
import { Config, http } from 'wagmi';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

export const config: Config = getDefaultConfig({
  appName: 'Kattana Broker',
  appUrl: 'https://telegram-mini-app-delta-sooty.vercel.app/',
  appDescription: 'broker',
  projectId: '1feba9274f57a2b9d18578ca7ef5c715',
  wallets: [{ groupName: 'allowed', wallets: [walletConnectWallet] }],
  chains: [mainnet, bsc, polygon, optimism, arbitrum, base],
  transports: { [mainnet.id]: http() },
});
