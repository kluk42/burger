import { useEffect, useState } from 'react';

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

    useEffect(() => {
        async function fetchIngredients () {
            try {
                const response = await axios.get('https://burger-feca9-default-rtdb.firebaseio.com/ingredients.json');
                if (response) {
                    const ingredients: IngredientsToBuildOf = response.data;
                    setIngredients(ingredients);
                }
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };
        fetchIngredients();
    }, [])

    useEffect(() => {
        if (ingredients) {
            setPurchesable(Object.values(ingredients).some(ingAmount => ingAmount>0));
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
        setIsLoading(true);
        const order = {
            ingredients: {...ingredients},
            price: totalPrice,
            customer: {
                name: 'Nikita',
                address: {
                    street: 'Dibunovskaya',
                    zipCode: '41351',
                    country: 'Russia',
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        try {
            const response = await axios.post('/orders.json', order);
            console.log(response);
            setIsLoading(false);
            setIsModalOpen(false);
        } catch (err) {
            setIsModalOpen(false);
            setIsLoading(false);
            setError(err);
            console.log(err);
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
