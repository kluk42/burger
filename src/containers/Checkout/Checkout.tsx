import { useState, useEffect } from 'react';import {Props} from './types';
import {useHistory, Route, useRouteMatch} from 'react-router-dom';

import './Checkout.scss';

import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import { IngredientsToBuildOf, PriceQueryKey } from '../BurgerBuilder/types';

import CheckoutSummary from '../../components/CheckoutSummary';
import ContactData from '../../components/ContactData';

const Checkout: Props= () => {
    const [ingredients, setIngredients] = useState<IngredientsToBuildOf>({
        [Ingredients.Bacon]: 1,
        [Ingredients.Cheese]: 1,
        [Ingredients.Meat]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.SeedsOne]: 1,
        [Ingredients.SeedsTwo]: 1,
    });
    const [wasRendered, setWasRendered] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        if (!wasRendered) {
            const query = new URLSearchParams(history.location.search);
            const ingredientsFromQuery: IngredientsToBuildOf = {
                [Ingredients.Bacon]: 0,
                [Ingredients.Cheese]: 0,
                [Ingredients.Meat]: 0,
                [Ingredients.Salad]: 0,
                [Ingredients.SeedsOne]: 0,
                [Ingredients.SeedsTwo]: 0,
            };
            for (let param of query.entries()) {
                if (param[0] !== PriceQueryKey.PriceQueryKey){
                    const i =param[0] as keyof IngredientsToBuildOf;
                    ingredientsFromQuery[i]=+param[1];
                } else {
                    setTotalPrice(+param[1]);
                }
            }
            setIngredients(ingredientsFromQuery);
            setWasRendered(true)
        }
    }, [history.location.search, wasRendered])
    return (
        <div className="Checkout">
            <CheckoutSummary ingredients={ingredients}/>
            <Route path={match.path+'/contact-data'}>
                <ContactData
                    ingredients={ingredients}
                    totalPrice={totalPrice ? totalPrice : 0}
                />
            </Route>
        </div>
    )
}

export default Checkout;
