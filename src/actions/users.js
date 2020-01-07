import {_getUsers } from '../_DATA.js';
import { GET_INITIAL_USERS, ACTION_UPDATE_USERS } from '../actionTypes'
//TODO: inout=?
export function receiveUsers(users){
    return {    
            type: GET_INITIAL_USERS,
            users
        }
}

export function updateUsers(users){
    return {    
            type: ACTION_UPDATE_USERS,
            users
        }
}

export const handleInitialUserData = () => {
    return (dispatch) => {
        return _getUsers()
            .then ((response) => {
                dispatch(receiveUsers(response));    
            })
        }
    }