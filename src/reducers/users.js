import {ACTION_SET_USERS} from '../actionTypes'
import {GET_INITIAL_USERS} from '../actionTypes'

const users =  (state = {}, action) => {

    let returnvalue ;

        switch (action.type){
            case GET_INITIAL_USERS: 
            returnvalue =  { 
                ...state,
                ...state.users,
                ...action.users, 
            }
            return returnvalue;
            
            case ACTION_SET_USERS: 
            returnvalue =  { 
                    ...state,
                    ...state.users,
                    [action.users.id] : action.user,
                        
                }
                console.log ("in user reducer");
                console.log(returnvalue);
                console.log ("in user reducer");
                return returnvalue;
            default :
                return state;
    }
}

export default users;