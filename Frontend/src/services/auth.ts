import api from './api';

interface LoginResponse {
  status: string;
  token: string;
  data: {
    user: {
      id: number;
      email: string;
    }
  }
}

interface RegisterResponse {
  status: string;
  token: string;
  data: {
    user: {
      id: number;
      email: string;
      createdAt: string;
    }
  }
}

interface UserResponse {
  status: string;
  data: {
    user: {
      id: number;
      email: string;
    }
  }
}

// Implement local storage token management
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): any => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Auth service functions
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/api/users/login', { email, password });
    
    // Store token and user info
    const { token, data } = response.data;
    setToken(token);
    setUser(data.user);
    
    return response.data;
  } catch (error) {
    // Let the error propagate up to be handled by the component
    throw error;
  }
};

export const register = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/api/users/register', { email, password });
    
    // Store token and user info
    const { token, data } = response.data;
    setToken(token);
    setUser(data.user);
    
    return response.data;
  } catch (error) {
    // Let the error propagate up to be handled by the component
    throw error;
  }
};

export const logout = (): void => {
  removeToken();
  removeUser();
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>('/api/users/me');
    return response.data;
  } catch (error) {
    // If the request fails, clear token and user
    logout();
    throw error;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Auth state helper
export const checkAuthStatus = async (): Promise<boolean> => {
  if (!isAuthenticated()) {
    return false;
  }
  
  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    logout();
    return false;
  }
}; 