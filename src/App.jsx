import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import SellerStats from './pages/SellerStats';
import SellerDashboard from './pages/SellerDashboard';
import OrdersHistory from './pages/OrdersHistory';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Footer from './components/Footer';
import './index.css';

// Simple protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useAuth();
  if (role === 'guest') return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div className="app-container">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              {/* Rutas Publicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              
              {/* Rutas Comprador (o guest para propósitos de demo, pero idealmente buyer) */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<ProtectedRoute allowedRoles={['buyer', 'admin']}><OrdersHistory /></ProtectedRoute>} />
              <Route path="/tracking/:id" element={<ProtectedRoute allowedRoles={['buyer', 'admin']}><OrderTracking /></ProtectedRoute>} />
              
              {/* Rutas B2B / Admin (Dentro del layout del dashboard) */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="seller" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><SellerStats /></ProtectedRoute>} />
                <Route path="seller/inventory" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><SellerDashboard /></ProtectedRoute>} />
              </Route>
            </Routes>
          </main>

          <Footer />
          </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
