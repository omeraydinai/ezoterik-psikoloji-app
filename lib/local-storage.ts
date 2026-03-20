import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  profile: 'ezoterik-psikoloji/profile',
  journal: 'ezoterik-psikoloji/journal',
} as const;

export async function saveStoredValue<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadStoredValue<T>(key: string): Promise<T | null> {
  const storedValue = await AsyncStorage.getItem(key);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue) as T;
}
