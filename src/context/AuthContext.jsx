import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userWishlist, setUserWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on initial render
  useEffect(() => {
    const restoreSession = async () => {
      const storedUser = localStorage.getItem('shashi_current_user');
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setCurrentUser(userObj);
          setIsAuthenticated(true);
          
          // Fetch user's wishlist
          const list = await api.wishlist.get(userObj.id);
          setUserWishlist(list);
        } catch (e) {
          console.error('Failed to restore session', e);
          localStorage.removeItem('shashi_current_user');
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      const profile = await api.auth.login(email, password);
      setCurrentUser(profile);
      setIsAuthenticated(true);
      localStorage.setItem('shashi_current_user', JSON.stringify(profile));

      // Fetch user's wishlist
      const list = await api.wishlist.get(profile.id);
      setUserWishlist(list);
      return profile;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, phone, email, password) => {
    try {
      const profile = await api.auth.register(name, phone, email, password);
      setCurrentUser(profile);
      setIsAuthenticated(true);
      localStorage.setItem('shashi_current_user', JSON.stringify(profile));
      setUserWishlist([]);
      return profile;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserWishlist([]);
    localStorage.removeItem('shashi_current_user');
  };

  const toggleWishlistItem = async (productId) => {
    if (!currentUser) return;
    try {
      const updatedList = await api.wishlist.toggle(currentUser.id, productId);
      setUserWishlist(updatedList);
    } catch (error) {
      console.error('Failed to toggle wishlist item:', error);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    userWishlist,
    loading,
    login,
    register,
    logout,
    toggleWishlistItem
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
