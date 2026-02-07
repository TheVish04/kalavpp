
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../store/AuthContext';
import CartProvider from '../features/cart/context/CartContext';

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

function App() {
  return (
    <AuthProvider>
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

            {/* Customer Routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/dashboard" element={<DashboardHomePage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
            <Route path="/downloads" element={<MyDownloadsPage />} />
            <Route path="/commissions" element={<MyCommissionsPage />} />
            <Route path="/settings" element={<ProfileSettingsPage />} />

            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
            <Route path="/vendor/products" element={<ProductManagerPage />} />
            <Route path="/vendor/add-product" element={<AddEditProductPage />} />
            <Route path="/vendor/edit-product/:id" element={<AddEditProductPage />} />
            <Route path="/vendor/commissions" element={<ServiceManagerPage />} />
            <Route path="/vendor/orders" element={<VendorOrdersPage />} />
            <Route path="/vendor/payouts" element={<WalletPage />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/categories" element={<CategoryManagementPage />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
