// utils/cookies.ts

import Cookies from 'js-cookie';

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('access_token', accessToken, { expires: 7 }); // expires in 7 days
  Cookies.set('refresh_token', refreshToken, { expires: 7 });
};

export const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};
