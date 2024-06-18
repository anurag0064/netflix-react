
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUser(decodedToken);
    }
  }, []);

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    const decodedToken = jwtDecode(userToken);
    setUser(decodedToken);
  };

  return (
    <AuthContext.Provider value={{ token, user, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
