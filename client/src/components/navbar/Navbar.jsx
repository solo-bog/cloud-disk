import React from 'react';
import './navbar.scss';
import logo from '../../assets/icons/SOLO_CLOUD.svg';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/userReducer';
const Navbar = () => {
  const isAuth = useSelector(((state) => state.user.isAuth));
  const dispatch = useDispatch();
  return (
    <div className='header'>
      <div className='container'>
        <header>
          <div className="header__logo">
            <img src={logo} alt="logo"/>
          </div>
          <nav className='header__nav'>
            {!isAuth && <NavLink to="/registration">Sign Up</NavLink>}
            {!isAuth && <NavLink to="/login">Sign In</NavLink>}
            {isAuth && <span onClick={()=>dispatch(logout())} >Log out</span>}

          </nav>
        </header>
      </div>
    </div>

  );
};

export default Navbar;
