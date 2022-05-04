import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Order from '../../components/Order';
import Spinner from '../../components/Spinner';
import { useBAppDispatch } from '../../helpers/hooks';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../infrastructure/network/axios';
import { fetchOrders } from '../../infrastructure/store/slices/order';
import { RootState } from '../../infrastructure/store/slices/types';
import './Orders.scss';
import { Props } from './types';

const Orders: Props = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const isLoading = useSelector((state: RootState) => state.orders.ordersFetching);
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const dispatch = useBAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders(token, userId));
    }
  }, [dispatch, token, userId]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        orders?.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))
      )}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
