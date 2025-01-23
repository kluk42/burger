import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary';
import ContactData from '../../components/ContactData';
import { RootState } from '../../infrastructure/store/slices/types';
import './Checkout.scss';
import { Props } from './types';

const Checkout: Props = () => {
  const areIngredientsAvailable = useSelector((state: RootState) => {
    const result = Object.values(state.burgerBuilder.ingredients).some(amount => amount > 0);
    return result;
  });
  const purchased = useSelector((state: RootState) => state.orders.purchased);
  const { pathname } = useLocation();
  const shouldRenderContactsForm = pathname === '/checkout/contact-data';

  const purchaseRedirect = purchased ? <Navigate to="/" replace /> : null;
  if (areIngredientsAvailable) {
    return (
      <>
        {purchaseRedirect}
        <div className="Checkout">
          <CheckoutSummary />
          {shouldRenderContactsForm ? <ContactData /> : null}
        </div>
      </>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Checkout;
