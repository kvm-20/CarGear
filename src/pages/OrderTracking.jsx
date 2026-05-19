import { useParams, Link, Navigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { MapPin, Truck, CheckCircle, Clock, ArrowLeft, Package, Phone } from 'lucide-react';
import './OrderTracking.css';

const OrderTracking = () => {
  const { id } = useParams();
  const { orders } = useOrders();
  const order = orders.find(o => o.id === id);

  if (!order) return <Navigate to="/orders" />;

  return (
    <div className="tracking-page container">
      <Link to="/orders" className="btn btn-secondary mb-4 flex-center" style={{display: 'inline-flex', width: 'auto'}}>
        <ArrowLeft size={16} style={{marginRight: '8px'}} /> Volver a mis pedidos
      </Link>

      <div className="grid grid-cols-3" style={{gap: '24px'}}>
        <div className="col-span-2">
          <div className="card bg-glass mb-4">
            <div className="flex-between mb-4 pb-4" style={{borderBottom: '1px solid var(--border-color)'}}>
              <div>
                <h2>Seguimiento de <span className="text-gradient">Pedido</span></h2>
                <p className="text-muted mb-0">Orden {order.id}</p>
              </div>
              <div className="text-right">
                <p className="mb-1"><strong>Guía:</strong> <span className="text-primary">{order.tracking.trackingNumber}</span></p>
                <p className="text-muted mb-0">Transportadora: {order.tracking.provider}</p>
              </div>
            </div>

            <div className="tracking-timeline-vertical mt-5">
              {order.tracking.steps.map((step, idx) => (
                <div key={idx} className={`timeline-item ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                  <div className="timeline-marker">
                    {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div className="timeline-content">
                    <h4>{step.status}</h4>
                    <p className="text-muted">{step.date}</p>
                    {step.current && step.status === 'En Camino' && (
                      <div className="current-location mt-2 p-3 flex-center" style={{background: 'rgba(0, 229, 255, 0.05)', borderLeft: '3px solid var(--primary)', gap: '12px'}}>
                        <MapPin size={20} color="var(--primary)" />
                        <div>
                          <strong>Ubicación Actual</strong>
                          <p style={{margin: 0, fontSize: '0.85rem'}}>Centro de Distribución Principal, Bogotá D.C.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="card bg-glass mb-4">
            <h3 className="mb-4">Resumen de Entrega</h3>
            <div className="mb-4 flex-center" style={{justifyContent: 'flex-start', gap: '12px'}}>
              <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '50%'}}>
                <Package size={24} color="var(--primary)" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{fontSize: '0.85rem'}}>Estado Actual</p>
                <strong className="text-gradient" style={{fontSize: '1.2rem'}}>{order.status}</strong>
              </div>
            </div>

            <hr style={{borderColor: 'var(--border-color)', margin: '20px 0'}} />

            <h4 className="mb-3">Dirección de Entrega</h4>
            <div className="flex-center" style={{justifyContent: 'flex-start', gap: '8px', alignItems: 'flex-start', marginBottom: '8px'}}>
              <MapPin size={16} color="var(--text-muted)" style={{marginTop: '4px'}} />
              <p className="mb-0 text-muted">Calle 100 # 15-20<br />Edificio Centro, Apto 402<br />Bogotá D.C., Colombia</p>
            </div>

            <hr style={{borderColor: 'var(--border-color)', margin: '20px 0'}} />

            <h4 className="mb-3">Contacto Transportadora</h4>
            <div className="flex-center" style={{justifyContent: 'flex-start', gap: '8px'}}>
              <Phone size={16} color="var(--text-muted)" />
              <p className="mb-0 text-muted">01 8000 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
