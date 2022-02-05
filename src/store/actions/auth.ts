import axios, { AxiosResponse } from 'axios';
import { firebaseErrMessageHandler } from '../../helpers/FirebaseErrMessageHandler';
import { isFirebaseErrorData } from '../../TypeGuards/isFirebaseErrorData';
import {
  ActionNames,
  AuthAction,
  AuthDispatchType,
  AuthResponseData,
  CreateSyncDispatch,
  LocalStorageKeys,
} from './types';

export const authStart = (): AuthAction<ActionNames.AUTH_START> => {
  return {
    type: ActionNames.AUTH_START,
    payload: {
      started: true,
    },
  };
};

export const authSuccess = (
  token: string,
  userId: string
): AuthAction<ActionNames.AUTH_SUCCESS> => ({
  type: ActionNames.AUTH_SUCCESS,
  payload: {
    token,
    userId,
  },
});

export const authFail = (message: string): AuthAction<ActionNames.AUTH_FAIL> => ({
  type: ActionNames.AUTH_FAIL,
  payload: {
    errMessage: message,
  },
});

export const logOut = (): AuthAction<ActionNames.LOGOUT> => {
  localStorage.removeItem(LocalStorageKeys.Token);
  localStorage.removeItem(LocalStorageKeys.ExpirationDate);
  localStorage.removeItem(LocalStorageKeys.UserId);
  return {
    type: ActionNames.LOGOUT,
    payload: {},
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: CreateSyncDispatch<ActionNames.LOGOUT>) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};

export const auth = (email: string, password: string, isSignUp: boolean) => {
  return async (
    dispatch: CreateSyncDispatch<ActionNames.AUTH_SUCCESS | ActionNames.AUTH_FAIL> &
      AuthDispatchType<ActionNames.LOGOUT>
  ) => {
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
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(+response.data.expiresIn * 1000));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && isFirebaseErrorData(err.response.data)) {
        dispatch(authFail(firebaseErrMessageHandler(err.response.data.error.message)));
      } else {
        dispatch(authFail('Smth went wrong...'));
      }
    }
  };
};

export const setAuthRedirectPath = (
  path: string
): AuthAction<ActionNames.SET_AUTH_REDIRECT_PATH> => ({
  type: ActionNames.SET_AUTH_REDIRECT_PATH,
  payload: {
    path,
  },
});

export const authCheckState = () => {
  return (
    dispatch: CreateSyncDispatch<ActionNames.LOGOUT | ActionNames.AUTH_SUCCESS> &
      AuthDispatchType<ActionNames.LOGOUT>
  ) => {
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
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(new Date(+expirationTime).getTime() - new Date().getTime()));
        return;
      }
      dispatch(logOut());
      return;
    }
  };
};
