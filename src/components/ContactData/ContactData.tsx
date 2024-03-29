import { Controller, useForm, useFormState } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useBAppDispatch } from '../../helpers/hooks';
import WithErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../infrastructure/network/axios-orders';
import { purchaseBurger } from '../../infrastructure/store/slices/order';
import { RootState } from '../../infrastructure/store/slices/types';
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
    required: 'This field is required',
  },
  [InputNames.Email]: {
    required: 'This field is required',
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Invalid email',
    },
  },
  [InputNames.Street]: {
    required: 'This field is required',
  },
  [InputNames.PostalCode]: {
    required: 'This field is required',
    pattern: { value: /[0-9]/, message: 'Only numbers are allowed' },
    minLength: { value: 6, message: 'Minimum length is 6 characters' },
    maxLength: { value: 6, message: 'Maximum length is 6 characters' },
  },
  [InputNames.DeliveryMethod]: {
    required: 'This field is required',
  },
};

const ContactData: Props = () => {
  const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state: RootState) => state.burgerBuilder.totalPrice);
  const isPurchasing = useSelector((state: RootState) => state.orders.purchasing);
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useBAppDispatch();
  const {
    register,
    formState: { errors, isValid: isFormValid },
    handleSubmit,
    control,
  } = useForm<InputData>({ mode: 'onChange' });
  const { touchedFields } = useFormState<InputData>({ control });

  const orderHandler = (data: InputData) => {
    const order: Order = {
      ingredients: { ...ingredients },
      price: totalPrice,
      customer: {
        name: data[InputNames.Name],
        address: {
          street: data[InputNames.Street],
          zipCode: +data[InputNames.PostalCode],
          country: 'Russia',
        },
        email: data[InputNames.Email],
        id: userId,
      },
      deliveryMethod: data[InputNames.DeliveryMethod],
    };
    dispatch(purchaseBurger(order, token));
  };

  return (
    <div className="ContactData">
      <h3>{isPurchasing ? 'Processing' : 'Enter your contact data'}</h3>
      {isPurchasing ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(orderHandler)}>
          <Input
            type="text"
            placeholder="Your name"
            isTouched={InputNames.Name in touchedFields}
            errors={errors}
            {...register(InputNames.Name, validationRules.name)}
          />
          <Input
            type="text"
            placeholder="Your email"
            isTouched={InputNames.Email in touchedFields}
            errors={errors}
            {...register(InputNames.Email, validationRules.email)}
          />
          <Input
            type="text"
            {...register(InputNames.Street, validationRules.street)}
            placeholder="Your street"
            isTouched={InputNames.Street in touchedFields}
            autoComplete="off"
            errors={errors}
          />
          <Input
            type="text"
            {...register(InputNames.PostalCode, validationRules['postal-code'])}
            placeholder="Postalcode"
            isTouched={InputNames.PostalCode in touchedFields}
            autoComplete="off"
            errors={errors}
          />
          <Controller
            control={control}
            name={InputNames.DeliveryMethod}
            rules={validationRules['delivery-method']}
            defaultValue={DropDownItems.Cheapest}
            render={({ field: { onChange, value, name } }) => (
              <Dropdown
                label={name}
                name={name}
                options={[DropDownItems.Cheapest, DropDownItems.Fastest, DropDownItems.OnMyOwn]}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button theme={Theme.Success} isSubmit disabled={!isFormValid}>
            Order
          </Button>
        </form>
      )}
    </div>
  );
};

export default WithErrorHandler<OwnProps>(ContactData, axios);
