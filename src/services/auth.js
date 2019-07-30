export const TOKEN_KEY = '@airbnb-Token';
export const USER_ID = '@airbnb-ID';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getId = () => localStorage.getItem(USER_ID);
export const isMyId = (id) => {
  const myId = getId();
  const userId = String(id);
  return myId === userId;
};
export const login = (token, id) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID, id);
};
export const logout = () => localStorage.removeItem(TOKEN_KEY);
