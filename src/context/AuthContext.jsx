import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { apiClient } from '../api/apiClient';
import { ErrorBoundary } from '../components/ErrorBoundary';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await apiClient.get('/auth/validate');
          setUser(response.data.user);
        } catch (err) {
          setError(err.message);
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token, setToken]);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await apiClient.post('/auth/login', credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await apiClient.post('/auth/register', userData);
      setToken(response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};