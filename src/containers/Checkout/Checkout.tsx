import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import CheckoutSummary from '../../components/CheckoutSummary';
import ContactData from '../../components/ContactData';
import { RootState } from '../../store/slices/types';
import './Checkout.scss';
import { Props } from './types';

const Checkout: Props = () => {
  const areIngredientsAvailiable = useSelector((state: RootState) => {
    const result = Object.entries(state.burgerBuilder.ingredients).some(
      ([ing, amount]) => ing !== Ingredients.SeedsOne && ing !== Ingredients.SeedsTwo && amount > 0
    );
    return result;
  });
  const purchased = useSelector((state: RootState) => state.orders.purchased);
  const purchaseRedirect = purchased ? <Navigate to="/" replace /> : null;
  if (areIngredientsAvailiable) {
    return (
      <>
        {purchaseRedirect}
        <div className="Checkout">
          <CheckoutSummary />
          <Route path={'contact-data'}>
            <ContactData />
          </Route>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Checkout;
