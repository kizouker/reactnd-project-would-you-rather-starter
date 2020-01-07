import { GET_INITIAL_USERS, ACTION_UPDATE_USERS } from '../actionTypes'

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
                
                //TODO: should this be done here or in the _DATA savequestion ????
            case ACTION_UPDATE_USERS: 
                returnvalue =  { 
                    // ...state,
                    // ...state.users,
                    ...action.users, 
                }           
                return returnvalue;

            default :
                return state;
    }
}
export default users;