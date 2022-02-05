import { AxiosResponse } from 'axios';
import axios from '../../axios-order';
import { Order } from '../../components/ContactData/types';
import { OrderFromServer } from '../../components/Order/types';
import { resetIngredients } from './burgerBuilder';
import { ActionNames, DispatchOrderAction, OrderAction } from './types';

export const purchaseBurgerSuccess = (
  id: string,
  order: Order
): OrderAction<ActionNames.PURCHASE_BURGER_SUCCESS> => {
  return {
    type: ActionNames.PURCHASE_BURGER_SUCCESS,
    payload: {
      id,
      order,
    },
  };
};

export const purchaseBurgerFail = (): OrderAction<ActionNames.PURCHASE_BURGER_FAIL> => {
  return {
    type: ActionNames.PURCHASE_BURGER_FAIL,
    payload: {
      error: true,
    },
  };
};

export const purchaseBurgerStart = (): OrderAction<ActionNames.PURCHASE_BURGER_START> => {
  return {
    type: ActionNames.PURCHASE_BURGER_START,
    payload: null,
  };
};

export const purchaseBurger = (order: Order, token: string) => {
  return async (
    dispatch: DispatchOrderAction<
      | ActionNames.PURCHASE_BURGER_START
      | ActionNames.PURCHASE_BURGER_SUCCESS
      | ActionNames.RESET_INGREDIENTS
      | ActionNames.PURCHASE_BURGER_FAIL
    >
  ) => {
    dispatch(purchaseBurgerStart());
    try {
      const response: AxiosResponse<{ name: string }> = await axios.post(
        '/orders.json?auth=' + token,
        order
      );
      dispatch(purchaseBurgerSuccess(response.data.name, order));
      dispatch(resetIngredients());
    } catch (err) {
      dispatch(purchaseBurgerFail());
    }
  };
};

export const startOrdering = (): OrderAction<ActionNames.START_ORDERING> => {
  return {
    type: ActionNames.START_ORDERING,
    payload: null,
  };
};

export const fetchOrdersSuccess = (
  orders: OrderFromServer[]
): OrderAction<ActionNames.FETCH_ORDERS_SUCCESS> => {
  return {
    type: ActionNames.FETCH_ORDERS_SUCCESS,
    payload: {
      orders,
    },
  };
};

export const fetchOrdersFail = (): OrderAction<ActionNames.FETCH_ORDERS_FAIL> => {
  return {
    type: ActionNames.FETCH_ORDERS_FAIL,
    payload: {
      error: true,
    },
  };
};

export const fetchOrdersStart = (): OrderAction<ActionNames.FETCH_ORDERS_INIT> => {
  return {
    type: ActionNames.FETCH_ORDERS_INIT,
    payload: null,
  };
};

export const fetchOrders = (token: string, userId: string) => {
  return async (
    dispatch: DispatchOrderAction<
      | ActionNames.FETCH_ORDERS_INIT
      | ActionNames.FETCH_ORDERS_SUCCESS
      | ActionNames.FETCH_ORDERS_FAIL
    >
  ) => {
    dispatch(fetchOrdersStart());
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
      dispatch(fetchOrdersSuccess(orders));
    } catch (err) {
      dispatch(fetchOrdersFail());
      console.log(err);
    }
  };
};
