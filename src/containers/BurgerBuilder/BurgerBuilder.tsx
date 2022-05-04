import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BuildControls from '../../components/BuildControls/index';
import Burger from '../../components/Burger/index';
import Modal from '../../components/Modal/index';
import OrderSummary from '../../components/OrderSummary';
import Spinner from '../../components/Spinner';
import { useBAppDispatch } from '../../helpers/hooks';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../infrastructure/network/axios';
import { setAuthRedirectPath } from '../../infrastructure/store/slices/auth';
import { initIngredients } from '../../infrastructure/store/slices/burgerBuilder';
import { startOrder } from '../../infrastructure/store/slices/order';
import { RootState } from '../../infrastructure/store/slices/types';
import { OwnProps, Props } from './types';

const BurgerBuilder: Props = () => {
  const isFetching = useSelector((state: RootState) => state.burgerBuilder.isFetching);
  const error = useSelector((state: RootState) => state.burgerBuilder.error);
  const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);

  const dispatch = useBAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isFetching) {
      dispatch(initIngredients());
    }
  }, [dispatch, isFetching]);

  const handleModalVisibility = () => {
    setIsModalOpen(() => !isModalOpen);
  };

  const purchaseClick = async () => {
    history.push('/checkout');
  };

  const handleOrderBtnClick = () => {
    if (isAuthenticated) {
      setIsModalOpen(() => true);
      dispatch(startOrder());
    } else {
      dispatch(setAuthRedirectPath({ path: '/checkout' }));
      history.push('/auth');
    }
  };

  if (!isFetching) {
    return (
      <>
        <Modal show={isModalOpen} handleRenderModal={handleModalVisibility}>
          <OrderSummary handleCnclClick={handleModalVisibility} handleCntnClick={purchaseClick} />
        </Modal>
        <Burger />
        <BuildControls handleOrderBtnClick={handleOrderBtnClick} />
      </>
    );
  } else {
    return error ? <p>Ingredients can&apos;t be fetched</p> : <Spinner />;
  }
};

export default withErrorHandler<OwnProps>(BurgerBuilder, axios);
