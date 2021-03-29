import React, {useEffect} from 'react'
import Navbar from "../navbar/Navbar";
import {Route, Switch} from "react-router-dom";
import Registration from "../registration/Registration";
import "./app.scss"
import Login from "../login/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../reducers/userReducer";
function App() {
    const isAuth = useSelector((state => state.user.isAuth))
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(auth())
    },[])
  return (
      <div className="app">
          <Navbar/>
          <div className='container'>
              <main className="app__content">
                  {!isAuth &&
                  <Switch>
                      <Route path='/registration' component={Registration}/>
                      <Route path='/login' component={Login}/>
                  </Switch>
                  }

              </main>
          </div>


      </div>
  );
}

export default App;
