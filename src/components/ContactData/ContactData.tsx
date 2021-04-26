import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

import {Props, InputData, DropDownItems, InputNames, ValidationRules, ValidationRuleSet, Validity, ValidationMessages} from './types';
import {Theme} from '../Button/types';

import './ContactData.scss';

import axios from '../../axios-order';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Spinner from '../Spinner';

const validationRules: ValidationRules = {
    [InputNames.Name]: {
        required: true
    },
    [InputNames.Email]: {
        required: true
    },
    [InputNames.Street]: {
        required: true
    },
    [InputNames.PostalCode]: {
        required: true,
        minLength: 6,
        maxLength: 6,
    },
    [InputNames.DeliveryMethod]: {
        required: true
    }
}

const ContactData: Props = ({ingredients, totalPrice}) => {
    const [inputData, setInputData] = useState<InputData>({
        [InputNames.Email]: '',
        [InputNames.Name]: '',
        [InputNames.Street]: '',
        [InputNames.PostalCode]: '',
        [InputNames.DeliveryMethod]: DropDownItems.Fastest,
    });
    const [validity, setValidity] = useState<Validity>({
        [InputNames.Name]: false,
        [InputNames.Email]: false,
        [InputNames.Street]: false,
        [InputNames.PostalCode]: false,
        [InputNames.DeliveryMethod]: true,
    });
    const [validationMessages, setValidationMessages] = useState<ValidationMessages>({
        [InputNames.Name]: '',
        [InputNames.Email]: '',
        [InputNames.Street]: '',
        [InputNames.PostalCode]: '',
        [InputNames.DeliveryMethod]: '',
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const overAllValidity = Object.values(validity).reduce((res, fieldValidity) => res && fieldValidity);
        setIsFormValid(overAllValidity);
    }, [validity])

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
        const {value, name} = e.currentTarget;
        setInputData({
            ...inputData,
            [name as InputNames]: value
        });
        setValidity(validity => {
            console.log(name)
            return {
                ...validity,
                [name]: checkValidity(value, validationRules[name as InputNames], name as InputNames)
            }
        })
    }

    const checkValidity = (value: string, rules: ValidationRuleSet, name:InputNames) => {
        let isValid = false;
        let message = '';
        if (rules.required) {
            isValid = value.trim() !== '';
            message = isValid ? message : message + ' Это поле обязательно для заполнения.';
        }
        if (rules.minLength) {
            const currentValidity = value.length >= rules.minLength;
            isValid = currentValidity && isValid;
            message = currentValidity ? message : message + ` Минимальная длинна ${rules.minLength}.`;
        }
        if (rules.maxLength) {
            const currentValidity = value.length <= rules.maxLength;
            isValid = currentValidity && isValid;
            message = currentValidity ? message : message + ` Максимальная длинна ${rules.maxLength}.`;
        }
        setValidationMessages(msgs => {
            return {
                ...msgs,
                [name]: message
            }
        })
        return isValid
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
                        invalid={!validity[InputNames.Name]}
                        validationMessage={validationMessages[InputNames.Name]}
                    />
                    <Input
                        type="text"
                        name={InputNames.Email}
                        value={inputData[InputNames.Email]}
                        placeholder="Your email"
                        onChange={handleInputChange}
                        invalid={!validity[InputNames.Email]}
                        validationMessage={validationMessages[InputNames.Email]}
                    />
                    <Input
                        type="text"
                        name={InputNames.Street}
                        value={inputData[InputNames.Street]}
                        placeholder="Your street"
                        onChange={handleInputChange}
                        invalid={!validity[InputNames.Street]}
                        validationMessage={validationMessages[InputNames.Street]}
                    />
                    <Input
                        type="text"
                        name={InputNames.PostalCode}
                        value={inputData[InputNames.PostalCode]}
                        placeholder="Postalcode"
                        onChange={handleInputChange}
                        invalid={!validity[InputNames.PostalCode]}
                        validationMessage={validationMessages[InputNames.PostalCode]}
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
                        disabled={!isFormValid}
                    >
                        Order
                    </Button>
                </form>}
        </div>
    )
}

export default ContactData;
