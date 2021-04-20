import {FC} from 'react';
import {Ingredients} from '../Burger/BurgerIngredient/types';

export interface OwnProps {
    label: Ingredients,
    added: () => void,
    removed: () => void,
    removeDisabled: boolean,
}

export type Props = FC<OwnProps>;
