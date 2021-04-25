import { useHistory } from "react-router-dom";

import {Props} from './types';
import './CheckoutSummary.scss';

import Burger from '../Burger';
import Button from '../Button';
import {Theme} from '../Button/types';

const CheckoutSummary: Props= ({ingredients}) => {
    const history = useHistory();
    return (
        <div className="CheckoutSummary">
            <h2>We hope it tastes great</h2>
            <div className={"CheckoutSummary__burger"}><Burger ingredients={ingredients}/></div>
            <Button
                theme={Theme.Danger}
                onClick={() => history.goBack()}
            >
                CANCEL
            </Button>
            <Button
                theme={Theme.Success}
                onClick={() => history.replace('/checkout/contact-data')}
            >
                CONTINUE
            </Button>
        </div>
    )
}

export default CheckoutSummary;
