export const getStringToObject = (data: string) => {
  return data ? JSON.parse(data) : undefined;
};