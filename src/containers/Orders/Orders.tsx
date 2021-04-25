import { useEffect, useState } from 'react';

import {Props} from './types';

import Order from '../../components/Order';
import { OrderObj } from '../../components/Order/types';
import withErrorHandler from '../../hoc/withErrorHandler';

import axios from '../../axios-order';

import './Orders.scss';
import Spinner from '../../components/Spinner';

const Orders: Props= () => {
    const [orders, setOrders] = useState<OrderObj[] | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('/orders.json');
                const orders: OrderObj[] = Object.entries(response.data).map(ent => {
                    return {
                        ...ent[1] as OrderObj,
                        id: ent[0]
                    }
                });
                console.log(orders);
                setLoading(false);
                setOrders(orders);
            }
            catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        fetchOrders()
    }, [])
    return (
        <div>
            {   loading ? <Spinner />
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
