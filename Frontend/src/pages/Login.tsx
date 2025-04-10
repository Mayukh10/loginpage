import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const { login, isAuthenticated, error: authError } = useAuth();
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
      {/* Error notification at the top */}
      {(loginError || authError) && (
        <div className="error-notification">
          <div className="error-message-content">
            {loginError || authError}
          </div>
        </div>
      )}
      
      <LoginPage onLogin={handleLogin} />
    </div>
  );
};

export default Login; 