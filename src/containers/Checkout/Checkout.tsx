import { useSelector } from 'react-redux';
import { Redirect, Route, useRouteMatch } from 'react-router-dom';
import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import CheckoutSummary from '../../components/CheckoutSummary';
import ContactData from '../../components/ContactData';
import { RootState } from '../../infrastructure/store/slices/types';
import './Checkout.scss';
import { Props } from './types';

const Checkout: Props = () => {
  const match = useRouteMatch();
  const areIngredientsAvailiable = useSelector((state: RootState) => {
    const result = Object.entries(state.burgerBuilder.ingredients).some(
      ([ing, amount]) => ing !== Ingredients.SeedsOne && ing !== Ingredients.SeedsTwo && amount > 0
    );
    return result;
  });
  const purchased = useSelector((state: RootState) => state.orders.purchased);
  const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
  if (areIngredientsAvailiable) {
    return (
      <>
        {purchaseRedirect}
        <div className="Checkout">
          <CheckoutSummary />
          <Route path={match.path + '/contact-data'}>
            <ContactData />
          </Route>
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Checkout;
