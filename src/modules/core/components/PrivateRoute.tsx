import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/user-store';
import { Routes } from '@/utils/routes-constants';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to={Routes.AUTH} replace />;
};
