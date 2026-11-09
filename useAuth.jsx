import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agri_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default active farmer demo user
    return {
      id: 'user_demo_001',
      full_name: 'Kavitha Raman',
      email: 'farmer@agriai.com',
      farm_name: 'GreenFields Organic Farm',
      farm_location: 'Coimbatore, Tamil Nadu',
      farm_size_acres: 8.5,
      preferred_language: 'en'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('agri_token') || 'token_user_demo_001');

  useEffect(() => {
    if (user) {
      localStorage.setItem('agri_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agri_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('agri_token', token);
    } else {
      localStorage.removeItem('agri_token');
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (data) => {
    const res = await api.register(data);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agri_user');
    localStorage.removeItem('agri_token');
  };

  const updateUserData = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, register, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
