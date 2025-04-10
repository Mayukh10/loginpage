import axios, { AxiosError, AxiosInstance } from 'axios';

// Error types for better error handling
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error occurred. Please check your connection.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication failed', status: number = 401, data: any = {}) {
    super(message, status, data);
    this.name = 'AuthenticationError';
  }
}

// API client setup
export const createApiClient = (baseURL: string = ''): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
  });

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      // Get token from localStorage if it exists
      const token = localStorage.getItem('token');
      
      // If token exists, add it to the headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle network errors
      if (!error.response) {
        return Promise.reject(new NetworkError());
      }

      const { response } = error;
      const status = response.status;
      const data = response.data as Record<string, any> || {};
      
      let errorMessage = "An unexpected error occurred";
      
      // Try to extract specific error message from the API response
      if (data && typeof data === 'object') {
        if ('message' in data && typeof data.message === 'string') {
          errorMessage = data.message;
        } else if ('error' in data && typeof data.error === 'string') {
          errorMessage = data.error;
        }
      }
      
      // Create appropriate error based on status code
      switch (status) {
        case 401:
          return Promise.reject(
            new AuthenticationError(
              errorMessage || 'Your session has expired. Please log in again.',
              status,
              data
            )
          );
        case 403:
          return Promise.reject(
            new ApiError('You do not have permission to access this resource', status, data)
          );
        case 404:
          return Promise.reject(
            new ApiError('The requested resource was not found', status, data)
          );
        case 422:
          return Promise.reject(
            new ApiError('Validation failed. Please check your input.', status, data)
          );
        case 500:
        case 502:
        case 503:
        case 504:
          return Promise.reject(
            new ApiError('Server error occurred. Please try again later.', status, data)
          );
        default:
          return Promise.reject(
            new ApiError(errorMessage, status, data)
          );
      }
    }
  );

  return api;
};

// Create default API client
const api = createApiClient();

export default api; 