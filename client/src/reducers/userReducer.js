import {usersAPI} from "../api/userAgent";
import {FORM_ERROR} from "final-form";

const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'
const defaultState = {
    currentUser:{},
    isAuth:false
}

export default function userReducer (state=defaultState,action) {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem("token",action.payload.token)
            return {
                ...state,
                isAuth: true,
                currentUser: action.payload.user
            }
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth: false,
                currentUser: {}
            }


        default:
            return state

    }
}

const setUser = (payload) =>({type:SET_USER,payload})
export const logout = () =>({type:LOG_OUT})


export const login = (email,password) =>{
    return async (dispatch) => {
        try{
            const response = await usersAPI.login(email,password)
            dispatch(setUser(response))
        }catch (e) {
            return {[FORM_ERROR]:e.response.data.message}
        }
    }
}

export const registration = (email,password) =>{
    return async (dispatch) => {
        try{
            const response = await usersAPI.registration(email,password)
            dispatch(setUser(response))
        }catch (e) {
            return {[FORM_ERROR]:e.response.data.message}
        }
    }
}

export const auth = () =>{
    return async dispatch=>{
        try{
            const response = await usersAPI.auth()
            dispatch(setUser(response))
            localStorage.setItem('token',response.token)
        }catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }
}

