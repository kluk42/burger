import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import {Props} from './types';

import axios from '../../axios-order';
import Burger from '../../components/Burger/index';
import BuildControls from '../../components/BuildControls/index';
import {initIngredients} from '../../store/actions/burgerBuilder';
import {setAuthRedirectPath} from '../../store/actions/auth';
import Modal from '../../components/Modal/index';
import OrderSummary from '../../components/OrderSummary';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { OwnProps } from './types';
import { RootState } from '../../store/reducers/types';
import { startOrdering } from '../../store/actions/order';

const BurgerBuilder: Props= () => {
    const isFetching = useSelector((state: RootState) => state.burgerBuilder.isFetching);
    const error = useSelector((state: RootState) => state.burgerBuilder.error);
    const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const history = useHistory();


    useEffect(() => {
        if (isFetching) {
            dispatch(initIngredients())
        }
    }, [dispatch, isFetching])

    const handleModalVisibility = () => {
        setIsModalOpen(() => !isModalOpen)
    }

    const purchaseClick = async () => {
        history.push('/checkout');
    }

    const handleOrderBtnClick = () => {
        if (isAuthenticated) {
            setIsModalOpen(() => true);
            dispatch(startOrdering());
        } else {
            dispatch(setAuthRedirectPath('/checkout'));
            history.push("/auth")
        }
    }

    if (!isFetching) {
        return (
            <>
                <Modal show={isModalOpen} handleRenderModal={handleModalVisibility}>
                        <OrderSummary
                            handleCnclClick={handleModalVisibility}
                            handleCntnClick={purchaseClick}
                        />
                </Modal>
                <Burger/>
                <BuildControls
                    handleOrderBtnClick={handleOrderBtnClick}
                />
            </>
        );
    } else {
        return error ? <p>Ingredients can't be fetched</p> : <Spinner/>
    }
}

export default withErrorHandler<OwnProps>(BurgerBuilder, axios);
