import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import {Props, InputData, DropDownItems, InputNames} from './types';
import {Theme} from '../Button/types';

import './ContactData.scss';

import axios from '../../axios-order';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Spinner from '../Spinner';

const ContactData: Props = ({ingredients, totalPrice}) => {
    const [inputData, setInputData] = useState<InputData>({
        [InputNames.Email]: '',
        [InputNames.Name]: '',
        [InputNames.Street]: '',
        [InputNames.PostalCode]: '',
        [InputNames.DeliveryMethod]: DropDownItems.Fastest,
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const orderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const order = {
            ingredients: {...ingredients},
            price: totalPrice,
            customer: {
                name: inputData[InputNames.Name],
                address: {
                    street: [InputNames.Street],
                    zipCode: [InputNames.PostalCode],
                    country: 'Russia',
                },
                email: inputData[InputNames.Email]
            },
            deliveryMethod: inputData[InputNames.DeliveryMethod]
        }
        try {
            setIsLoading(true);
            const response = await axios.post('/orders.json', order);
            console.log(response);
            setIsLoading(false);
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        console.log(e.currentTarget.name)
        setInputData({
            ...inputData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    return (
        <div className="ContactData">
                <h3>Entry your contact data</h3>
                {isLoading ?
                <Spinner/>
                    :
                <form onSubmit={orderHandler}>
                    <Input
                        type="text"
                        name={InputNames.Name}
                        value={inputData[InputNames.Name]}
                        placeholder="Your name"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        name={InputNames.Email}
                        value={inputData[InputNames.Email]}
                        placeholder="Your email"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        name={InputNames.Street}
                        value={inputData[InputNames.Street]}
                        placeholder="Your street"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        name={InputNames.PostalCode}
                        value={inputData[InputNames.PostalCode]}
                        placeholder="Postalcode"
                        onChange={handleInputChange}
                    />
                    <Dropdown
                        label={InputNames.DeliveryMethod}
                        name={InputNames.DeliveryMethod}
                        options={[DropDownItems.Cheapest, DropDownItems.Fastest, DropDownItems.OnMyOwn]}
                        value={inputData[InputNames.DeliveryMethod]}
                        onChange={handleInputChange}
                    />
                    <Button
                        theme={Theme.Success}
                        isSubmit={true}
                    >
                        Order
                    </Button>
                </form>}
        </div>
    )
}

export default ContactData;
