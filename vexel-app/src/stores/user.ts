import { defineStore } from 'pinia';
import apiClient from '../services/api';
import type { User } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await apiClient.get('/api/auth/me');
        this.user = response.data;
      } catch (error) {
        this.user = null;
      }
    },
    async logout() {
      try {
        await apiClient.get('/api/auth/logout');
        this.user = null;
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
});