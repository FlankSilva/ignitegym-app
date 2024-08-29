import { create } from 'zustand';

import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/service/api';

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from '@/storage/storageUser';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken';

type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUserStorageData: () => Promise<void>;
  updateUserProfile: (user: UserDTO) => Promise<void>;
};

export const useAuth = create<AuthContextDataProps>((set) => ({
  user: {} as UserDTO,
  isLoadingUserStorageData: true,
  signIn: async (email, password) => {
    try {
      set({ isLoadingUserStorageData: true });

      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      if (data.user && data.token && data.refresh_token) {
        set({ user: data.user });

        storageUserSave(data.user);
        storageAuthTokenSave({
          token: data.token,
          refresh_token: data.refresh_token,
        });

        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingUserStorageData: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoadingUserStorageData: true });
      set({ user: {} as UserDTO });

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingUserStorageData: false });
    }
  },

  loadUserStorageData: async () => {
    try {
      set({ isLoadingUserStorageData: true });

      const userStorage = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userStorage) {
        set({ user: userStorage });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingUserStorageData: false });
    }
  },

  updateUserProfile: async (userUpdate: UserDTO) => {
    try {
      set({ user: userUpdate });

      await storageUserSave(userUpdate);
    } catch (error) {
      throw error;
    }
  },
}));
