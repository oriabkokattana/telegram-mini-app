import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { useInitData } from '@telegram-apps/sdk-react';
import { useAnalyticsStore } from '@/store/analytics-store';
import { useUserStore } from '@/store/user-store';
import { trackOnboardingSignUpCompleted } from '@/utils/amplitude-events';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { OAuthLoginAPIRequestSchema, OAuthLoginAPIResponseSchema } from './schema';

const OAuthLoginRequest = OAuthLoginAPIRequestSchema;

const OAuthLoginResponse = OAuthLoginAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const oauthLogin = api<z.infer<typeof OAuthLoginRequest>, z.infer<typeof OAuthLoginResponse>>({
  method: 'GET',
  path: Endpoints.OAUTH_LOGIN,
  requestSchema: OAuthLoginRequest,
  responseSchema: OAuthLoginResponse,
  type: 'public',
});

export function useOauthLogin() {
  const initData = useInitData();
  const [loading, setLoading] = useState(true);

  const { setCredentials } = useUserStore();

  const sessionId = initData?.startParam;

  const query = useQuery<z.infer<typeof OAuthLoginAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['auth', 'oauth', sessionId],
    queryFn:
      sessionId && sessionId !== 'debug'
        ? () => oauthLogin({ params: { session_id: sessionId } })
        : skipToken,
    staleTime: Infinity,
  });

  useEffect(() => {
    setLoading(true);
    if (query.isSuccess) {
      const { access_token, refresh_token } = query.data;
      setCredentials({ accessToken: access_token, refreshToken: refresh_token });
      toast.success('Successfully logged in!');
      trackOnboardingSignUpCompleted(useAnalyticsStore.getState().signUpMethod);
    } else if (query.isError) {
      const errorMessage = query.error.response?.data.error;
      console.error(errorMessage);
    }
    setLoading(false);
  }, [query.isSuccess, query.isError]);

  return loading;
}
