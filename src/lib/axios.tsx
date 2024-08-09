import axios, { AxiosError, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { getRefreshToken } from '@/services/refresh-token/api';
import { useUserStore } from '@/store/user-store';
import { StorageKeys } from '@/utils/local-storage-constants';

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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await getRefreshToken();

        const { payload } = response;

        useUserStore.setState({ user: { accessToken: payload.accessToken } });
        window.localStorage.setItem(StorageKeys.TOKEN, payload.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          useUserStore.getState().removeCredentials();
          window.localStorage.removeItem(StorageKeys.TOKEN);
          return;
        }
      }
    }

    return Promise.reject(error);
  }
);
