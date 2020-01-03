import { SET_AUTHENTICATED_USER } from '../actionTypes'
import { getInitialData } from '../_DATA.js';

import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthenticatedUser } from '../actions/authedUser'



export function handleInitialData () {
    return (dispatch) => {
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(questions))
        //   dispatch(setAuthedUser(AUTHED_ID))
        
        })
    }
  }