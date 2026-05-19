import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Briefcase, ChevronRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === 'buyer') navigate('/');
    if (role === 'seller') navigate('/dashboard/seller');
    if (role === 'admin') navigate('/dashboard/admin');
  };

  return (
    <div className="login-page container">
      <div className="login-card card bg-glass">
        <div className="text-center mb-5">
          <h1>INICIAR <span className="text-gradient">SESIÓN</span></h1>
          <p className="text-muted">Selecciona tu perfil de usuario para ingresar a la plataforma (Modo Demo).</p>
        </div>

        <div className="role-options">
          <div className="role-card" onClick={() => handleLogin('buyer')}>
            <User size={32} color="var(--primary)" />
            <h3>Comprador (B2C)</h3>
            <p className="text-muted">Busca repuestos y gestiona tus pedidos vehiculares.</p>
            <button className="btn btn-secondary w-100 mt-3 flex-center">Entrar <ChevronRight size={16}/></button>
          </div>

          <div className="role-card" onClick={() => handleLogin('seller')}>
            <Briefcase size={32} color="var(--warning)" />
            <h3>Vendedor (B2B)</h3>
            <p className="text-muted">Gestiona tu inventario y recibe pedidos de clientes.</p>
            <button className="btn btn-secondary w-100 mt-3 flex-center" style={{borderColor:'var(--warning)', color:'var(--warning)'}}>Entrar <ChevronRight size={16}/></button>
          </div>

          <div className="role-card" onClick={() => handleLogin('admin')}>
            <Shield size={32} color="var(--danger)" />
            <h3>Administrador</h3>
            <p className="text-muted">Supervisa la plataforma, usuarios y métricas globales.</p>
            <button className="btn btn-secondary w-100 mt-3 flex-center" style={{borderColor:'var(--danger)', color:'var(--danger)'}}>Entrar <ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
