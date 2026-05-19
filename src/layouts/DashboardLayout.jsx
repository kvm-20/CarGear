import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Settings, BarChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const location = useLocation();
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar bg-glass">
        <div className="sidebar-header">
          <h3>{isAdmin ? 'Admin Panel' : 'Seller Portal'}</h3>
        </div>
        
        <nav className="sidebar-nav">
          {isAdmin ? (
            <>
              <Link to="/dashboard/admin" className={`sidebar-link ${location.pathname === '/dashboard/admin' ? 'active' : ''}`}>
                <LayoutDashboard size={20} /> Dashboard Admin
              </Link>
              <Link to="/dashboard/seller/inventory" className={`sidebar-link ${location.pathname.includes('/inventory') ? 'active' : ''}`}>
                <Package size={20} /> Inventario
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/seller" className={`sidebar-link ${location.pathname === '/dashboard/seller' ? 'active' : ''}`}>
                <LayoutDashboard size={20} /> Mi Dashboard
              </Link>
              <Link to="/dashboard/seller/inventory" className={`sidebar-link ${location.pathname.includes('/inventory') ? 'active' : ''}`}>
                <Package size={20} /> Mi Inventario
              </Link>
            </>
          )}

          <Link to="#" className="sidebar-link mt-auto">
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
