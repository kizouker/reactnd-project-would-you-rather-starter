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
             //   console.log("inside user reducer", state);
              
                return returnvalue;

            default :
                return state;
    }
}
export default users;