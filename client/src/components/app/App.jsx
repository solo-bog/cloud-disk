import React, {Suspense, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Registration} from '../registration/Registration';
import './app.scss';
import {Login} from '../login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../../reducers/userReducer';
const Disk = React.lazy(() => import('../disk/Disk'));
import Preloader from '../common/Preloader/Preloader';
import Settings from '../settings/Settings';
const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isInit = useSelector((state) =>state.user.isInit );
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(auth());
  }, []);
  return isInit? (
            <div className="app">
              <Navbar/>
              <div className='container'>
                <main className="app__content">
                  {!isAuth ?
                    <Suspense fallback={<Preloader/>}>
                      <Switch>
                        <Route path='/registration' component={Registration}/>
                        <Route path='/login' component={Login}/>
                        <Redirect to="/login"/>
                      </Switch>
                    </Suspense> :
                    <Suspense fallback={<Preloader/>}>
                      <Switch>
                        <Route exact path='/' component={Disk}/>
                        <Route exact path='/settings' component={Settings}/>
                        <Redirect exact to="/"/>
                      </Switch>
                    </Suspense>
                  }

                </main>
              </div>


            </div>
        ) :
        <Preloader/>;
};

export default App;
