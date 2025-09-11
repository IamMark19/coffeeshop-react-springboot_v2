import { Route, Routes } from 'react-router-dom';
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
import ProfilePage from './pages/ProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
