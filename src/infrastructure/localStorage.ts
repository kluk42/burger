export enum LocalStorageKeys {
  Token = 'token',
  RefreshToken = 'RefreshToken',
  ExpirationDate = 'ExpirationDate',
  UserId = 'userId',
}

export const saveAccessToken = (token: string) => {
  localStorage.setItem(LocalStorageKeys.Token, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(LocalStorageKeys.Token);
};

export const saveRefreshToken = (token: string) => {
  localStorage.setItem(LocalStorageKeys.RefreshToken, token);
};

export const getRefreshToken = () => {
  return localStorage.getItem(LocalStorageKeys.RefreshToken);
};

export const saveUserId = (userId: string) => {
  localStorage.setItem(LocalStorageKeys.UserId, userId);
};

export const getUserId = () => {
  return localStorage.getItem(LocalStorageKeys.UserId);
};
