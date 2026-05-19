import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Package, Truck, CheckCircle, ChevronRight, Clock } from 'lucide-react';
import './OrdersHistory.css';

const OrdersHistory = () => {
  const { orders } = useOrders();

  return (
    <div className="orders-page container">
      <div className="page-header">
        <h1>MIS <span className="text-gradient">PEDIDOS</span></h1>
        <p>Historial de compras y seguimiento en tiempo real.</p>
      </div>

      <div className="grid grid-cols-1 mt-5" style={{gap: '24px'}}>
        {orders.length === 0 ? (
          <div className="text-center p-5 card bg-glass">
            <h3>No tienes pedidos recientes</h3>
            <p className="text-muted">Tus compras confirmadas aparecerán aquí.</p>
            <Link to="/catalog" className="btn btn-primary mt-3">Ir al Catálogo</Link>
          </div>
        ) : orders.map(order => (
          <div key={order.id} className="card bg-glass order-card">
            <div className="order-header flex-between" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px'}}>
              <div>
                <h3 style={{margin: 0}}>{order.id}</h3>
                <span className="text-muted" style={{fontSize: '0.9rem'}}>Realizado el {order.date}</span>
              </div>
              <div className="text-right">
                <h3 className="text-primary" style={{margin: 0}}>${order.total.toLocaleString('es-CO')}</h3>
                <div className={`order-status-badge ${order.status === 'Entregado' ? 'status-success' : 'status-pending'}`}>
                  {order.status === 'Entregado' ? <CheckCircle size={14}/> : <Truck size={14}/>} {order.status}
                </div>
              </div>
            </div>

            <div className="order-items mb-4">
              <h4 className="mb-3" style={{fontSize: '1rem', color: 'var(--text-muted)'}}>Artículos</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex-between mb-2" style={{background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px'}}>
                  <span>{item.quantity}x {item.name}</span>
                  <span style={{fontWeight: 'bold'}}>${(item.quantity * item.price).toLocaleString('es-CO')}</span>
                </div>
              ))}
            </div>

            <div className="order-tracking-preview" style={{background: 'var(--bg-dark)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
              <div className="flex-between mb-3">
                <span className="flex-center" style={{gap: '8px'}}>
                  <Truck size={18} color="var(--primary)"/>
                  <strong>Seguimiento: {order.tracking.provider}</strong>
                </span>
                <span className="text-muted" style={{fontSize: '0.9rem'}}>Guía: {order.tracking.trackingNumber}</span>
              </div>
              
              <div className="tracking-timeline-mini">
                {order.tracking.steps.map((step, idx) => (
                  <div key={idx} className={`timeline-step-mini ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                    <div className="step-icon">
                      {step.completed ? <CheckCircle size={12} /> : <Clock size={12} />}
                    </div>
                    <div className="step-label" style={{fontSize: '0.8rem'}}>{step.status}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link to={`/tracking/${order.id}`} className="btn btn-secondary w-100 flex-center" style={{justifyContent: 'center'}}>
                  Ver Detalles de Seguimiento <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersHistory;
