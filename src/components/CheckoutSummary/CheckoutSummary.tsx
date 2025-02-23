import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CheckoutSummary.scss';
import { Props } from './types';

import { useSelector } from 'react-redux';
import { RootState } from '../../infrastructure/store/slices/types';
import Burger from '../Burger';
import Button from '../Button';
import { Theme } from '../Button/types';

const CheckoutSummary: Props = () => {
  const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);

  const [areButtonsVisible, setAreButtonsVisible] = useState(true);

  const navigate = useNavigate();

  const onCntnClick = () => {
    navigate('/checkout/contact-data', { replace: true });
    setAreButtonsVisible(false);
  };
  return (
    <div className="CheckoutSummary">
      <h2>We hope it tastes great</h2>
      <div className={'CheckoutSummary__burger'}>
        <Burger ingredients={ingredients} />
      </div>
      {areButtonsVisible && (
        <>
          <Button theme={Theme.Danger} onClick={() => navigate(-1)}>
            CANCEL
          </Button>
          <Button theme={Theme.Success} onClick={onCntnClick}>
            CONTINUE
          </Button>
        </>
      )}
    </div>
  );
};

export default CheckoutSummary;
