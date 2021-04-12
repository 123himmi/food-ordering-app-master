import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from './screens/home/Home';
import Detail from './screens/details/Detail';
import Checkout from './screens/checkout/Checkout';
import history from './history';
import Profile from "./screens/profile/Profile";


export default class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
      }

      render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={props=> <Home {...props} baseUrl={this.baseUrl}/>} />
                    <Route path="/restaurant/:restaurantid" render={(props) => <Detail {...props} baseUrl={this.baseUrl} />} />
                    <Route path="/checkout" render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
                    <Route path="/profile" render={props=> <Profile {...props} baseUrl={this.baseUrl}/>}/>                    
                </Switch>
            </Router>
        )
    }
}