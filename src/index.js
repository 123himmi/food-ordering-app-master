import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Detail from './screens/details/Detail';
import Checkout from './screens/checkout/Checkout';

ReactDOM.render(
    <Checkout />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();