import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BuildControls from '../../components/BuildControls/index';
import Burger from '../../components/Burger/index';
import Modal from '../../components/Modal/index';
import OrderSummary from '../../components/OrderSummary';
import Spinner from '../../components/Spinner';
import { PurchasableIngredients } from '../../helpers/calculateTotalPrice';
import { useBAppDispatch } from '../../helpers/hooks';
import withErrorHandler from '../../hoc/withErrorHandler';
import { useIngredients } from '../../hooks';
import { Ingredients, IngredientsToBuildOf } from '../../hooks/useIngredients/types';
import axios from '../../infrastructure/network/axios-orders';
import { setAuthRedirectPath } from '../../infrastructure/store/slices/auth';
import { setIngredients } from '../../infrastructure/store/slices/burgerBuilder';
import { RootState } from '../../infrastructure/store/slices/types';
import { OwnProps, Props } from './types';

const BurgerBuilder: Props = () => {
  const currentBuildingIngredients = useSelector(
    (state: RootState) => state.burgerBuilder.ingredients
  );
  const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);

  const dispatch = useBAppDispatch();

  const [orderIngredients, setOrderIngredients] = useState<IngredientsToBuildOf>(
    currentBuildingIngredients
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isBuildingInProcess = Object.entries(currentBuildingIngredients).some(([ing, amount]) => {
    const ingredientName = ing as Ingredients;
    return (
      ingredientName !== Ingredients.SeedsOne &&
      ingredientName !== Ingredients.SeedsTwo &&
      amount > 0
    );
  });

  const { data: initialIngredients, isFetching, isError } = useIngredients(!isBuildingInProcess);

  useEffect(() => {
    if (!isBuildingInProcess && initialIngredients) {
      setOrderIngredients(initialIngredients);
    }
  }, [initialIngredients]);

  const navigate = useNavigate();

  const handleModalVisibility = () => {
    setIsModalOpen(prev => !prev);
  };

  const purchaseClick = async () => {
    navigate('/checkout', {});
  };

  const handleOrderBtnClick = () => {
    if (!orderIngredients) {
      return;
    }

    dispatch(setIngredients({ ingredients: orderIngredients }));
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      dispatch(setAuthRedirectPath({ path: '/checkout' }));
      navigate('/auth');
    }
  };

  const addIngredient = (ingredient: PurchasableIngredients) => {
    if (orderIngredients) {
      setOrderIngredients({ ...orderIngredients, [ingredient]: orderIngredients[ingredient] + 1 });
    }
  };

  const subtractIngredient = (ingredient: PurchasableIngredients) => {
    if (orderIngredients) {
      setOrderIngredients({ ...orderIngredients, [ingredient]: orderIngredients[ingredient] - 1 });
    }
  };

  if (isError) {
    return <p>Ingredients can&apos;t be fetched</p>;
  }

  if (isFetching || !orderIngredients) {
    return <Spinner />;
  }

  return (
    <>
      <Modal show={isModalOpen} handleRenderModal={handleModalVisibility}>
        <OrderSummary handleCnclClick={handleModalVisibility} handleCntnClick={purchaseClick} />
      </Modal>
      <Burger ingredients={orderIngredients} />
      <BuildControls
        addIngredient={addIngredient}
        subtractIngredient={subtractIngredient}
        handleOrderBtnClick={handleOrderBtnClick}
        ingredients={orderIngredients}
      />
    </>
  );
};

export default withErrorHandler<OwnProps>(BurgerBuilder, axios);
