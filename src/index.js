import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux'
import reducers from './reducers/index.js'
import {Provider} from 'react-redux'

const store = createStore(reducers, ['Use Redux'])

console.log("stre")


console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
