import {SET_AUTHENTICATED_USER, GET_AUTHENTICATED_USER } from '../actionTypes'

export function setAuthenticatedUser(user){
    return {    
            type: SET_AUTHENTICATED_USER,
            user
        }
}   

export function getAuthenticatedUser(user){
    return {    
            type: GET_AUTHENTICATED_USER,
            user
        }
}   