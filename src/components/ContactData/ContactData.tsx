import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../axios-order';
import { useBAppDispatch } from '../../helpers/hooks';
import WithErrorHandler from '../../hoc/withErrorHandler';
import { purchaseBurger } from '../../store/slices/order';
import { RootState } from '../../store/slices/types';
import Button from '../Button';
import { Theme } from '../Button/types';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Spinner from '../Spinner';
import './ContactData.scss';
import {
  DropDownItems,
  InputData,
  InputNames,
  Order,
  OwnProps,
  Props,
  ValidationMessages,
  ValidationRules,
  ValidationRuleSet,
  Validity,
} from './types';

const validationRules: ValidationRules = {
  [InputNames.Name]: {
    required: true,
  },
  [InputNames.Email]: {
    required: true,
    isEmail: true,
  },
  [InputNames.Street]: {
    required: true,
  },
  [InputNames.PostalCode]: {
    required: true,
    minLength: 6,
    maxLength: 6,
  },
  [InputNames.DeliveryMethod]: {
    required: true,
  },
};

const ContactData: Props = () => {
  const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state: RootState) => state.burgerBuilder.totalPrice);
  const isPurchasing = useSelector((state: RootState) => state.orders.purchasing);
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

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
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useBAppDispatch();

  useEffect(() => {
    const overAllValidity = Object.values(validity).reduce(
      (res, fieldValidity) => res && fieldValidity
    );
    setIsFormValid(overAllValidity);
  }, [validity]);

  const orderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order: Order = {
      ingredients: { ...ingredients },
      price: totalPrice,
      customer: {
        name: inputData[InputNames.Name],
        address: {
          street: inputData[InputNames.Street],
          zipCode: +inputData[InputNames.PostalCode],
          country: 'Russia',
        },
        email: inputData[InputNames.Email],
        id: userId,
      },
      deliveryMethod: inputData[InputNames.DeliveryMethod],
    };
    dispatch(purchaseBurger(order, token));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.currentTarget;
    setInputData({
      ...inputData,
      [name as InputNames]: value,
    });
    setValidity(validity => {
      return {
        ...validity,
        [name]: checkValidity(value, validationRules[name as InputNames], name as InputNames),
      };
    });
  };

  const checkValidity = (value: string, rules: ValidationRuleSet, name: InputNames) => {
    let isValid = false;
    let message = '';
    if (rules.required) {
      isValid = value.trim() !== '';
      message = isValid ? message : message + ' This field is required.';
    }
    if (rules.minLength) {
      const currentValidity = value.length >= rules.minLength;
      isValid = currentValidity && isValid;
      message = currentValidity ? message : message + ` The minimal length is ${rules.minLength}.`;
    }
    if (rules.maxLength) {
      const currentValidity = value.length <= rules.maxLength;
      isValid = currentValidity && isValid;
      message = currentValidity ? message : message + ` The max length is ${rules.maxLength}.`;
    }
    if (rules.isEmail) {
      const pattern = /^\S+@\S+\.\S+$/;
      const currentValidity = pattern.test(value);
      isValid = currentValidity && isValid;
      message = currentValidity ? message : message + ' Enter valid email';
    }
    setValidationMessages(msgs => {
      return {
        ...msgs,
        [name]: message,
      };
    });
    return isValid;
  };

  return (
    <div className="ContactData">
      <h3>Entry your contact data</h3>
      {isPurchasing ? (
        <Spinner />
      ) : (
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
          <Button theme={Theme.Success} isSubmit={true} disabled={!isFormValid}>
            Order
          </Button>
        </form>
      )}
    </div>
  );
};

export default WithErrorHandler<OwnProps>(ContactData, axios);
