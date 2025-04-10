import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (uid: string, password: string) => {
    try {
      // Attempt to login using email as uid
      await login(uid, password);
      // If successful, the auth context will update and the useEffect will redirect
    } catch (error) {
      // The component-specific error handling
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Failed to login. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <LoginPage onLogin={handleLogin} />
      {/* Additional error display if needed beyond what's in the LoginPage component */}
      {loginError && !error && (
        <div className="global-error-message">
          {loginError}
        </div>
      )}
    </div>
  );
};

export default Login; 