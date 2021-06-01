import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/reducers/types';
import {Props} from './types';

import Order from '../../components/Order';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

import axios from '../../axios-order';

import './Orders.scss';

import { fetchOrders } from '../../store/actions/order';

const Orders: Props= () => {
    const orders = useSelector((state: RootState) => state.orders.orders);
    const isLoading = useSelector((state: RootState) => state.orders.ordersFetching);
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(fetchOrders(token, userId))
        }
    }, [dispatch, token, userId])

    return (
        <div>
            {   isLoading ? <Spinner />
                :
                orders?.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
                ))
            }
        </div>
    )
}

export default withErrorHandler(Orders, axios);

// const orders = useSelector((state: RootState) => state.orders.orders);
// const isLoading = useSelector((state: RootState) => state.orders.ordersFetching);
// const dispatch = useDispatch();
// useEffect(() => {
//     dispatch(fetchOrders())
// }, [dispatch])
