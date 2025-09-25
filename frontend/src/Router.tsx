import { Navigate, Route, Routes } from 'react-router-dom';
// Layouts
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
// Pages
import HomePage from '@/pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailPage from './pages/OrderDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { useAuth } from './hooks/useAuth';
import { AuthUser } from './types';

const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}: {
  user: AuthUser;
  redirectPath?: string;
  children: JSX.Element;
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const AdminRoute = ({
  user,
  redirectPath = '/',
  children,
}: {
  user: AuthUser;
  redirectPath?: string;
  children: JSX.Element;
}) => {
  if (user?.role !== 'ADMIN') {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute user={user}>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute user={user}>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
