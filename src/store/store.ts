import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, compose } from 'redux';
import authReducer from './reducers/auth';
import burgerBuilderReducer from './reducers/burgerBuilder';
import ordersReducer from './reducers/order';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = {
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer,
  orders: ordersReducer,
};

// export const store = createStore(
//   combineReducers(rootReducer),
//   // eslint-disable-next-line
//   composeEnhancers(applyMiddleware(thunk))
// );

export const store = configureStore({
  reducer: rootReducer,
  enhancers: composeEnhancers,
});

export type BAppRootState = ReturnType<typeof store.getState>;

export type BAppDispatch = typeof store.dispatch;

export type BAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  BAppRootState,
  unknown,
  AnyAction
>;
