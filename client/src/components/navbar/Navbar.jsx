import React from 'react';
import './navbar.scss';
import logo from '../../assets/icons/SOLO_CLOUD.svg';
import userImage from '../../assets/icons/user.svg';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/userReducer';
import {API_URL} from '../../utills/config';
const Navbar = () => {
  const isAuth = useSelector(((state) => state.user.isAuth));
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userAvatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : userImage;
  return (
    <div className='header'>
      <div className='container'>
        <header>
          <div className="header__logo">
            <NavLink to='/'>
              <img src={logo} alt="logo"/>
            </NavLink>
          </div>
          <div className='header__profile'>
            {!isAuth && <NavLink to="/registration">Sign Up</NavLink>}
            {!isAuth && <NavLink to="/login">Sign In</NavLink>}
            {isAuth &&
              <div className='header__account'>
                <span onClick={()=>dispatch(logout())} >Log out</span>
                <div className='account__actions'>
                  <img src={userAvatar} alt="avatar"/>
                  <NavLink to="/settings">Change photo</NavLink>
                </div>
              </div>}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
