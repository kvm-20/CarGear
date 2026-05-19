import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import './Checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Simulamos un proceso de pago
    setTimeout(() => {
      addOrder(cartItems, cartTotal);
      clearCart();
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container" style={{paddingTop: '120px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="card bg-glass text-center" style={{padding: '60px 40px', maxWidth: '600px'}}>
          <CheckCircle size={80} color="var(--success)" style={{margin: '0 auto 24px'}} />
          <h1>¡Pago <span className="text-gradient">Exitoso</span>!</h1>
          <p className="text-muted mt-3 mb-5" style={{fontSize: '1.1rem'}}>Tu pedido ha sido procesado correctamente. Hemos enviado los detalles de facturación a tu correo electrónico registrado.</p>
          <div className="flex-center" style={{gap: '16px', justifyContent: 'center'}}>
            <Link to="/orders" className="btn btn-primary">Rastrear mi Pedido</Link>
            <Link to="/catalog" className="btn btn-secondary">Volver al Catálogo</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="mb-4">Finalizar <span className="text-gradient">Compra</span></h1>
      
      <div className="checkout-layout">
        <div className="checkout-forms">
          <div className="card bg-glass mb-4">
            <h3 className="mb-4">Información de Envío</h3>
            <div className="grid grid-cols-2">
              <div className="input-group">
                <label>Nombre Completo</label>
                <input type="text" className="input-control" placeholder="Juan Pérez" />
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <input type="tel" className="input-control" placeholder="300 000 0000" />
              </div>
            </div>
            <div className="input-group mt-3">
              <label>Dirección de Envío</label>
              <input type="text" className="input-control" placeholder="Calle 123 # 45 - 67" />
            </div>
            <div className="grid grid-cols-2 mt-3">
              <div className="input-group">
                <label>Ciudad</label>
                <input type="text" className="input-control" placeholder="Bogotá" />
              </div>
              <div className="input-group">
                <label>Código Postal</label>
                <input type="text" className="input-control" placeholder="110011" />
              </div>
            </div>
          </div>

          <div className="card bg-glass">
            <h3 className="mb-4">Método de Pago</h3>
            
            <div className="payment-options mb-4">
              <div 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={24} /> Tarjeta Crédito/Débito
              </div>
              <div 
                className={`payment-option ${paymentMethod === 'pse' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('pse')}
              >
                <Smartphone size={24} /> PSE
              </div>
              <div 
                className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <Banknote size={24} /> Efectivo (Efecty/Baloto)
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-form animate-fade-in">
                <div className="input-group">
                  <label>Número de Tarjeta</label>
                  <input type="text" className="input-control" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 mt-3">
                  <div className="input-group">
                    <label>Fecha de Expiración</label>
                    <input type="text" className="input-control" placeholder="MM/AA" />
                  </div>
                  <div className="input-group">
                    <label>CVC</label>
                    <input type="text" className="input-control" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'pse' && (
              <div className="pse-form animate-fade-in text-center p-4" style={{background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/PSE_logo.svg" alt="PSE" style={{height: '40px', marginBottom: '20px'}} />
                <p>Serás redirigido a la pasarela de pagos de PSE para completar tu compra de forma segura con tu banco.</p>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="cash-form animate-fade-in text-center p-4" style={{background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
                <div className="flex-center mb-3" style={{gap: '16px'}}>
                  <div style={{background: 'var(--primary)', color: 'var(--bg-dark)', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold'}}>Efecty</div>
                  <div style={{background: 'var(--warning)', color: 'var(--bg-dark)', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold'}}>Baloto</div>
                </div>
                <p>Al confirmar tu compra, generaremos un PIN de pago. Acércate a cualquier punto Efecty o Baloto con el PIN para pagar en efectivo.</p>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-summary card bg-glass">
          <div className="flex-center mb-4 text-center" style={{color: 'var(--success)', gap: '8px'}}>
            <ShieldCheck size={24} />
            <strong>Pago 100% Seguro</strong>
          </div>
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
            <span>Total a Pagar</span>
            <span className="text-gradient">${cartTotal.toLocaleString('es-CO')}</span>
          </div>
          <button className="btn btn-primary w-100 flex-center" onClick={handleConfirm} style={{justifyContent: 'center'}}>
            Confirmar y Pagar
          </button>
          <div className="text-center mt-3">
            <Link to="/cart" style={{fontSize: '0.9rem'}}>Volver al Carrito</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
