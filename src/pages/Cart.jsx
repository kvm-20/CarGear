import { Link } from 'react-router-dom';
import { Trash2, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container" style={{minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="text-center card bg-glass p-5">
          <ShoppingBag size={64} color="var(--primary)" style={{margin: '0 auto 24px', opacity: 0.5}} />
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">Parece que aún no has añadido repuestos a tu carrito de compras.</p>
          <Link to="/catalog" className="btn btn-primary">Volver al Catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="mb-4">Mi <span className="text-gradient">Carrito</span></h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item card bg-glass flex-between">
              <div className="flex-center" style={{gap: '24px'}}>
                <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                <div>
                  <h3>{item.product.name}</h3>
                  <p className="text-muted">{item.product.category}</p>
                  <p className="item-price">${item.product.price.toLocaleString('es-CO')}</p>
                </div>
              </div>
              <div className="flex-center" style={{gap: '24px'}}>
                <div className="quantity-controls flex-center">
                  <button className="btn-icon-small" onClick={() => updateQuantity(item.product.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn-icon-small" onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                </div>
                <button className="btn-icon delete-btn" onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 size={20} color="var(--danger)" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary card bg-glass">
          <h3>Resumen de Compra</h3>
          <hr className="divider" />
          <div className="flex-between mb-2">
            <span>Subtotal</span>
            <span>${cartTotal.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex-between mb-2">
            <span>Envío</span>
            <span style={{color: 'var(--success)'}}>Gratis</span>
          </div>
          <hr className="divider" />
          <div className="flex-between mb-4 total-row">
            <span>Total</span>
            <span className="text-gradient">${cartTotal.toLocaleString('es-CO')}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary w-100 flex-center" style={{justifyContent: 'center'}}>
            <CreditCard size={20} style={{marginRight: '8px'}} /> Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
