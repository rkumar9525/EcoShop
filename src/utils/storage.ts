import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
} as const;

const storageInstance = createAsyncStorage('ecoshop');

export const storage = {
  async save(key: string, value: unknown): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await storageInstance.setItem(key, jsonValue);
    } catch (error) {
      console.error(`[Storage] Error saving ${key}:`, error);
      throw error;
    }
  },

  async load<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await storageInstance.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`[Storage] Error loading ${key}:`, error);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await storageInstance.removeItem(key);
    } catch (error) {
      console.error(`[Storage] Error removing ${key}:`, error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await storageInstance.clear();
    } catch (error) {
      console.error('[Storage] Error clearing storage:', error);
      throw error;
    }
  },
};

export { STORAGE_KEYS };