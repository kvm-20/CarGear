import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Zap, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { role, user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="navbar-container bg-glass">
      <div className="container flex-between">
        <Link to="/" className="logo flex-center">
          <Zap className="logo-icon" color="var(--primary)" size={28} />
          <span className="logo-text">CAR<span className="text-gradient">GEAR</span></span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
          <Link to="/catalog" className={location.pathname.startsWith('/catalog') ? 'active' : ''}>Catálogo</Link>
          
          {(role === 'buyer' || role === 'admin') && (
            <Link to="/orders" className={location.pathname.startsWith('/orders') || location.pathname.startsWith('/tracking') ? 'active' : ''}>Mis Pedidos</Link>
          )}
          
          {(role === 'seller' || role === 'admin') && (
            <Link to="/dashboard/seller" className={location.pathname.includes('seller') ? 'active' : ''}>Portal B2B</Link>
          )}
          
          {role === 'admin' && (
            <Link to="/dashboard/admin" className={location.pathname.includes('admin') ? 'active' : ''}>Admin</Link>
          )}
        </nav>

        <div className="nav-actions flex-center">
          {(role === 'guest' || role === 'buyer') && (
            <Link to="/cart" className="action-btn cart-btn">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          )}
          
          {role === 'guest' ? (
            <Link to="/login" className="btn btn-secondary flex-center" style={{padding: '6px 16px', fontSize: '0.9rem'}}>
              <LogIn size={16} style={{marginRight: '6px'}} /> Ingresar
            </Link>
          ) : (
            <div className="flex-center" style={{gap: '12px'}}>
              <span className="text-muted" style={{fontSize: '0.85rem'}}>Hola, {user?.name.split(' ')[0]}</span>
              <button className="action-btn" onClick={logout} style={{background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)'}}>
                <LogOut size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
