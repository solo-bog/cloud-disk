import React, {useRef} from "react";
import { Form, Field } from 'react-final-form'
import {Button, Input} from "../common/FormsControls/FormsControls";
import {confirmPassword, isEmail, maxLength, minLength, required} from "../../utills/validators/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {registration} from "../../reducers/userReducer";
import '../common/form.scss'

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


const RegistrationForm = (props) => {
let password = useRef(null)
    return <Form onSubmit ={ async (value) => await props.registration(value.email,value.password)} render={
        ({submitError, handleSubmit, submitting}) => {
            return  <form onSubmit={handleSubmit}>
                    <Field className='form__field' validate={composeValidators(required,isEmail)} placeholder={"Email"} name={"email"} component={Input} />
                    <Field className='form__field'  ref={password}  validate={composeValidators(required, maxLength(12), minLength(3))} placeholder={"Password"} name={"password"} type='password' component={Input} />
                    <Field className='form__field' validate={composeValidators(required,confirmPassword(password.current?password.current.value:""))} placeholder={"Password confirm"} name={"passwordConfirm"} type='password' component={Input} />
                <div className='form__submit-error'>
                    {submitError && <div>{submitError}</div>}
                </div>
                <div className='form__button'>
                    <Button type='submit' disabled={submitting}>Registration</Button>
                </div>
            </form>
        }
    } />

}

const Registration = (props) => {
    if(props.isAuth) return <Redirect to={`/profile`}/>
    return <div className='form'>
        <h1>Registration</h1>
        <RegistrationForm registration={props.registration}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth:state.user.isAuth
})
export default connect(mapStateToProps,{registration})(Registration)