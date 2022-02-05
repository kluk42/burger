import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import { ActionNames, PurchasableIngredients } from '../actions/types';
import { Order } from '../../components/ContactData/types';
import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import { OrderFromServer } from '../../components/Order/types';

export type BurgerBuilderInitialState = {
  ingredients: IngredientsToBuildOf;
  totalPrice: number;
  isFetching: boolean;
  error: boolean;
  building: boolean;
};

export type PayloadToHandleIngredients = {
  ingredientName: PurchasableIngredients;
};

export type PayloadFetchIngredients = {
  ingredients: IngredientsToBuildOf;
  fetching: boolean;
};

export type PayloadFetchingFailed = {
  error: true;
};

export type ResetIngredientsPayload = {
  ingredients: {
    [Ingredients.Bacon]: 0;
    [Ingredients.Cheese]: 0;
    [Ingredients.Meat]: 0;
    [Ingredients.Salad]: 0;
    [Ingredients.SeedsOne]: 1;
    [Ingredients.SeedsTwo]: 1;
  };
};

export type BurgerBuilderActions = {
  type: ActionNames;
  payload: PayloadToHandleIngredients &
    PayloadFetchIngredients &
    PayloadFetchingFailed &
    ResetIngredientsPayload;
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

export type OrderActions = {
  type: ActionNames;
  payload: PurchaseBurgerSuccessPayload &
    PurchaseBurgerFailPayload &
    FetchOrdersPayload &
    FetchOrdersFailPayload;
};

export type AuthStartPayload = {};

export type AuthSuccessPayload = {
  token: string;
  userId: string;
};

export type AuthFailPayload = {
  errMessage: string;
};

export type AuthLogoutPayload = {};

export type AuthSetRedirectPathPayload = {
  path: string;
};

export type AuthActions = {
  type: ActionNames;
  payload: AuthStartPayload &
    AuthSuccessPayload &
    AuthFailPayload &
    AuthLogoutPayload &
    AuthLogoutPayload &
    AuthSetRedirectPathPayload;
};

export type RootState = {
  burgerBuilder: BurgerBuilderInitialState;
  orders: OrdersInitialState;
  auth: AuthRootState;
};
