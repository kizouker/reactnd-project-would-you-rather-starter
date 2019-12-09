import {combineReducers} from 'redux'

import {shared} from './shared.js'
import {questions} from './questions.js'
import {users} from './users.js'

export const shared = combineReducers({
    users, 
    questions,
    shared,
})

