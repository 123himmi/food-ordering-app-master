import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Detail from './screens/details/Detail';
import Checkout from './screens/checkout/Checkout';
import history from './history';

export default class Controller extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Detail} />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </Router>
        )
    }
}