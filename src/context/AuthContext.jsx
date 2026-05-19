import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Credenciales válidas por rol
const CREDENTIALS = [
  {
    email: 'comprador@cargear.com',
    password: 'comprador123',
    role: 'buyer',
    name: 'Comprador Demo',
  },
  {
    email: 'taller@cargear.com',
    password: 'taller123',
    role: 'seller',
    name: 'Taller Autorizado',
  },
  {
    email: 'admin@cargear.com',
    password: 'admin123',
    role: 'admin',
    name: 'Administrador',
  },
];

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('guest');
  const [user, setUser] = useState(null);

  // Retorna true si las credenciales son válidas, false si no
  const login = (email, password) => {
    const found = CREDENTIALS.find(
      (c) => c.email === email.trim().toLowerCase() && c.password === password
    );
    if (found) {
      setRole(found.role);
      setUser({ name: found.name, email: found.email });
      return { success: true, role: found.role };
    }
    return { success: false };
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
