import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Roles: 'guest', 'buyer', 'seller', 'admin'
  const [role, setRole] = useState('guest'); 
  const [user, setUser] = useState(null);

  const login = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'buyer') setUser({ name: 'Comprador Demo', email: 'comprador@cargear.com' });
    if (selectedRole === 'seller') setUser({ name: 'Taller Autorizado', email: 'taller@cargear.com' });
    if (selectedRole === 'admin') setUser({ name: 'Administrador', email: 'admin@cargear.com' });
  };

  const logout = () => {
    setRole('guest');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
