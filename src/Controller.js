import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Detail from './screens/details/Detail';
import Checkout from './screens/checkout/Checkout';
import history from './history';

export default class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://localhost:8081/api/";
      }

      render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact render={(props) => <Detail {...props} baseUrl={this.baseUrl} />} />
                    <Route path="/checkout" render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
                </Switch>
            </Router>
        )
    }
}