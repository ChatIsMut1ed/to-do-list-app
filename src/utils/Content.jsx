import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import BlogPage from '../pages/BlogPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/ProductsPage';
import Profile from '../pages/Profile';
import UserPage from '../pages/UserPage';
import GuestRoutes from './GuestRoutes';
import PrivateRoutes from './PrivateRoutes';
import RecoverPassword from '../pages/RecoverPassword';

export default function Content() {
  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<RecoverPassword />} path="/recover-password" />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route element={<DashboardLayout />} path="/" exact>
          <Route element={<DashboardAppPage />} path="/dashboard" />
          <Route element={<UserPage />} path="/user" />
          <Route element={<ProductsPage />} path="/task-list" />
          <Route element={<BlogPage />} path="/task-list/:id/tasks" />
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Route>
      <Route element={<Page404 />} path="/404" />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
