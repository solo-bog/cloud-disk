import React from 'react';
import {Form, Field} from 'react-final-form';
import {Button, Input} from '../common/FormsControls/FormsControls';
import {isEmail, maxLength, minLength, required} from '../../utills/validators/validators';
import {useDispatch} from 'react-redux';
import {login} from '../../reducers/userReducer';
import '../common/form.scss';

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);


const LoginForm = (props) => {
  const dispatch = useDispatch();
  return <Form onSubmit ={ async (value) => await dispatch(login(value.email, value.password))} render={
    ({submitError, handleSubmit, submitting}) => {
      return <form onSubmit={handleSubmit}>
        <Field className='form__field' validate={composeValidators(required, isEmail)} placeholder={'Email'} name={'email'} component={Input} />
        <Field className='form__field' validate={composeValidators(required, maxLength(12), minLength(3))} placeholder={'Password'} name={'password'} type='password' component={Input} />
        <div className='form__submit-error'>
          {submitError && <div>{submitError}</div>}
        </div>
        <div className='form__button'>
          <Button type='submit' disabled={submitting}>Login</Button>
        </div>
      </form>;
    }
  } />;
};

export const Login = (props) => {
  return <div className='form'>
    <h1>Login</h1>
    <LoginForm />
  </div>;
};


