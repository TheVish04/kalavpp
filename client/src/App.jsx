
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CartProvider from './context/CartContext';

// Public Pages
import Landing from './pages/public/Landing';
import Auth from './pages/public/Auth';
import ForgotPassword from './pages/public/ForgotPassword';
import SearchResults from './pages/public/SearchResults';
import Shop from './pages/public/Shop';
import ProductDetails from './pages/public/ProductDetails';
import Services from './pages/public/Services';
import ServiceDetails from './pages/public/ServiceDetails';
import ArtistProfile from './pages/public/ArtistProfile';
import NotFound from './pages/public/NotFound';

// Customer Pages
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import DashboardHome from './pages/customer/DashboardHome';
import OrderHistory from './pages/customer/OrderHistory';
import OrderDetails from './pages/customer/OrderDetails';
import MyDownloads from './pages/customer/MyDownloads';
import MyCommissions from './pages/customer/MyCommissions';
import ProfileSettings from './pages/customer/ProfileSettings';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import ProductManager from './pages/vendor/ProductManager';
import AddEditProduct from './pages/vendor/AddEditProduct';
import ServiceManager from './pages/vendor/ServiceManager';
import VendorOrders from './pages/vendor/VendorOrders';
import Wallet from './pages/vendor/Wallet';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CategoryManagement from './pages/admin/CategoryManagement';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />

            {/* Customer Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/downloads" element={<MyDownloads />} />
            <Route path="/commissions" element={<MyCommissions />} />
            <Route path="/settings" element={<ProfileSettings />} />

            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<ProductManager />} />
            <Route path="/vendor/product/add" element={<AddEditProduct />} />
            <Route path="/vendor/product/edit/:id" element={<AddEditProduct />} />
            <Route path="/vendor/services" element={<ServiceManager />} />
            <Route path="/vendor/orders" element={<VendorOrders />} />
            <Route path="/vendor/wallet" element={<Wallet />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/categories" element={<CategoryManagement />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
