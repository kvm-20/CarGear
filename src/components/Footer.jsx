import { Zap, Globe, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo flex-center">
            <Zap className="logo-icon" color="var(--primary)" size={32} />
            <span className="logo-text">CAR<span className="text-gradient">GEAR</span></span>
          </div>
          <p>Todo lo que tu auto necesita. Plataforma líder B2B y B2C en repuestos automotrices con inteligencia artificial.</p>
        </div>
        
        <div className="footer-links">
          <h4>Plataforma</h4>
          <ul>
            <li><a href="/catalog">Catálogo de Productos</a></li>
            <li><a href="/dashboard/seller">Portal B2B Talleres</a></li>
            <li><a href="#">Rastreo de Pedidos</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Contacto</h4>
          <div className="social-icons">
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><Mail size={20} /></a>
            <a href="#" className="social-icon"><Phone size={20} /></a>
            <a href="#" className="social-icon"><MapPin size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CarGear. Todos los derechos reservados. | Desarrollado con tecnología de punta.</p>
      </div>
    </footer>
  );
};

export default Footer;
