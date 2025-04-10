import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (uid: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(uid, password);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <h1 className="login-title">Welcome back!</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            <input 
              type="text" 
              value={uid} 
              onChange={(e) => setUid(e.target.value)} 
              placeholder="UID" 
              className="login-input"
            />
            
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              className="login-input"
            />
            
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 