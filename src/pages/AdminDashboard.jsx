import { adminStats } from '../data/mockData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Package, AlertTriangle } from 'lucide-react';

const salesData = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 4500 },
  { name: 'May', ventas: 6000 },
  { name: 'Jun', ventas: 8000 },
];

const inventoryData = [
  { name: 'Iluminación', stock: 120 },
  { name: 'Frenos', stock: 85 },
  { name: 'Interior', stock: 45 },
  { name: 'Motor', stock: 30 },
];

const userBehaviorData = [
  { name: 'Compradores (B2C)', value: 400 },
  { name: 'Talleres (B2B)', value: 150 },
  { name: 'Distribuidores', value: 50 },
];

const COLORS = ['#00e5ff', '#ff6b00', '#2563eb', '#10b981'];

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="mb-4">Dashboard <span className="text-gradient">Administrativo</span></h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-4 mb-5">
        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(0, 229, 255, 0.1)', padding: '12px', borderRadius: '8px'}}>
            <TrendingUp size={28} color="var(--primary)" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Ventas Totales</p>
            <h2 className="text-gradient m-0">${adminStats.totalSales.toLocaleString('es-CO')}</h2>
          </div>
        </div>
        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '8px'}}>
            <Package size={28} color="var(--text-main)" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Pedidos Activos</p>
            <h2 className="m-0" style={{color: 'var(--primary)'}}>{adminStats.activeOrders}</h2>
          </div>
        </div>
        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '8px'}}>
            <Users size={28} color="#2563eb" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Nuevos Usuarios</p>
            <h2 className="m-0">{adminStats.newUsers}</h2>
          </div>
        </div>
        <div className="card bg-glass flex-center" style={{justifyContent: 'flex-start', gap: '16px'}}>
          <div style={{background: 'rgba(255, 51, 102, 0.1)', padding: '12px', borderRadius: '8px'}}>
            <AlertTriangle size={28} color="var(--danger)" />
          </div>
          <div>
            <p className="text-muted text-uppercase mb-0" style={{fontSize: '0.8rem'}}>Alertas Stock</p>
            <h2 className="m-0" style={{color: 'var(--danger)'}}>{adminStats.lowStockItems}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mb-4" style={{gap: '24px'}}>
        {/* Sales Chart */}
        <div className="card bg-glass" style={{gridColumn: 'span 2'}}>
          <h3 className="mb-4">Rendimiento de Ventas (2026)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333' }} itemStyle={{ color: '#00e5ff' }} />
                <Line type="monotone" dataKey="ventas" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: '#ff6b00', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Chart */}
        <div className="card bg-glass">
          <h3 className="mb-4">Estado de Inventario por Categoría</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="stock" fill="#00e5ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Chart */}
        <div className="card bg-glass">
          <h3 className="mb-4">Comportamiento de Usuarios</h3>
          <div style={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={userBehaviorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {userBehaviorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
