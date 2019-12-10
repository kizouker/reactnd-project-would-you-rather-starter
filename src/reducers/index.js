import {combineReducers} from 'redux'

import shared from './shared.js'
import questions from './questions.js'
import users from './users.js'

const reducers = combineReducers({
    //users, 
    //questions,
    shared,
})

export default reducers;
