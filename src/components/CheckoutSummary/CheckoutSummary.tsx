import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Props } from './types';
import './CheckoutSummary.scss';

import Burger from '../Burger';
import Button from '../Button';
import { Theme } from '../Button/types';

const CheckoutSummary: Props = () => {
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);

  const history = useHistory();

  const onCntnClick = () => {
    history.replace('/checkout/contact-data');
    setAreButtonsVisible(false);
  };
  return (
    <div className="CheckoutSummary">
      <h2>We hope it tastes great</h2>
      <div className={'CheckoutSummary__burger'}>
        <Burger />
      </div>
      {areButtonsVisible && (
        <>
          <Button theme={Theme.Danger} onClick={() => history.goBack()}>
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
