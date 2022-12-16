import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Order } from '../../../components/ContactData/types';
import { OrderFromServer } from '../../../components/Order/types';
import axios from '../../network/axios-orders';
import { BAppThunk } from '../store';
import { resetIngredients } from './burgerBuilder';
import { FetchOrdersPayload, OrdersInitialState, PurchaseBurgerSuccessPayload } from './types';

const initialState: OrdersInitialState = {
  orders: [],
  purchasing: false,
  purchased: false,
  error: false,
  ordersFetching: false,
};

export const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    purchaseSuccess: (state, action: PayloadAction<PurchaseBurgerSuccessPayload>) => {
      state.orders = [...state.orders, { ...action.payload.order, id: action.payload.id }];
      state.purchasing = false;
      state.purchased = true;
    },
    purchaseFail: state => {
      state.purchasing = false;
    },
    startPurchase: state => {
      state.purchasing = true;
    },
    startOrder: state => {
      state.purchased = false;
    },
    initFetchingOrders: state => {
      state.ordersFetching = true;
    },
    fetchingOrderSuccess: (state, action: PayloadAction<FetchOrdersPayload>) => {
      state.orders = action.payload.orders;
      state.ordersFetching = false;
    },
    fetchingOrdersFail: state => {
      state.error = true;
    },
  },
});

export default slice.reducer;

export const {
  purchaseSuccess,
  purchaseFail,
  startPurchase,
  startOrder,
  initFetchingOrders,
  fetchingOrderSuccess,
  fetchingOrdersFail,
} = slice.actions;

export const purchaseBurger = (order: Order, token: string): BAppThunk => {
  return async dispatch => {
    dispatch(startPurchase());
    try {
      const response: AxiosResponse<{ name: string }> = await axios.post(
        '/orders.json?auth=' + token,
        order
      );
      dispatch(purchaseSuccess({ id: response.data.name, order }));
      dispatch(resetIngredients());
    } catch (err) {
      dispatch(purchaseFail());
    }
  };
};

export const fetchOrders = (token: string, userId: string): BAppThunk => {
  return async dispatch => {
    dispatch(initFetchingOrders());
    try {
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId + '"';
      const response = await axios.get('/orders.json' + queryParams);
      // eslint-disable-next-line
      const orders: OrderFromServer[] = Object.entries(response.data).map(ent => {
        return {
          ...(ent[1] as OrderFromServer),
          id: ent[0],
        };
      });
      dispatch(fetchingOrderSuccess({ orders }));
    } catch (err) {
      dispatch(fetchingOrdersFail());
      console.log(err);
    }
  };
};
