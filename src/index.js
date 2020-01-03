import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers/index.js'
import {Provider} from 'react-redux'
import middleware from './middleware';

const store = createStore(reducers, middleware);
// console.log(store.getState())


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
