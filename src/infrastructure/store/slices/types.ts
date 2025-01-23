import { Order } from '../../../components/ContactData/types';
import { OrderFromServer } from '../../../components/Order/types';
import { IngredientsToBuildOf } from '../../../hooks/useIngredients/types';

export type BurgerBuilderInitialState = {
  ingredients: IngredientsToBuildOf;
  building: boolean;
};

export type SetIngredients = {
  ingredients: IngredientsToBuildOf;
};

export type OrdersInitialState = {
  orders: OrderFromServer[];
  purchasing: boolean;
  purchased: boolean;
  error: boolean;
  ordersFetching: boolean;
};

export type AuthRootState = {
  userId: string;
  token: string;
  error: string;
  loading: boolean;
  authRedirectPath: string;
  refreshToken: string;
};

export type PurchaseBurgerSuccessPayload = {
  id: string;
  order: Order;
};

export type PurchaseBurgerFailPayload = {
  error: true;
};

export type FetchOrdersPayload = {
  orders: OrderFromServer[];
};

export type FetchOrdersFailPayload = {
  error: boolean;
};

export type AuthSuccessPayload = {
  token: string;
  userId: string;
  refreshToken: string;
};

export type AuthFailPayload = {
  errMessage: string;
};

export type AuthSetRedirectPathPayload = {
  path: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
  accessToken: string;
};

export type RootState = {
  burgerBuilder: BurgerBuilderInitialState;
  orders: OrdersInitialState;
  auth: AuthRootState;
};
