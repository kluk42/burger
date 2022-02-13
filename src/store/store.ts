import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, compose } from 'redux';
import authReducer from './slices/auth';
import burgerBuilderReducer from './slices/burgerBuilder';
import ordersReducer from './slices/order';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

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

export type BAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  BAppRootState,
  unknown,
  AnyAction
>;
