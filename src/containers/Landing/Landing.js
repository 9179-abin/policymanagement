import React, { Component } from 'react';
import HomeView from '../../components/HomeView/HomeView';
import Aux from '../../hoc/Auxilary';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import DashBoard from '../DashBoard/DashBoard';

class Landing extends Component{
    state={
        request: 0,
        logedIn : false
    }



    render(){
        return(
            <Aux>
                <Switch>
                 <Route path="/" exact component={HomeView}/>
                 <Route path="/dashboard"  component={DashBoard} />
                 <Route path="/login" component={Login} />
                 <Route path="/register"  component={Register} />
                 <Redirect from="/home" to="/" />
                </Switch>
            </Aux>
        );
    }
}

export default Landing;