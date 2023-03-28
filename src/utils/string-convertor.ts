export const stringToBase64 = (data: string) => {
  const base64encoded = Buffer.from(data).toString('base64');
  return base64encoded;
};

export const base64ToString = (data: string) => {
  const base64decoded = Buffer.from(data, 'base64').toString('ascii');
  return base64decoded;
};
