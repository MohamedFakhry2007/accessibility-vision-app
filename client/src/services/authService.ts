// client/src/services/authService.ts
import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
  return response.data;
};
