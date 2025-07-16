import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Index from '../pages/Index';
import Login from '../pages/Login';
import AdminDashboard from '../pages/admin/Dashboard';
import TenantDashboard from '../pages/tenant/Dashboard';
import NotFound from '../pages/NotFound';

// Admin Pages
import AdminRooms from '../pages/admin/Rooms';
import AdminTenants from '../pages/admin/Tenants';
import AdminPayments from '../pages/admin/Payments';
import AdminRequests from '../pages/admin/Requests';
import AdminNotices from '../pages/admin/Notices';

// Tenant Pages
import TenantProfile from '../pages/tenant/Profile';
import TenantRoom from '../pages/tenant/Room';
import TenantRequests from '../pages/tenant/Requests';
import TenantNotices from '../pages/tenant/Notices';
import TenantDocuments from '../pages/tenant/Documents';

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
      <Route 
        path="/admin/rooms" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRooms />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/tenants" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminTenants />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/payments" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPayments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/requests" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRequests />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/notices" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminNotices />
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
      <Route 
        path="/tenant/profile" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenant/room" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantRoom />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenant/requests" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantRequests />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenant/notices" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantNotices />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenant/documents" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantDocuments />
          </ProtectedRoute>
        } 
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;