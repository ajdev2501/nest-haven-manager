import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Index from '../pages/Index';
import Login from '../pages/Login';
import AdminDashboard from '../pages/admin/Dashboard';
import TenantDashboard from '../pages/tenant/Dashboard';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/tenant'} replace /> : <Index />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Tenant Routes */}
      <Route 
        path="/tenant" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;