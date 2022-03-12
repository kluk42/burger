import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  ValidationRules,
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
  const dispatch = useBAppDispatch();
  const { register } = useForm<InputData>();

  const [inputData, setInputData] = useState<InputData>({
    [InputNames.Email]: '',
    [InputNames.Name]: '',
    [InputNames.Street]: '',
    [InputNames.PostalCode]: '',
    [InputNames.DeliveryMethod]: DropDownItems.Fastest,
  });

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

  return (
    <div className="ContactData">
      <h3>Entry your contact data</h3>
      {isPurchasing ? (
        <Spinner />
      ) : (
        <form onSubmit={orderHandler}>
          <Input
            type="text"
            placeholder="Your name"
            invalid={false}
            {...register(InputNames.Name)}
          />
          <Input
            type="text"
            {...register(InputNames.Email)}
            placeholder="Your email"
            invalid={false}
            {...register(InputNames.Name)}
          />
          <Input
            type="text"
            {...register(InputNames.Street)}
            placeholder="Your street"
            invalid={false}
          />
          <Input
            type="text"
            {...register(InputNames.PostalCode)}
            placeholder="Postalcode"
            invalid={false}
          />
          <Dropdown
            label={InputNames.DeliveryMethod}
            name={InputNames.DeliveryMethod}
            options={[DropDownItems.Cheapest, DropDownItems.Fastest, DropDownItems.OnMyOwn]}
            value={inputData[InputNames.DeliveryMethod]}
          />
          <Button theme={Theme.Success} isSubmit={true} disabled={false}>
            Order
          </Button>
        </form>
      )}
    </div>
  );
};

export default WithErrorHandler<OwnProps>(ContactData, axios);
