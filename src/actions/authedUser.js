import { SET_AUTHENTICATED_USER } from '../actionTypes'

export function setAuthenticatedUser(user){
    return {    
            type: SET_AUTHENTICATED_USER,
            user
        }
}   