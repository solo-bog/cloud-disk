import {usersAPI} from '../api/userAgent';
import {FORM_ERROR} from 'final-form';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const TOGGLE_IS_INIT = 'TOGGLE_IS_INIT';

const defaultState = {
  currentUser: {},
  isAuth: false,
  isInit: false,
};

export const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        currentUser: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        currentUser: {},
      };
    case TOGGLE_IS_INIT:
      return {
        ...state,
        isInit: action.value,
      };


    default:
      return state;
  }
};

const setUser = (payload) =>({type: SET_USER, payload});
export const logout = () =>({type: LOG_OUT});
const toggleIsInit = (value) =>({type: TOGGLE_IS_INIT, value});


export const login = (email, password) =>{
  return async (dispatch) => {
    try {
      const response = await usersAPI.login(email, password);
      dispatch(setUser(response.user));
      localStorage.setItem('token', response.token);
    } catch (e) {
      return {[FORM_ERROR]: e.response.data.message};
    }
  };
};

export const registration = (email, password) =>{
  return async (dispatch) => {
    try {
      const response = await usersAPI.registration(email, password);
      dispatch(setUser(response.user));
      localStorage.setItem('token', response.token);
    } catch (e) {
      return {[FORM_ERROR]: e.response.data.message};
    }
  };
};

export const auth = () =>{
  return async (dispatch)=>{
    try {
      const response = await usersAPI.auth();
      dispatch(setUser(response.user));
      localStorage.setItem('token', response.token);
    } catch (e) {
      console.log(e);
      localStorage.removeItem('token');
    }
    dispatch(toggleIsInit(true));
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch)=>{
    try {
      const response = await usersAPI.uploadAvatar(file);
      dispatch(setUser(response));
    } catch (e) {
      console.log(e);
      alert(e.response.message);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch)=>{
    try {
      const response = await usersAPI.deleteAvatar();
      dispatch(setUser(response));
    } catch (e) {
      console.log(e);
      alert(e.response.message);
    }
  };
};

