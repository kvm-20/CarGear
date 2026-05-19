import { useState } from 'react';
import { products as initialProducts } from '../data/mockData';
import { Plus, Edit2, Trash2, AlertTriangle, Save, X, Search } from 'lucide-react';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [productsList, setProductsList] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Iluminación', price: '', inStock: '', image: '/img/carro.jpg'
  });

  const lowStockCount = productsList.filter(p => p.inStock < 10).length;

  const filteredProducts = productsList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        inStock: product.inStock,
        image: product.image
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', category: 'Iluminación', price: '', inStock: '', image: '/img/carro.jpg'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setProductsList(productsList.map(p => p.id === editingId ? { ...p, ...formData, price: Number(formData.price), inStock: Number(formData.inStock) } : p));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price),
        inStock: Number(formData.inStock),
        brand: 'Genérico',
        rating: 0,
        compatibility: ['Universal'],
        aiRecommended: false
      };
      setProductsList([...productsList, newProduct]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="seller-dashboard">
      <div className="flex-between mb-4">
        <h2>Gestión de <span className="text-gradient">Inventario</span></h2>
        
        <div className="flex-center" style={{gap: '16px'}}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="input-control" 
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{paddingRight: '35px'}}
            />
            <Search size={18} style={{ position: 'absolute', right: 10, top: 12, color: 'var(--text-muted)' }} />
          </div>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={20} /> Nuevo Producto
          </button>
        </div>
      </div>

      <div className="card bg-glass" style={{overflowX: 'auto'}}>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio (COP)</th>
              <th>Stock Disp.</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="flex-center" style={{ gap: '12px', justifyContent: 'flex-start' }}>
                    <img src={product.image} alt={product.name} className="table-img" />
                    <span style={{fontWeight: 600}}>{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td style={{fontFamily: 'var(--font-heading)', fontSize:'1.1rem'}}>${product.price.toLocaleString('es-CO')}</td>
                <td>
                  <span className={`stock-badge ${product.inStock < 10 ? 'stock-warning' : 'stock-success'} ${product.inStock === 0 ? 'stock-danger' : ''}`}>
                    {product.inStock} uds
                  </span>
                </td>
                <td>
                  {product.inStock === 0 ? (
                    <span style={{color: 'var(--danger)', fontSize: '0.85rem'}}>Agotado</span>
                  ) : product.inStock < 10 ? (
                    <span style={{color: 'var(--warning)', fontSize: '0.85rem', display:'flex', gap:'4px', alignItems:'center'}}>
                      <AlertTriangle size={14}/> Reabastecer
                    </span>
                  ) : (
                    <span style={{color: 'var(--success)', fontSize: '0.85rem'}}>Óptimo</span>
                  )}
                </td>
                <td>
                  <div className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                    <button className="action-btn-small edit-btn" onClick={() => handleOpenModal(product)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn-small delete-btn" onClick={() => handleDelete(product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '32px', color: 'var(--text-muted)'}}>
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Crear/Editar */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content card bg-glass">
            <div className="flex-between mb-4">
              <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="input-group">
                <label>Nombre del Producto</label>
                <input required type="text" className="input-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2">
                <div className="input-group">
                  <label>Categoría</label>
                  <select className="input-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Iluminación">Iluminación</option>
                    <option value="Multimedia">Multimedia</option>
                    <option value="Frenos">Frenos</option>
                    <option value="Suspensión">Suspensión</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Precio (COP)</label>
                  <input required type="number" min="0" className="input-control" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div className="input-group">
                <label>Cantidad en Stock</label>
                <input required type="number" min="0" className="input-control" value={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.value})} />
              </div>

              <div className="flex-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary"><Save size={20} style={{marginRight: '8px'}} /> Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
