import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);


    useEffect(() => {
      const existingToken = localStorage.getItem('token');
      if(existingToken){
        setAccessToken(existingToken);
      }
    },[]);

    const saveToken = async (token) => {
        setAccessToken(token);
        localStorage.setItem('token',token);
        const res = await loginUser();
        console.log(res);
    };

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ accessToken, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
