import React from "react";
import { Form, Field } from 'react-final-form'
import {Button, Input} from "../common/FormsControls/FormsControls";
import {isEmail, maxLength, minLength, required} from "../../utills/validators/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../reducers/userReducer";
import '../common/form.scss'

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


const LoginForm = (props) => {
    return <Form onSubmit ={ async (value) => await props.login(value.email,value.password)} render={
        ({submitError, handleSubmit, submitting}) => {
            return  <form onSubmit={handleSubmit}>
                <Field className='form__field' validate={composeValidators(required,isEmail)} placeholder={"Email"} name={"email"} component={Input} />
                <Field className='form__field'    validate={composeValidators(required, maxLength(12), minLength(3))} placeholder={"Password"} name={"password"} type='password' component={Input} />
                <div className='form__submit-error'>
                    {submitError && <div>{submitError}</div>}
                </div>
                <div className='form__button'>
                    <Button type='submit' disabled={submitting}>Login</Button>
                </div>
            </form>
        }
    } />

}

const Login = (props) => {
    if(props.isAuth) return <Redirect to={`/profile`}/>
    return <div className='form'>
        <h1>Login</h1>
        <LoginForm login={props.login}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth:state.user.isAuth
})
export default connect(mapStateToProps,{login})(Login)