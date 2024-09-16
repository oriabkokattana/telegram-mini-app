import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { CustodialWalletAPIRequestSchema, CustodialWalletAPIResponseSchema } from './schema';

const CustodialWalletAPIRequest = CustodialWalletAPIRequestSchema;

const CustodialWalletAPIResponse = CustodialWalletAPIResponseSchema;

const getCustodialWallet = api<
  z.infer<typeof CustodialWalletAPIRequest>,
  z.infer<typeof CustodialWalletAPIResponse>
>({
  method: 'GET',
  path: Endpoints.CUSTODIAL_WALLET,
  requestSchema: CustodialWalletAPIRequest,
  responseSchema: CustodialWalletAPIResponse,
  type: 'private',
});

export function useCustodialWallet(network?: string) {
  return useQuery<z.infer<typeof CustodialWalletAPIResponseSchema>, AxiosError<string>>({
    queryKey: ['profile', 'custodial-wallet', network],
    queryFn: network ? () => getCustodialWallet({ params: { network } }) : skipToken,
  });
}
