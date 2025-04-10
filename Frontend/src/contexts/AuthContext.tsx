import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as authService from '../services/auth';
import { ApiError, NetworkError, AuthenticationError } from '../services/api';

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const isAuthenticated = await authService.checkAuthStatus();
        if (isAuthenticated) {
          setUser(authService.getUser());
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuthError = (error: unknown) => {
    console.error('Authentication error:', error);
    
    if (error instanceof AuthenticationError) {
      setError(`Authentication failed: ${error.message}`);
    } else if (error instanceof NetworkError) {
      setError('Network error. Please check your connection and try again.');
    } else if (error instanceof ApiError) {
      setError(`Error: ${error.message}`);
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred');
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      setUser(response.data.user);
    } catch (error) {
      handleAuthError(error);
      throw error; // Re-throw for component-level handling
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(email, password);
      setUser(response.data.user);
    } catch (error) {
      handleAuthError(error);
      throw error; // Re-throw for component-level handling
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 