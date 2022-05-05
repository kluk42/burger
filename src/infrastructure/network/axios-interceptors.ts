import { AxiosError, AxiosResponse } from 'axios';
import { refreshTokens } from '../store/slices/auth';
import { BAppDispatch, BAppStore } from '../store/store';
import ordersService from './axios-orders';
import refreshTokenService, { RefreshTokenResponse } from './refreshToken-axios';

export const refreshTokenFunc = async (refreshToken: string, dispatch: BAppDispatch) => {
  try {
    const refreshResponse = await refreshTokenService.post<
      any,
      AxiosResponse<RefreshTokenResponse>
    >('', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    const { id_token, refresh_token, user_id } = refreshResponse.data;

    dispatch(refreshTokens({ refreshToken: refresh_token, accessToken: id_token }));
  } catch (error) {
    return Promise.reject(error);
  }
};

let isRetry = false;

const setupInterceptors = (store: BAppStore) => {
  ordersService.interceptors.response.use(
    res => {
      isRetry = false;
      return res;
    },
    async (err: AxiosError) => {
      console.log('right interceptor!!!!');
      const refreshToken = store.getState().auth.refreshToken;

      if (err.response?.status === 401 && refreshToken && !isRetry) {
        try {
          await refreshTokenFunc(refreshToken, store.dispatch);
        } catch (error) {
          isRetry = true;
          return Promise.reject(error);
        }
      }
      return Promise.reject(err);
    }
  );
  console.log(ordersService.interceptors);
};

export default setupInterceptors;
