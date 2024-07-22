// client/src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          aria-label="Enter your email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          aria-label="Enter your password"
        />
        <button type="submit" aria-label="Login to your account">Login</button>
      </form>
      <Link to="/forgot-password" aria-label="Go to forgot password page">Forgot Password?</Link>
      <div className="oauth-options">
        <button 
          onClick={() => window.location.href = '/auth/google'} 
          aria-label="Login with Google"
        >
          Login with Google
        </button>
        <button 
          onClick={() => window.location.href = '/auth/github'} 
          aria-label="Login with GitHub"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;