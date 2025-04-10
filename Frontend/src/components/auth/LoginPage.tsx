import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (uid: string, password: string) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ uid?: string; password?: string; form?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { uid?: string; password?: string } = {};
    
    // Validate UID
    if (!uid.trim()) {
      newErrors.uid = 'UID is required';
    } else if (uid.length < 3) {
      newErrors.uid = 'UID must be at least 3 characters';
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call the login API
      await onLogin(uid, password);
      // Success - will be handled by onLogin
    } catch (error) {
      // Handle API errors
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        // Extract error message
        const errorMessage = error.message;
        
        // Handle different error scenarios
        if (errorMessage.includes('credentials')) {
          setErrors({ form: 'Invalid credentials. Please check your UID and password.' });
        } else if (errorMessage.includes('network')) {
          setErrors({ form: 'Network error. Please check your connection and try again.' });
        } else {
          setErrors({ form: 'An unexpected error occurred. Please try again later.' });
        }
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again later.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <h1 className="login-title">Welcome back!</h1>
          
          {/* Form-level error message */}
          {errors.form && (
            <div className="error-message">{errors.form}</div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input 
                type="text" 
                value={uid} 
                onChange={(e) => setUid(e.target.value)} 
                placeholder="UID" 
                className={`login-input ${errors.uid ? 'input-error' : ''}`}
                disabled={isLoading}
              />
              {errors.uid && <div className="error-hint">⚠️ {errors.uid}</div>}
            </div>
            
            <div className="form-group">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                className={`login-input ${errors.password ? 'input-error' : ''}`}
                disabled={isLoading}
              />
              {errors.password && <div className="error-hint">⚠️ {errors.password}</div>}
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 