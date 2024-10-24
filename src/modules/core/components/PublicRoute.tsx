import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/user-store';
import { Routes } from '@/utils/routes-constants';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { user } = useUserStore();

  useEffect(() => {
    window.setInterval(() => console.log(useUserStore.getState()), 1000);
  }, []);
  return user ? <Navigate to={Routes.HOME} replace /> : children;
};
