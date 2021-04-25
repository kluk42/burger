import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import {Props, IngredientsToBuildOf} from './types';
import {Ingredients} from '../../components/Burger/BurgerIngredient/types';

import axios from '../../axios-order';
import Burger from '../../components/Burger/index';
import BuildControls from '../../components/BuildControls/index';
import Modal from '../../components/Modal/index';
import OrderSummary from '../../components/OrderSummary';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { OwnProps } from './types';
import { AxiosError } from 'axios';

const INGREDIENT_PRICES = {
    [Ingredients.Bacon]: 0.7,
    [Ingredients.Meat]: 1.3,
    [Ingredients.Cheese]: 0.4,
    [Ingredients.Salad]: 0.5,
};

const BurgerBuilder: Props= () => {
    const [ingredients, setIngredients] = useState<IngredientsToBuildOf | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(4);
    const [purchesable, setPurchesable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const history = useHistory();

    useEffect(() => {
        async function fetchIngredients () {
            try {
                setIsLoading(true);
                const response = await axios.get('https://burger-feca9-default-rtdb.firebaseio.com/ingredients.json');
                if (response) {
                    const ingredients: IngredientsToBuildOf = response.data;
                    setIngredients(ingredients);
                }
                setIsLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };
        fetchIngredients();
    }, [])

    useEffect(() => {
        if (ingredients) {
            setPurchesable(Object.keys(ingredients).some(ing => ingredients[ing as keyof IngredientsToBuildOf]>0 && ing!==Ingredients.SeedsOne && ing!==Ingredients.SeedsTwo));
        }
    }, [ingredients]);

    const addIngredientHandler = (type: Ingredients) => {
        setIngredients(() => {
            if (type !== Ingredients.BreadTop && type !== Ingredients.BreadBottom && ingredients) {
                return {
                    ...ingredients,
                    [type]: ingredients[type] + 1,
                }
            }
            return ingredients
        });
        setTotalPrice(() => {
            if (type !== Ingredients.SeedsOne && type !== Ingredients.SeedsTwo && type !== Ingredients.BreadTop && type !== Ingredients.BreadBottom) {
                return INGREDIENT_PRICES[type] + totalPrice
            }
            return totalPrice
        });
    }

    const removeIngredientHandler = (type: Ingredients) => {
        setIngredients(() => {
            if (type !== Ingredients.BreadTop && type !== Ingredients.BreadBottom && ingredients && ingredients[type]>0 ) {
                return {
                    ...ingredients,
                    [type]: ingredients[type] - 1,
                }
            }
            return ingredients
        });
        setTotalPrice(() => {
            if (type !== Ingredients.SeedsOne && type !== Ingredients.SeedsTwo && type !== Ingredients.BreadTop && type !== Ingredients.BreadBottom && totalPrice>4) {
                return totalPrice - INGREDIENT_PRICES[type]
            }
            return totalPrice
        });
    }

    const handleModalVisibility = () => {
        setIsModalOpen(() => !isModalOpen)
    }

    const purchaseClick = async () => {
        if (ingredients) {
            const queryParams: string[] = [];
            queryParams.push('price='+totalPrice);
            Object.keys(ingredients).forEach(i => {
                queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(ingredients[i as keyof IngredientsToBuildOf]));
            })
            const queryString = queryParams.join('&');
            history.push({
                pathname: '/checkout',
                search: '?' + queryString,
            });
        }
    }

    if (ingredients) {
        return (
            <>
                <Modal show={isModalOpen} handleRenderModal={handleModalVisibility}>
                    {!isLoading ?
                        <OrderSummary
                            ingredients={ingredients}
                            handleCnclClick={handleModalVisibility}
                            handleCntnClick={purchaseClick}
                            total={totalPrice}
                        />
                        :
                        <Spinner/>
                    }
                </Modal>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    ingredients={ingredients}
                    price={totalPrice}
                    purchesable={purchesable}
                    handleOrderBtnClick={() => {setIsModalOpen(() => true)}}
                />
            </>
        );
    } else {
        return error ? <p>Ingredients can't be fetched</p> : <Spinner/>
    }
}

export default withErrorHandler<OwnProps>(BurgerBuilder, axios);
