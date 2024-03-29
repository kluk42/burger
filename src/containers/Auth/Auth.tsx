import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button';
import { Theme } from '../../components/Button/types';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { useBAppDispatch } from '../../helpers/hooks';
import { auth, setAuthRedirectPath, startAuth } from '../../infrastructure/store/slices/auth';
import { RootState } from '../../infrastructure/store/slices/types';
import './Auth.scss';
import { InputData, InputNames, Props, ValidationRules } from './types';

const validationRules: ValidationRules = {
  [InputNames.Email]: {
    required: 'This field is required',
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Invalid email',
    },
  },
  [InputNames.Password]: {
    required: 'This field is required',
    minLength: { value: 6, message: 'The minimum length of password is 6 characters' },
  },
};

const Toolbar: Props = () => {
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);
  const isBurgerBuilding = useSelector((state: RootState) => state.burgerBuilder.building);
  const authRedirectPath = useSelector((state: RootState) => state.auth.authRedirectPath);
  const {
    register,
    formState: { errors, isValid: isFormValid, touchedFields },
    handleSubmit,
  } = useForm<InputData>({ mode: 'onChange' });

  const dispatch = useBAppDispatch();

  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!isBurgerBuilding && authRedirectPath !== '/') {
      dispatch(setAuthRedirectPath({ path: '/' }));
    }
  }, [isBurgerBuilding, authRedirectPath, dispatch]);

  const submitHandler = (data: InputData) => {
    dispatch(startAuth());
    dispatch(auth(data[InputNames.Email], data[InputNames.Password], isSignUp));
  };

  const onSwitchModeClick = () => {
    setIsSignUp(prev => !prev);
  };

  return !isAuthenticated ? (
    <div className="Auth">
      {!isLoading ? (
        <>
          {!!error && <p>{error}</p>}
          <form noValidate className="Auth__form" onSubmit={handleSubmit(submitHandler)}>
            <Input
              type="email"
              placeholder="Email"
              errors={errors}
              isTouched={InputNames.Email in touchedFields}
              {...register(InputNames.Email, validationRules.email)}
            />
            <Input
              type="password"
              placeholder="Password"
              errors={errors}
              isTouched={InputNames.Password in touchedFields}
              {...register(InputNames.Password, validationRules.password)}
            />
            <Button theme={Theme.Success} disabled={!isFormValid} isSubmit>
              Submit
            </Button>
          </form>
        </>
      ) : (
        <Spinner />
      )}
      <Button theme={Theme.Danger} onClick={onSwitchModeClick}>
        Switch to {isSignUp ? 'signin' : 'signup'}
      </Button>
    </div>
  ) : (
    <Navigate to={authRedirectPath} />
  );
};

export default Toolbar;
