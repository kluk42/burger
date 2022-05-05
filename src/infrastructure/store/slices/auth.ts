import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { firebaseErrMessageHandler } from '../../../helpers/FirebaseErrMessageHandler';
import { isFirebaseErrorData } from '../../../TypeGuards/isFirebaseErrorData';
import {
  getAccessToken,
  getRefreshToken,
  getUserId,
  LocalStorageKeys,
  saveAccessToken,
  saveRefreshToken,
  saveUserId,
} from '../../localStorage';
import authService from '../../network/axios-auth';
import { BAppDispatch, BAppThunk } from '../store';
import {
  AuthFailPayload,
  AuthRootState,
  AuthSetRedirectPathPayload,
  AuthSuccessPayload,
  RefreshTokenPayload,
} from './types';

export type AuthResponseData = {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
};

export type AuthResponse = {
  data: AuthResponseData;
  status: number;
  statusText: string;
};

const initialState: AuthRootState = {
  userId: '',
  token: '',
  error: '',
  loading: false,
  authRedirectPath: '/',
  refreshToken: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth: state => {
      state.loading = true;
      state.error = '';
    },
    success: (state, action: PayloadAction<AuthSuccessPayload>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
    },
    fail: (state, action: PayloadAction<AuthFailPayload>) => {
      let errMessage: string | null = null;
      if (action.payload.errMessage === 'EMAIL_EXISTS') {
        errMessage = 'Email already exists';
      }
      if (action.payload.errMessage === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errMessage = 'Try again later, too many attempts';
      }
      state.error = errMessage !== null ? errMessage : action.payload.errMessage;
      state.loading = false;
    },
    logOut: state => {
      state.token = '';
      state.userId = '';
      localStorage.removeItem(LocalStorageKeys.Token);
      localStorage.removeItem(LocalStorageKeys.UserId);
    },
    setAuthRedirectPath: (state, action: PayloadAction<AuthSetRedirectPathPayload>) => {
      state.authRedirectPath = action.payload.path;
    },
    refreshTokens: (state, action: PayloadAction<RefreshTokenPayload>) => {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.accessToken;
    },
  },
});

export default slice.reducer;

export const { startAuth, success, fail, logOut, setAuthRedirectPath, refreshTokens } =
  slice.actions;

export const auth = (email: string, password: string, isSignUp: boolean): BAppThunk => {
  return async dispatch => {
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      let url = 'signUp?key=AIzaSyDBasCUXhdhZTn4zf9rVSs0bHbmiCeskHw';
      if (!isSignUp) {
        url = 'signInWithPassword?key=AIzaSyDBasCUXhdhZTn4zf9rVSs0bHbmiCeskHw';
      }
      const response = await authService.post<any, AxiosResponse<AuthResponseData>>(url, authData);

      saveAccessToken(response.data.idToken);
      saveUserId(response.data.localId);
      saveRefreshToken(response.data.refreshToken);

      dispatch(
        success({
          token: response.data.idToken,
          userId: response.data.localId,
          refreshToken: response.data.refreshToken,
        })
      );
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && isFirebaseErrorData(err.response.data)) {
        dispatch(fail({ errMessage: firebaseErrMessageHandler(err.response.data.error.message) }));
      } else {
        dispatch(fail({ errMessage: 'Smth went wrong...' }));
      }
    }
  };
};

export const authCheckState = (dispatch: BAppDispatch) => {
  const token = getAccessToken();
  const userId = getUserId();
  const refreshToken = getRefreshToken();
  if (!token || !userId || !refreshToken) {
    dispatch(logOut());
    return;
  }

  dispatch(success({ token, userId, refreshToken }));
};
