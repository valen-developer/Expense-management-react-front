export const asyncMap = async <T, U>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> => {
  const promises = array.map(callback);
  return await Promise.all(promises);
};
