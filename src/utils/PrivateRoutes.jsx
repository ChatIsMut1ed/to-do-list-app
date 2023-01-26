import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
  const authStore = JSON.parse(localStorage.getItem('auth'));
  return authStore ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
