import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, isAuthenticated, error: authError, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Debug helper
  const logDebugInfo = (message: string) => {
    console.log('[DEBUG]', message);
    setDebug(prev => `${prev ? prev + '\n' : ''}${message}`);
  };

  const handleLogin = async (uid: string, password: string) => {
    try {
      logDebugInfo(`Attempting login with UID: ${uid}`);
      
      // Attempt to login using email as uid
      await login(uid, password);
      
      logDebugInfo('Login API call completed');
      
      // If successful, the auth context will update and the useEffect will redirect
    } catch (error) {
      // The component-specific error handling
      logDebugInfo(`Login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
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
      
      {/* Error display */}
      {(loginError || authError) && (
        <div className="global-error-message" style={{ 
          color: 'red', 
          margin: '20px', 
          padding: '10px', 
          border: '1px solid red', 
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 0, 0, 0.05)'
        }}>
          {loginError || authError}
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div style={{ margin: '20px', textAlign: 'center' }}>
          Loading...
        </div>
      )}
      
      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && debug && (
        <div style={{ 
          margin: '20px', 
          padding: '10px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-line'
        }}>
          <h4>Debug Info:</h4>
          {debug}
        </div>
      )}
    </div>
  );
};

export default Login; 