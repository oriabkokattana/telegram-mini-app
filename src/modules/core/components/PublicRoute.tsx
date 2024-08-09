import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/user-store';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { user } = useUserStore();
  return user ? <Navigate to='/' /> : children;
};
