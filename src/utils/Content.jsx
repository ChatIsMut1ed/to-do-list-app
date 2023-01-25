import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

export default function Content() {
  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route element={<LoginPage />} path="/login" />
      </Route>
      <Route element={<DashboardLayout />} path="/dashboard" exact>
        <Route element={<PrivateRoutes />}>
          <Route element={<DashboardAppPage />} path="/dashboard/app" />
          <Route element={<UserPage />} path="/dashboard/dashboard/user" />
          <Route element={<ProductsPage />} path="/dashboard/task-list" />
          <Route element={<BlogPage />} path="/dashboard/task-list/:id/tasks" />
          <Route element={<Profile />} path="/dashboard/profile" />
        </Route>
      </Route>
      <Route element={<Page404 />} path="/404" />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
