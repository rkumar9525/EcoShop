import client from './client';
import { User } from '../types';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response: LoginResponse = await client.post(
      '/auth/login',
      credentials,
    );
    return response;
  },

  async register(userData: RegisterData): Promise<User> {
    const response: User = await client.post('/users', userData);
    return response;
  },

  async getUserProfile(userId: number): Promise<User> {
    const response: User = await client.get(`/users/${userId}`);
    return response;
  },
};