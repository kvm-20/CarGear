import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ShoppingCart, CheckCircle, Shield, Truck, Cpu, AlertTriangle } from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container" style={{paddingTop: '100px'}}><h2>Producto no encontrado</h2></div>;
  }

  const isCompatible = product.compatibility.includes('Universal') || product.compatibility.includes('Toyota Hilux');

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-details-page container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/catalog">Catálogo</Link> / {product.name}
      </div>

      <div className="details-grid">
        <div className="details-image-section card bg-glass">
          {product.aiRecommended && (
            <div className="badge badge-ai" style={{ position: 'absolute', top: 20, left: 20 }}>
              ★ Sugerencia de IA
            </div>
          )}
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>

        <div className="details-info-section">
          <div className="mb-2">
            <span className="product-category">{product.category}</span>
          </div>
          <h1>{product.name}</h1>
          
          <div className="ai-compatibility-box mt-4 mb-4">
            <div className="flex-between">
              <span className="flex-center" style={{gap: '8px', fontWeight: 'bold'}}>
                <Cpu size={20} color="var(--primary)" /> Análisis IA de Compatibilidad
              </span>
              <span className="text-muted" style={{fontSize: '0.8rem'}}>Vehículo Actual: Toyota Hilux 2021</span>
            </div>
            <div className={`compat-result mt-3 ${isCompatible ? 'success-bg' : 'danger-bg'}`}>
              {isCompatible ? (
                <>
                  <CheckCircle size={24} color="var(--success)" />
                  <div>
                    <strong>100% Compatible</strong>
                    <p style={{margin: 0, fontSize: '0.9rem'}}>Las dimensiones y los conectores eléctricos encajan perfectamente con el modelo registrado.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={24} color="var(--danger)" />
                  <div>
                    <strong>Incompatibilidad Detectada</strong>
                    <p style={{margin: 0, fontSize: '0.9rem'}}>La IA determinó que este repuesto <b>NO</b> encaja en la estructura de tu Toyota Hilux 2021. Los puntos de anclaje son diferentes.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="price-section mb-4">
            <h2 className="text-gradient" style={{fontSize: '2.5rem'}}>${product.price.toLocaleString('es-CO')}</h2>
            <p className="text-muted">Stock disponible: {product.inStock} unidades</p>
          </div>

          <div className="action-buttons grid grid-cols-2 mb-4">
            <button 
              className={`btn ${added ? 'btn-secondary' : 'btn-primary'} w-100 flex-center`} 
              disabled={product.inStock === 0}
              onClick={handleAddToCart}
              style={{justifyContent: 'center', borderColor: added ? 'var(--success)' : ''}}
            >
              {added ? <><CheckCircle size={20} color="var(--success)" style={{marginRight: '8px'}} /> ¡Añadido!</> : <><ShoppingCart size={20} style={{marginRight: '8px'}} /> Añadir al Carrito</>}
            </button>
            <Link to="/checkout" className="btn btn-secondary w-100" style={{pointerEvents: product.inStock === 0 ? 'none' : 'auto', opacity: product.inStock === 0 ? 0.5 : 1}}>
              Comprar Ahora
            </Link>
          </div>

          <div className="trust-badges mt-5">
            <div className="trust-badge flex-center">
              <Shield size={24} color="var(--primary)" />
              <span>Garantía de 1 año</span>
            </div>
            <div className="trust-badge flex-center">
              <Truck size={24} color="var(--primary)" />
              <span>Envío Nacional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products / AI Suggestions */}
      <div className="related-products mt-5 pt-5" style={{borderTop: '1px solid var(--border-color)'}}>
        <h3 className="mb-4 flex-center" style={{justifyContent: 'flex-start', gap: '10px'}}>
          <Cpu size={24} color="var(--primary)" /> Comprados frecuentemente juntos (Sugerencias IA)
        </h3>
        <div className="grid grid-cols-4">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <div key={p.id} className="card text-center" style={{padding: '16px'}}>
              <img src={p.image} alt={p.name} style={{width: '100%', height:'120px', objectFit:'cover', borderRadius:'8px', marginBottom:'12px'}}/>
              <h4 style={{fontSize: '0.95rem', height: '2.5rem', overflow: 'hidden'}}>{p.name}</h4>
              <p className="text-primary" style={{fontWeight: 'bold'}}>${p.price.toLocaleString('es-CO')}</p>
              <Link to={`/product/${p.id}`} className="btn btn-secondary" style={{padding: '8px', fontSize: '0.8rem', marginTop: '10px', width: '100%'}}>Ver Producto</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
