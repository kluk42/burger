import { ingredientsPrices } from '../reducers/burgerBuilder';
import {
  FetchOrdersFailPayload,
  FetchOrdersPayload,
  PayloadFetchingFailed,
  PayloadFetchIngredients,
  PayloadToHandleIngredients,
  PurchaseBurgerFailPayload,
  PurchaseBurgerSuccessPayload,
  ResetIngredientsPayload,
  AuthStartPayload,
  AuthSuccessPayload,
  AuthFailPayload,
  AuthLogoutPayload,
  AuthSetRedirectPathPayload,
} from '../reducers/types';

export enum ActionNames {
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
  SET_INGREDIENTS = 'SET_INGREDIENTS',
  FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED',
  PURCHASE_BURGER_SUCCESS = 'PURCHESE_BURGER_SUCCESS',
  PURCHASE_BURGER_FAIL = 'PURCHESE_BURGER_FAIL',
  PURCHASE_BURGER_START = 'PURCHESE_BURGER_START',
  RESET_INGREDIENTS = 'RESET_INGREDIENTS',
  START_ORDERING = 'START_ORDERING',
  FETCH_ORDERS_INIT = 'FETCH_ORDERS_INIT',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL',
  AUTH_START = 'AUTH_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAIL = 'AUTH_FAIL',
  LOGOUT = 'LOGOUT',
  SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH',
}

export enum LocalStorageKeys {
  Token = 'token',
  ExpirationDate = 'ExpirationDate',
  UserId = 'userId',
}

export type PurchasableIngredients = keyof typeof ingredientsPrices;

export type BurgerBuilderAction<T extends ActionNames> = {
  type: T;
  payload: T extends ActionNames.ADD_INGREDIENT
    ? PayloadToHandleIngredients
    : T extends ActionNames.REMOVE_INGREDIENT
    ? PayloadToHandleIngredients
    : T extends ActionNames.SET_INGREDIENTS
    ? PayloadFetchIngredients
    : T extends ActionNames.FETCH_INGREDIENTS_FAILED
    ? PayloadFetchingFailed
    : T extends ActionNames.RESET_INGREDIENTS
    ? ResetIngredientsPayload
    : null;
};

export type OrderAction<T extends ActionNames> = {
  type: T;
  payload: T extends ActionNames.PURCHASE_BURGER_SUCCESS
    ? PurchaseBurgerSuccessPayload
    : T extends ActionNames.PURCHASE_BURGER_FAIL
    ? PurchaseBurgerFailPayload
    : T extends ActionNames.PURCHASE_BURGER_START
    ? null
    : T extends ActionNames.PURCHASE_BURGER_SUCCESS
    ? PurchaseBurgerSuccessPayload
    : T extends ActionNames.RESET_INGREDIENTS
    ? ResetIngredientsPayload
    : T extends ActionNames.PURCHASE_BURGER_FAIL
    ? PurchaseBurgerFailPayload
    : T extends ActionNames.FETCH_ORDERS_INIT
    ? null
    : T extends ActionNames.FETCH_ORDERS_SUCCESS
    ? FetchOrdersPayload
    : T extends ActionNames.FETCH_ORDERS_FAIL
    ? FetchOrdersFailPayload
    : null;
};

export type AuthAction<T extends ActionNames> = {
  type: T;
  payload: T extends ActionNames.AUTH_START
    ? AuthStartPayload
    : T extends ActionNames.AUTH_SUCCESS
    ? AuthSuccessPayload
    : T extends ActionNames.AUTH_FAIL
    ? AuthFailPayload
    : T extends ActionNames.LOGOUT
    ? AuthLogoutPayload
    : T extends ActionNames.SET_AUTH_REDIRECT_PATH
    ? AuthSetRedirectPathPayload
    : null;
};

export type DispatchBurgerBuilderAction<T extends ActionNames> = (
  action: BurgerBuilderAction<T>
) => BurgerBuilderAction<T>;
export type DispatchOrderAction<T extends ActionNames> = (action: OrderAction<T>) => OrderAction<T>;
export type CreateSyncDispatch<T extends ActionNames> = (action: AuthAction<T>) => AuthAction<T>;
export type AuthDispatchType<T extends ActionNames> = (
  dispatch: (dispatch: CreateSyncDispatch<T>) => void
) => void;

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
