import { ActionNames } from '../actions/types';
import { AuthActions, AuthRootState } from './types';

const initialState: AuthRootState = {
  userId: '',
  token: '',
  error: '',
  loading: false,
  authRedirectPath: '/',
};
let errMessage: string;

const reducer = (state: AuthRootState = initialState, action: AuthActions): AuthRootState => {
  switch (action.type) {
    case ActionNames.AUTH_START:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionNames.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        error: '',
        userId: action.payload.userId,
      };
    case ActionNames.AUTH_FAIL:
      if (action.payload.errMessage === 'EMAIL_EXISTS') {
        errMessage = 'Email already exists';
      }
      if (action.payload.errMessage === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errMessage = 'Try again later, too many attempts';
      }
      return {
        ...state,
        error: errMessage ? errMessage : action.payload.errMessage,
        loading: false,
      };
    case ActionNames.LOGOUT:
      return {
        ...state,
        token: '',
        userId: '',
      };
    case ActionNames.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.payload.path,
      };
    default:
      return state;
  }
};

export default reducer;
