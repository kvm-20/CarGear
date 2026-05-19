import { useState } from 'react';
import { products, userVehicles } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Filter, Search, ShieldCheck } from 'lucide-react';
import './Catalog.css';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  
  const selectedVehicle = userVehicles.find(v => v.id.toString() === selectedVehicleId);

  // Extract unique brands
  const brands = [...new Set(products.map(p => p.brand))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="catalog-page container">
      <div className="page-header">
        <h1>CATÁLOGO <span className="text-gradient">INTELIGENTE</span></h1>
        <p>Encuentra repuestos con 100% de compatibilidad garantizada.</p>
      </div>

      <div className="catalog-layout">
        <aside className="filters-sidebar card bg-glass">
          <div className="flex-between mb-4">
            <h3><Filter size={20} /> Filtros</h3>
            <button 
              className="btn-icon-small" 
              onClick={() => {
                setSearchTerm(''); setSelectedCategory('All'); setSelectedBrand('All'); setSelectedVehicleId('');
              }}
              style={{background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem'}}
            >
              Limpiar
            </button>
          </div>
          
          <div className="input-group">
            <label>Buscar por nombre</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="input-control w-100" 
                placeholder="Ej. Faro LED..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} style={{ position: 'absolute', right: 10, top: 12, color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="input-group mt-4">
            <label>Categoría</label>
            <select 
              className="input-control w-100"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">Todas las categorías</option>
              <option value="Iluminación">Iluminación</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Frenos">Frenos</option>
              <option value="Suspensión">Suspensión</option>
            </select>
          </div>

          <div className="input-group mt-4">
            <label>Marca de Pieza</label>
            <select 
              className="input-control w-100"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="All">Todas las marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="input-group mt-4 pt-4" style={{borderTop: '1px solid var(--border-color)'}}>
            <label className="flex-center" style={{justifyContent: 'flex-start', gap: '6px', color: 'var(--primary)'}}>
              <ShieldCheck size={16} /> Tu Vehículo (Verificar IA)
            </label>
            <select 
              className="input-control w-100"
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              style={{borderColor: selectedVehicleId ? 'var(--primary)' : 'var(--border-color)'}}
            >
              <option value="">Selecciona para validar compatibilidad...</option>
              {userVehicles.map(v => (
                <option key={v.id} value={v.id}>{v.make} {v.model} {v.year}</option>
              ))}
            </select>
          </div>
        </aside>

        <main className="catalog-results">
          <div className="results-header flex-between">
            <p>Mostrando {filteredProducts.length} productos {selectedVehicle && <span style={{color: 'var(--primary)'}}>- Analizando para {selectedVehicle.make} {selectedVehicle.model}</span>}</p>
            <select className="input-control" style={{ width: 'auto' }}>
              <option>Recomendados por IA</option>
              <option>Menor Precio</option>
              <option>Mayor Precio</option>
            </select>
          </div>

          <div className="grid grid-cols-2 mt-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} selectedVehicle={selectedVehicle} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center mt-5">
              <h3>No se encontraron productos.</h3>
              <p>Intenta ajustar tus filtros de búsqueda o seleccionar otra categoría.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Catalog;
