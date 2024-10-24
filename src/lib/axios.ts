import axios, { AxiosError, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
// import { disconnect, getAccount } from 'wagmi/actions';
import { getRefreshToken } from '@/services/auth/refresh-token/api';
import { useUserStore } from '@/store/user-store';
// import { config } from '@/utils/config';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseConfig: CreateAxiosDefaults = {
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  // withCredentials: true,
};

export const instanceWithoutInterceptors = axios.create(baseConfig);

export const instance = axios.create(baseConfig);

instance.interceptors.request.use(
  function (config) {
    const accessToken = useUserStore.getState().user?.accessToken;

    console.log(accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest!.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest!));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await getRefreshToken({
          params: { token: useUserStore.getState().user?.refreshToken },
        });

        const payload = response;

        useUserStore.setState({
          user: { accessToken: payload.access_token, refreshToken: payload.refresh_token },
        });

        originalRequest.headers.Authorization = `Bearer ${payload.access_token}`;
        isRefreshing = false;
        onRefreshed(payload.access_token);

        return instance(originalRequest);
      } catch (error) {
        isRefreshing = false;
        if (error instanceof AxiosError && error.response?.status === 400) {
          useUserStore.getState().removeCredentials();
          // const { connector, isConnected } = getAccount(config);
          // if (isConnected) {
          //   await disconnect(config, { connector });
          // }
          return;
        }
      }
    }

    return Promise.reject(error);
  }
);
