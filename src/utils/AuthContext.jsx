import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, getUserLogged } from './api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const user = await getUserLogged();
          setAuthUser(user);
        } catch (error) {
          localStorage.removeItem('accessToken');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{
      authUser,
      setAuthUser,
      isLoading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};