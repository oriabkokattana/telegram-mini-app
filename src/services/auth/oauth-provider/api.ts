import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { OAuthProviderAPIRequestSchema, OAuthProviderAPIResponseSchema } from './schema';

const OAuthProviderRequest = OAuthProviderAPIRequestSchema;

const OAuthProviderResponse = OAuthProviderAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getGoogleOAuth = api<
  z.infer<typeof OAuthProviderRequest>,
  z.infer<typeof OAuthProviderResponse>
>({
  method: 'GET',
  path: Endpoints.GOOGLE_OAUTH,
  requestSchema: OAuthProviderRequest,
  responseSchema: OAuthProviderResponse,
  type: 'public',
});

const getTwitterOAuth = api<
  z.infer<typeof OAuthProviderRequest>,
  z.infer<typeof OAuthProviderResponse>
>({
  method: 'GET',
  path: Endpoints.TWITTER_OAUTH,
  requestSchema: OAuthProviderRequest,
  responseSchema: OAuthProviderResponse,
  type: 'public',
});

const getFacebookOAuth = api<
  z.infer<typeof OAuthProviderRequest>,
  z.infer<typeof OAuthProviderResponse>
>({
  method: 'GET',
  path: Endpoints.FACEBOOK_OAUTH,
  requestSchema: OAuthProviderRequest,
  responseSchema: OAuthProviderResponse,
  type: 'public',
});

export function useGoogleOauth() {
  return useQuery<z.infer<typeof OAuthProviderAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['auth', 'oauth', 'google'],
    queryFn: () => getGoogleOAuth(),
  });
}

export function useTwitterOauth() {
  return useQuery<z.infer<typeof OAuthProviderAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['auth', 'oauth', 'twitter'],
    queryFn: () => getTwitterOAuth(),
  });
}

export function useFacebookOauth() {
  return useQuery<z.infer<typeof OAuthProviderAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['auth', 'oauth', 'facebook'],
    queryFn: () => getFacebookOAuth(),
  });
}
