import { useSelector } from 'react-redux';
import Order from '../../components/Order';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { useOrders } from '../../hooks/useOrders';
import axios from '../../infrastructure/network/axios-orders';
import { RootState } from '../../infrastructure/store/slices/types';
import './Orders.scss';
import { Props } from './types';

const Orders: Props = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data: orders, isFetching } = useOrders({ token, userId });

  return (
    <div>
      {isFetching ? (
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
