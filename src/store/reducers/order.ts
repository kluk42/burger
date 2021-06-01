import {ActionNames} from '../actions/types';
import { OrderActions, OrdersInitialState } from './types';

const initialState: OrdersInitialState = {
    orders: [],
    purchasing: false,
    purchased: false,
    error: false,
    ordersFetching: false,
}

const reducer = (state: OrdersInitialState = initialState, action: OrderActions) => {
    switch (action.type) {
        case ActionNames.PURCHASE_BURGER_SUCCESS:
            const newOrder = {...action.payload.order, id: action.payload.id};
            return {
                ...state,
                orders: [...state.orders, newOrder],
                purchasing: false,
                purchased: true
            };
        case ActionNames.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                purchasing: false,
            };
        case ActionNames.PURCHASE_BURGER_START:
            return{
                ...state,
                purchasing: true
            }
        case ActionNames.START_ORDERING:
            return {
                ...state,
                purchased: false
            }
        case ActionNames.FETCH_ORDERS_INIT:
            return {
                ...state,
                ordersFetching: true,
            }
        case ActionNames.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                ordersFetching: false,
                orders: action.payload.orders
            }
        case ActionNames.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default reducer;
