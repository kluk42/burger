import './Order.scss';
import { Props } from './types';

const Order: Props = ({ price, ingredients }) => {
  const transformedIngredients = Object.entries(ingredients).map(pair => {
    return (
      <span key={pair[0]} className="Order__ingredient">
        {pair[0]}: ({pair[1]})
      </span>
    );
  });
  return (
    <div className="Order">
      <p>Ingredients: {transformedIngredients}</p>
      <p>
        Price: <strong>USD {price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
