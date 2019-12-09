import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducer from './reducers.js'
import {Provider} from 'react-redux'

const store = createStore(reducer, ['Use Redux'])


console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
