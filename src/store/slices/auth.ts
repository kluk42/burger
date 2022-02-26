import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { firebaseErrMessageHandler } from '../../helpers/FirebaseErrMessageHandler';
import { isFirebaseErrorData } from '../../TypeGuards/isFirebaseErrorData';
import { BAppDispatch, BAppThunk } from '../store';
import {
  AuthFailPayload,
  AuthRootState,
  AuthSetRedirectPathPayload,
  AuthSuccessPayload,
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

enum LocalStorageKeys {
  Token = 'token',
  ExpirationDate = 'ExpirationDate',
  UserId = 'userId',
}

const initialState: AuthRootState = {
  userId: '',
  token: '',
  error: '',
  loading: false,
  authRedirectPath: '/',
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
    },
    setAuthRedirectPath: (state, action: PayloadAction<AuthSetRedirectPathPayload>) => {
      state.authRedirectPath = action.payload.path;
    },
  },
});

export default slice.reducer;

export const { startAuth, success, fail, logOut, setAuthRedirectPath } = slice.actions;

export const checkAuthTimeout = (expirationTime: number): BAppThunk => {
  return (dispatch: BAppDispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};

export const auth = (email: string, password: string, isSignUp: boolean): BAppThunk => {
  return async (dispatch: BAppDispatch) => {
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBasCUXhdhZTn4zf9rVSs0bHbmiCeskHw';
      if (!isSignUp) {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBasCUXhdhZTn4zf9rVSs0bHbmiCeskHw';
      }
      const response = await axios.post<any, AxiosResponse<AuthResponseData>>(url, authData);
      localStorage.setItem(LocalStorageKeys.Token, response.data.idToken);
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getTime() + parseInt(response.data.expiresIn) * 1000
      ).getTime();
      localStorage.setItem(LocalStorageKeys.ExpirationDate, JSON.stringify(expirationDate));
      localStorage.setItem(LocalStorageKeys.UserId, response.data.localId);
      dispatch(success({ token: response.data.idToken, userId: response.data.localId }));
      dispatch(checkAuthTimeout(+response.data.expiresIn * 1000));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && isFirebaseErrorData(err.response.data)) {
        dispatch(fail({ errMessage: firebaseErrMessageHandler(err.response.data.error.message) }));
      } else {
        dispatch(fail({ errMessage: 'Smth went wrong...' }));
      }
    }
  };
};

export const authCheckState = () => {
  return (dispatch: BAppDispatch) => {
    const token = localStorage.getItem(LocalStorageKeys.Token);
    const expirationTime = localStorage.getItem(LocalStorageKeys.ExpirationDate);
    const userId = localStorage.getItem(LocalStorageKeys.UserId);
    if (!token) {
      dispatch(logOut());
      return;
    }
    if (expirationTime && userId) {
      const isExpired = new Date(+expirationTime).getTime() < new Date().getTime();
      if (!isExpired) {
        dispatch(success({ token, userId }));
        dispatch(checkAuthTimeout(new Date(+expirationTime).getTime() - new Date().getTime()));
        return;
      }
      dispatch(logOut());
      return;
    }
  };
};
