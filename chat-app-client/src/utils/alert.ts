// utils.ts

export const generateSuccessAlert = (message: string): string => {
  return `Success: ${message}`;
};

export const generateErrorAlert = (error: string): string => {
  return `Error: ${error}`;
};

export const generateInfoAlert = (info: string): string => {
  return `Info: ${info}`;
};
