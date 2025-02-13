import { IngredientsToBuildOf } from '../../../hooks/useIngredients/types';

export type BurgerBuilderInitialState = {
  ingredients: IngredientsToBuildOf;
  building: boolean;
};

export type SetIngredients = {
  ingredients: IngredientsToBuildOf;
};

export type AuthRootState = {
  userId: string;
  token: string;
  error: string;
  loading: boolean;
  authRedirectPath: string;
  refreshToken: string;
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
  auth: AuthRootState;
};
