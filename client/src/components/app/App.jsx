import React, {useEffect} from 'react'
import Navbar from "../navbar/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import {Registration} from "../registration/Registration";
import "./app.scss"
import {Login} from "../login/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../reducers/userReducer";
import Disk from "../disk/Disk";
import Preloader from "../common/Preloader/Preloader";
function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const isInit = useSelector(state =>state.user.isInit )
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(auth())
    },[])
    return isInit? (
            <div className="app">
                <Navbar/>
                <div className='container'>
                    <main className="app__content">
                        {!isAuth ?
                            <Switch>
                                <Route path='/registration' component={Registration}/>
                                <Route path='/login' component={Login}/>
                                <Redirect to="/login"/>
                            </Switch>
                            :
                            <Switch>
                                <Route exact path='/' component={Disk}/>
                                <Redirect exact to="/"/>
                            </Switch>
                        }

                    </main>
                </div>


            </div>
        )
        : <Preloader/>
}

export default App;
