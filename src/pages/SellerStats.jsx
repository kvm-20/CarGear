import { products as initialProducts } from '../data/mockData';
import { AlertTriangle, TrendingUp, Package, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sem 1', ventas: 1200000 },
  { name: 'Sem 2', ventas: 950000 },
  { name: 'Sem 3', ventas: 1500000 },
  { name: 'Sem 4', ventas: 600000 },
];

const SellerStats = () => {
  const productsList = initialProducts;
  const lowStockCount = productsList.filter(p => p.inStock < 10).length;

  return (
    <div className="seller-dashboard">
      <h1 className="mb-4">Mi <span className="text-gradient">Rendimiento</span></h1>
      
      <div className="grid grid-cols-4 mb-5">
        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(0, 229, 255, 0.1)', padding: '12px', borderRadius: '8px'}}>
            <TrendingUp size={28} color="var(--primary)" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Ventas del Mes</p>
            <h2 className="text-gradient m-0">$4.250.000</h2>
          </div>
        </div>

        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '8px'}}>
            <Activity size={28} color="var(--text-main)" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Artículos Vendidos</p>
            <h2 className="m-0" style={{color: 'var(--primary)'}}>38</h2>
          </div>
        </div>

        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px', border: lowStockCount > 0 ? '1px solid var(--warning)' : ''}}>
          <div style={{background: 'rgba(255, 171, 0, 0.1)', padding: '12px', borderRadius: '8px'}}>
            <AlertTriangle size={28} color="var(--warning)" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Alertas Stock</p>
            <h2 className="m-0" style={{color: lowStockCount > 0 ? 'var(--warning)' : 'var(--success)'}}>
              {lowStockCount}
            </h2>
          </div>
        </div>

        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '8px'}}>
            <DollarSign size={28} color="#2563eb" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Valor Inventario</p>
            <h2 className="m-0 text-gradient">${productsList.reduce((acc, p) => acc + (p.price * p.inStock), 0).toLocaleString('es-CO')}</h2>
          </div>
        </div>
      </div>

      <div className="card bg-glass mb-4">
        <h3 className="mb-4">Tendencia de Ventas (Este Mes)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121212', borderColor: '#333' }}
                itemStyle={{ color: '#00e5ff' }}
                formatter={(value) => `$${value.toLocaleString('es-CO')}`}
              />
              <Line type="monotone" dataKey="ventas" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: '#ff6b00', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default SellerStats;
