import { combineReducers } from 'redux'
import questions from './questions.js'
import users from './users.js'
import authenticatedUser from './authedUser.js'

const reducers = combineReducers({
    users, 
    questions,
    authenticatedUser,
})

export default reducers;
