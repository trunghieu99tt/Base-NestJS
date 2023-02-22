export const formatCurrency = (value: any): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseJson = (data: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing json', error);
  }
  return null;
};

export const getType = (value: unknown) => {
  const returnValue = Object.prototype.toString.call(value);
  const typeString = returnValue.substring(
    returnValue.indexOf(' ') + 1,
    returnValue.indexOf(']'),
  );
  return typeString.toLowerCase();
};

export const isExistingObject = (u: unknown) => getType(u) === 'object';
