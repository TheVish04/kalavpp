import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import CartProvider from '../features/cart/context/CartContext';
import ToastProvider from '../store/ToastContext';
import ProtectedRoute from '../shared/components/ProtectedRoute';

// Public Pages
import LandingPage from '../features/landing/pages/LandingPage';
import AuthPage from '../features/auth/pages/AuthPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import SearchResultsPage from '../features/search/pages/SearchResultsPage';
import ShopPage from '../features/shop/pages/ShopPage';
import ProductDetailPage from '../features/shop/pages/ProductDetailPage';
import ServicesPage from '../features/services/pages/ServicesPage';
import ServiceDetailPage from '../features/services/pages/ServiceDetailPage';
import ArtistProfilePage from '../features/artist/pages/ArtistProfilePage';
import NotFoundPage from '../shared/pages/NotFoundPage';

// Customer Pages
import CartPage from '../features/cart/pages/CartPage';
import CheckoutPage from '../features/checkout/pages/CheckoutPage';
import OrderSuccessPage from '../features/orders/pages/OrderSuccessPage';
import DashboardHomePage from '../features/profile/pages/DashboardHomePage';
import OrderHistoryPage from '../features/orders/pages/OrderHistoryPage';
import OrderDetailPage from '../features/orders/pages/OrderDetailPage';
import MyDownloadsPage from '../features/downloads/pages/MyDownloadsPage';
import MyCommissionsPage from '../features/commissions/pages/MyCommissionsPage';
import ProfileSettingsPage from '../features/profile/pages/ProfileSettingsPage';

// Vendor Pages
import VendorDashboardPage from '../features/vendor/pages/VendorDashboardPage';
import ProductManagerPage from '../features/vendor/pages/ProductManagerPage';
import AddEditProductPage from '../features/vendor/pages/AddEditProductPage';
import ServiceManagerPage from '../features/vendor/pages/ServiceManagerPage';
import VendorOrdersPage from '../features/vendor/pages/VendorOrdersPage';
import WalletPage from '../features/vendor/pages/WalletPage';

// Admin Pages
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import UserManagementPage from '../features/admin/pages/UserManagementPage';
import CategoryManagementPage from '../features/admin/pages/CategoryManagementPage';
import ModerationPage from '../features/admin/pages/ModerationPage';
import FinancialsPage from '../features/admin/pages/FinancialsPage';
import SystemHealthPage from '../features/admin/pages/SystemHealthPage';
import AdminProductManagementPage from '../features/admin/pages/AdminProductManagementPage';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            <Route path="/artist/:id" element={<ArtistProfilePage />} />

            {/* Customer Routes - requires auth, any role */}
            <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><CartPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><CheckoutPage /></ProtectedRoute>} />
            <Route path="/order-success" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><OrderSuccessPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><DashboardHomePage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><OrderHistoryPage /></ProtectedRoute>} />
            <Route path="/order/:id" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><OrderDetailPage /></ProtectedRoute>} />
            <Route path="/downloads" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><MyDownloadsPage /></ProtectedRoute>} />
            <Route path="/commissions" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><MyCommissionsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}><ProfileSettingsPage /></ProtectedRoute>} />

            {/* Vendor Routes - requires vendor or admin */}
            <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><VendorDashboardPage /></ProtectedRoute>} />
            <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><ProductManagerPage /></ProtectedRoute>} />
            <Route path="/vendor/add-product" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><AddEditProductPage /></ProtectedRoute>} />
            <Route path="/vendor/edit-product/:id" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><AddEditProductPage /></ProtectedRoute>} />
            <Route path="/vendor/commissions" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><ServiceManagerPage /></ProtectedRoute>} />
            <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><VendorOrdersPage /></ProtectedRoute>} />
            <Route path="/vendor/payouts" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><WalletPage /></ProtectedRoute>} />

            {/* Admin Routes - requires admin only */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagementPage /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProductManagementPage /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><CategoryManagementPage /></ProtectedRoute>} />
            <Route path="/admin/moderation" element={<ProtectedRoute allowedRoles={['admin']}><ModerationPage /></ProtectedRoute>} />
            <Route path="/admin/financials" element={<ProtectedRoute allowedRoles={['admin']}><FinancialsPage /></ProtectedRoute>} />
            <Route path="/admin/system" element={<ProtectedRoute allowedRoles={['admin']}><SystemHealthPage /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
