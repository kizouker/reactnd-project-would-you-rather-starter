import { combineReducers } from 'redux'
import shared from './shared.js'
import questions from './questions.js'
import users from './users.js'
import authenticatedUser from './authedUser.js'

const reducers = combineReducers({
    users, 
    questions,
    authenticatedUser,
    shared,
})

export default reducers;
