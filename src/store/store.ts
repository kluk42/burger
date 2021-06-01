import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import burgerBuilderReducer from './reducers/burgerBuilder';
import ordersReducer from './reducers/order';

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = {
    burgerBuilder: burgerBuilderReducer,
    orders: ordersReducer,
    auth: authReducer
}

export const store = createStore(combineReducers(rootReducer), composeEnhancers(
    applyMiddleware(thunk)
));
