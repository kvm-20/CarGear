import { createContext, useState, useEffect, useContext } from 'react';
import { mockOrders as initialOrders } from '../data/mockData';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cargear_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('cargear_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (cartItems, total) => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 900000) + 100000}C`,
      date: new Date().toISOString().split('T')[0],
      total: total,
      status: "Confirmado",
      items: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      tracking: {
        provider: "Pendiente de asignación",
        trackingNumber: "N/A",
        steps: [
          { status: "Pedido Confirmado", date: new Date().toLocaleString(), completed: true, current: true },
          { status: "Empacado", date: "Pendiente", completed: false },
          { status: "En Camino", date: "Pendiente", completed: false },
          { status: "Entregado", date: "Pendiente", completed: false }
        ]
      }
    };
    
    // Add to top of the list
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id; // Retorna el ID por si necesitamos redirigir
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
