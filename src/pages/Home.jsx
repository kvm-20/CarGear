import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Cpu, TrendingUp, ChevronRight } from 'lucide-react';
import { carDatabase } from '../data/mockData';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const BASE = import.meta.env.BASE_URL;
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const makes = Object.keys(carDatabase);
  const models = selectedMake ? Object.keys(carDatabase[selectedMake]) : [];
  const years = selectedModel ? carDatabase[selectedMake][selectedModel] : [];

  const handleSearch = () => {
    // Navigate to catalog (optionally we could pass state, but for now we just navigate)
    navigate('/catalog');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ '--hero-bg-image': `url('${BASE}img/carro.jpg')` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge animate-fade-in">
            <Cpu size={16} /> Impulsado por Inteligencia Artificial
          </div>
          <h1 className="animate-slide-up">
            EL FUTURO DE LOS<br />
            <span className="text-gradient">REPUESTOS AUTOMOTRICES</span>
          </h1>
          <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Encuentra exactamente lo que necesitas. Nuestra IA garantiza compatibilidad del 100% con tu vehículo.
          </p>
          
          <div className="hero-search-box animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="search-inputs">
              <select className="input-control" value={selectedMake} onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel(''); setSelectedYear(''); }}>
                <option value="">Marca</option>
                {makes.map(make => <option key={make} value={make}>{make}</option>)}
              </select>
              <select className="input-control" value={selectedModel} onChange={(e) => { setSelectedModel(e.target.value); setSelectedYear(''); }} disabled={!selectedMake}>
                <option value="">Modelo</option>
                {models.map(model => <option key={model} value={model}>{model}</option>)}
              </select>
              <select className="input-control" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} disabled={!selectedModel}>
                <option value="">Año</option>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <button onClick={handleSearch} className="btn btn-primary search-btn">
              <Search size={20} /> Buscar Piezas
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <div className="grid grid-cols-3">
          <div className="card feature-card text-center">
            <div className="feature-icon flex-center">
              <ShieldCheck size={32} />
            </div>
            <h3>Garantía de Compatibilidad</h3>
            <p>Nuestro sistema analiza especificaciones técnicas para asegurar que la pieza encaje perfectamente.</p>
          </div>
          <div className="card feature-card text-center">
            <div className="feature-icon flex-center">
              <Cpu size={32} />
            </div>
            <h3>Motor de Recomendación IA</h3>
            <p>Descubre accesorios compatibles y mejoras de rendimiento sugeridas especialmente para tu auto.</p>
          </div>
          <div className="card feature-card text-center">
            <div className="feature-icon flex-center">
              <TrendingUp size={32} />
            </div>
            <h3>Plataforma B2B / B2C</h3>
            <p>Conectamos propietarios de vehículos con la red más grande de talleres y distribuidores.</p>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="container mb-5 mt-5">
        <div className="flex-between mb-4">
          <div>
            <h2 style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Cpu size={28} color="var(--primary)" /> 
              Recomendaciones <span className="text-gradient">Inteligentes</span>
            </h2>
            <p className="text-muted">Basado en tu historial de búsqueda y modelo de vehículo (Toyota Hilux)</p>
          </div>
          <Link to="/catalog" className="btn btn-secondary">Ver todo</Link>
        </div>
        
        <div className="grid grid-cols-4">
          <div className="card text-center" style={{padding: '16px'}}>
            <img src={`${BASE}img/carro.jpg`} alt="Exploradoras" style={{width: '100%', height:'120px', objectFit:'cover', borderRadius:'8px', marginBottom:'12px'}}/>
            <div className="badge badge-ai mb-2" style={{fontSize: '0.7rem'}}>★ 98% Match</div>
            <h4 style={{fontSize: '1rem', height: '2.5rem', overflow: 'hidden'}}>Kit Exploradoras LED Dual Color</h4>
            <p className="text-primary" style={{fontWeight: 'bold'}}>$185,000</p>
          </div>
          <div className="card text-center" style={{padding: '16px'}}>
            <img src={`${BASE}img/carro2.jpg`} alt="Frenos" style={{width: '100%', height:'120px', objectFit:'cover', borderRadius:'8px', marginBottom:'12px'}}/>
            <div className="badge badge-ai mb-2" style={{fontSize: '0.7rem'}}>★ 95% Match</div>
            <h4 style={{fontSize: '1rem', height: '2.5rem', overflow: 'hidden'}}>Pastillas de Freno Cerámicas Pro</h4>
            <p className="text-primary" style={{fontWeight: 'bold'}}>$85,000</p>
          </div>
          <div className="card text-center" style={{padding: '16px'}}>
            <img src={`${BASE}img/carro1.jpg`} alt="Multimedia" style={{width: '100%', height:'120px', objectFit:'cover', borderRadius:'8px', marginBottom:'12px'}}/>
            <div className="badge badge-ai mb-2" style={{fontSize: '0.7rem'}}>★ Sugerencia de Mejora</div>
            <h4 style={{fontSize: '1rem', height: '2.5rem', overflow: 'hidden'}}>Pantalla Táctil Android 10"</h4>
            <p className="text-primary" style={{fontWeight: 'bold'}}>$450,000</p>
          </div>
          <div className="card text-center" style={{padding: '16px', display:'flex', flexDirection:'column', justifyContent:'center', background:'rgba(0, 229, 255, 0.05)', border:'1px dashed var(--primary)'}}>
            <Cpu size={32} color="var(--primary)" style={{margin: '0 auto 16px'}} />
            <h4 style={{color: 'var(--primary)'}}>Nuestra IA está aprendiendo</h4>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Realiza más búsquedas para obtener sugerencias aún más precisas.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section container">
        <div className="card bg-glass cta-card flex-between">
          <div>
            <h2>¿Eres un Taller o Distribuidor?</h2>
            <p>Únete a nuestra plataforma B2B. Gestiona tu inventario y accede a miles de compradores.</p>
          </div>
          <Link to="/dashboard/seller" className="btn btn-primary">
            Acceso Talleres <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
