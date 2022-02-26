import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../../components/Button';
import { Theme } from '../../components/Button/types';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { useBAppDispatch } from '../../helpers/hooks';
import { auth, setAuthRedirectPath, startAuth } from '../../store/slices/auth';
import { RootState } from '../../store/slices/types';
import './Auth.scss';
import {
  InputData,
  InputNames,
  Props,
  ValidationMessages,
  ValidationRules,
  ValidationRuleSet,
  Validity,
} from './types';

const validationRules: ValidationRules = {
  [InputNames.Email]: {
    required: true,
    isEmail: true,
  },
  [InputNames.Password]: {
    required: true,
    minLength: 6,
  },
};

const Toolbar: Props = () => {
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);
  const isBurgerBuilding = useSelector((state: RootState) => state.burgerBuilder.building);
  const authRedirectPath = useSelector((state: RootState) => state.auth.authRedirectPath);

  const dispatch = useBAppDispatch();

  const [isSignUp, setIsSignUp] = useState(true);
  const [inputData, setInputData] = useState<InputData>({
    [InputNames.Email]: '',
    [InputNames.Password]: '',
  });
  const [validity, setValidity] = useState<Validity>({
    [InputNames.Email]: false,
    [InputNames.Password]: false,
  });
  const [validationMessages, setValidationMessages] = useState<ValidationMessages>({
    [InputNames.Password]: '',
    [InputNames.Email]: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!isBurgerBuilding && authRedirectPath !== '/') {
      dispatch(setAuthRedirectPath({ path: '/' }));
    }
  }, [isBurgerBuilding, authRedirectPath, dispatch]);

  useEffect(() => {
    const overAllValidity = Object.values(validity).reduce(
      (res, fieldValidity) => res && fieldValidity
    );
    setIsFormValid(overAllValidity);
  }, [validity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startAuth());
    dispatch(auth(inputData[InputNames.Email], inputData[InputNames.Password], isSignUp));
  };

  const onSwitchModeClick = () => {
    setIsSignUp(prev => !prev);
  };

  return !isAuthenticated ? (
    <div className="Auth">
      {!isLoading ? (
        <>
          {!!error && <p>{error}</p>}
          <form className="Auth__form" onSubmit={submitHandler}>
            <Input
              type="email"
              name={InputNames.Email}
              value={inputData[InputNames.Email]}
              placeholder="Email"
              onChange={handleInputChange}
              invalid={!validity[InputNames.Email]}
              validationMessage={validationMessages[InputNames.Email]}
            />
            <Input
              type="password"
              name={InputNames.Password}
              value={inputData[InputNames.Password]}
              placeholder="Password"
              onChange={handleInputChange}
              invalid={!validity[InputNames.Password]}
              validationMessage={validationMessages[InputNames.Password]}
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
    <Redirect to={authRedirectPath} />
  );
};

export default Toolbar;
