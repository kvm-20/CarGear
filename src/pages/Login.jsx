import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Zap, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    // Simulamos pequeño delay de autenticación
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        if (result.role === 'buyer') navigate('/');
        if (result.role === 'seller') navigate('/dashboard/seller');
        if (result.role === 'admin') navigate('/dashboard/admin');
      } else {
        setError('Correo o contraseña incorrectos. Verifica tus credenciales.');
        setLoading(false);
      }
    }, 800);
  };

  const fillCredentials = (emailVal, passVal) => {
    setEmail(emailVal);
    setPassword(passVal);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* Panel izquierdo — branding */}
        <div className="login-brand-panel">
          <div className="brand-content">
            <div className="logo flex-center mb-4" style={{ justifyContent: 'flex-start', gap: '10px' }}>
              <Zap color="var(--primary)" size={36} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', letterSpacing: '2px' }}>
                CAR<span className="text-gradient">GEAR</span>
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
              Tu marketplace de<br />
              <span className="text-gradient">repuestos automotrices</span>
            </h2>
            <p className="text-muted" style={{ lineHeight: 1.7 }}>
              Accede a miles de repuestos con compatibilidad verificada por IA. Plataforma B2B y B2C.
            </p>

            {/* Credenciales de demo */}
            <div className="demo-credentials">
              <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Cuentas de Demostración
              </p>
              <div className="cred-card" onClick={() => fillCredentials('comprador@cargear.com', 'comprador123')}>
                <span className="cred-role">👤 Comprador</span>
                <span className="cred-info">comprador@cargear.com · comprador123</span>
              </div>
              <div className="cred-card" onClick={() => fillCredentials('taller@cargear.com', 'taller123')}>
                <span className="cred-role">🔧 Vendedor</span>
                <span className="cred-info">taller@cargear.com · taller123</span>
              </div>
              <div className="cred-card" onClick={() => fillCredentials('admin@cargear.com', 'admin123')}>
                <span className="cred-role">🛡️ Administrador</span>
                <span className="cred-info">admin@cargear.com · admin123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho — formulario */}
        <div className="login-form-panel card bg-glass">
          <div className="text-center mb-5">
            <h1 style={{ fontSize: '1.8rem' }}>
              Iniciar <span className="text-gradient">Sesión</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Campo correo */}
            <div className="input-group mb-4">
              <label>Correo Electrónico</label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="input-control input-with-icon"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Campo contraseña */}
            <div className="input-group mb-4">
              <label>Contraseña</label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-control input-with-icon input-with-icon-right"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="login-error animate-fade-in">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Botón */}
            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary w-100 flex-center mt-2"
              style={{ justifyContent: 'center', height: '48px', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                'Entrar a CarGear'
              )}
            </button>
          </form>

          <p className="text-muted text-center mt-4" style={{ fontSize: '0.8rem' }}>
            💡 Haz clic en una cuenta demo del panel izquierdo para rellenar automáticamente.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
