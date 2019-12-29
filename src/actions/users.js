import {_getUsers } from '../_DATA.js';
import { GET_INITIAL_USERS } from '../actionTypes'

export function receiveUsers(users){
    return {    
            type: GET_INITIAL_USERS,
            users
        }
}

export const handleInitialUserData = () => {
    return (dispatch) => {
        return _getUsers()
            .then(res  => res)
            .then ((data) => {
                dispatch(receiveUsers(data));    
            })
        }
    }

