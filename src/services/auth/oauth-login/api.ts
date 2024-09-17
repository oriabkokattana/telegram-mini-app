import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserStore } from '@/store/user-store';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { Routes } from '@/utils/routes-constants';
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
  const navigate = useNavigate();
  const initData = useInitData();

  const { setCredentials } = useUserStore();

  const sessionId = initData?.startParam;

  const query = useQuery<z.infer<typeof OAuthLoginAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['auth', 'oauth', sessionId],
    queryFn:
      sessionId && sessionId !== 'debug'
        ? () => oauthLogin({ params: { session_id: sessionId } })
        : skipToken,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const { access_token, refresh_token } = query.data;
      setCredentials({ accessToken: access_token, refreshToken: refresh_token });
      toast.success('Successfully logged in!');
      navigate(Routes.HOME);
    } else if (query.isError) {
      const errorMessage = query.error.response?.data.error;
      toast.error(errorMessage);
    }
  }, [query.isSuccess, query.isError]);
}
