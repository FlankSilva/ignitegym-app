import { create } from 'zustand';

import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/service/api';

type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
};

export const useAuth = create<AuthContextDataProps>((set) => ({
  user: {} as UserDTO,
  signIn: async (email, password) => {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      set({ user: data.user });
    } catch (error) {
      throw error;
    }
  },
}));
