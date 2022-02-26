import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import authReducer from './slices/auth';
import burgerBuilderReducer from './slices/burgerBuilder';
import ordersReducer from './slices/order';

const rootReducer = {
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer,
  orders: ordersReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type BAppRootState = ReturnType<typeof store.getState>;

export type BAppDispatch = typeof store.dispatch;

export type BAppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  BAppRootState,
  unknown,
  AnyAction
>;
