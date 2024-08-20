import { z } from 'zod';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { OAuthProviderAPIRequestSchema, OAuthProviderAPIResponseSchema } from './schema';

const OAuthProviderRequest = OAuthProviderAPIRequestSchema;

const OAuthProviderResponse = OAuthProviderAPIResponseSchema;

export const getGoogleOAuth = api<
  z.infer<typeof OAuthProviderRequest>,
  z.infer<typeof OAuthProviderResponse>
>({
  method: 'GET',
  path: Endpoints.GOOGLE_OAUTH,
  requestSchema: OAuthProviderRequest,
  responseSchema: OAuthProviderResponse,
  type: 'public',
});

export const getTwitterOAuth = api<
  z.infer<typeof OAuthProviderRequest>,
  z.infer<typeof OAuthProviderResponse>
>({
  method: 'GET',
  path: Endpoints.TWITTER_OAUTH,
  requestSchema: OAuthProviderRequest,
  responseSchema: OAuthProviderResponse,
  type: 'public',
});

export const getFacebookOAuth = api<
  z.infer<typeof OAuthProviderRequest>,
  z.infer<typeof OAuthProviderResponse>
>({
  method: 'GET',
  path: Endpoints.FACEBOOK_OAUTH,
  requestSchema: OAuthProviderRequest,
  responseSchema: OAuthProviderResponse,
  type: 'public',
});
