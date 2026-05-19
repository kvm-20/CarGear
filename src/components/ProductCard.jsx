import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, selectedVehicle }) => {
  // Check compatibility based on selected vehicle
  let isCompatible = true;
  let compatMessage = "Compatible (Universal)";
  
  if (selectedVehicle) {
    const vehicleString = `${selectedVehicle.make} ${selectedVehicle.model}`;
    const matches = product.compatibility.some(c => c.includes(vehicleString) || c.includes('Universal'));
    isCompatible = matches;
    compatMessage = matches ? `Compatible con tu ${vehicleString}` : `No compatible con ${vehicleString}`;
  } else {
    compatMessage = "Selecciona tu vehículo para verificar";
    isCompatible = false; // Neutral state
  }

  // Si no hay vehículo seleccionado pero el producto es universal, lo mostramos como compatible
  if (!selectedVehicle && product.compatibility.some(c => c.includes('Universal'))) {
    isCompatible = true;
    compatMessage = "Compatible (Universal)";
  }

  return (
    <div className="card product-card">
      {product.aiRecommended && (
        <div className="badge badge-ai recommended-badge">★ Sugerencia IA</div>
      )}
      
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.inStock === 0 && (
          <div className="out-of-stock-overlay">Agotado</div>
        )}
      </div>
      
      <div className="product-info">
        <div className="flex-between mb-2">
          <span className="product-category">{product.category}</span>
          <span className="product-brand text-muted" style={{fontSize: '0.8rem'}}>{product.brand}</span>
        </div>
        
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        
        <div className={`product-compatibility ${selectedVehicle ? (isCompatible ? 'compat-success' : 'compat-danger') : 'compat-neutral'}`}>
          {isCompatible ? (
            <><CheckCircle size={14} /> <span>{compatMessage}</span></>
          ) : (
            <><AlertTriangle size={14} /> <span>{compatMessage}</span></>
          )}
        </div>

        <div className="product-availability mt-2 mb-3 text-muted" style={{fontSize: '0.85rem'}}>
          {product.inStock > 0 ? (
             <span style={{color: 'var(--success)'}}>Disponibilidad: {product.inStock} uds en stock</span>
          ) : (
             <span style={{color: 'var(--danger)'}}>Sin disponibilidad temporal</span>
          )}
        </div>
        
        <div className="product-price-row flex-between">
          <span className="product-price">${product.price.toLocaleString('es-CO')}</span>
          <button className="btn-icon add-to-cart" disabled={product.inStock === 0} style={{opacity: product.inStock === 0 ? 0.5 : 1}}>
            <ShoppingCart size={20} />
          </button>
        </div>
        
        <Link to={`/product/${product.id}`} className="btn btn-secondary w-100 mt-3 flex-center">
          <Info size={16} style={{marginRight: '6px'}}/> Especificaciones
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
