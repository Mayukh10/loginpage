import { useState } from 'react'
import './App.css'
import LoginPage from './components/auth/LoginPage'

function App() {
  const handleLogin = (uid: string, password: string) => {
    console.log('Login attempted with:', { uid, password });
    // Here you would typically make an API call to authenticate the user
    alert(`Login attempted with UID: ${uid}`);
  };

  return (
    <div className="app">
      <LoginPage onLogin={handleLogin} />
    </div>
  )
}

export default App
