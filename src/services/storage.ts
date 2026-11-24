import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async <TData>(
  key: string,
  fallback: TData,
): Promise<TData> => {
  const data = await AsyncStorage.getItem(key);
  return data ? (JSON.parse(data) as TData) : fallback;
};

export const saveData = async <TData>(
  key: string,
  data: TData,
): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};