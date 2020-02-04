import { SET_AUTHENTICATED_USER, GET_AUTHENTICATED_USER } from '../actionTypes'

const authenticatedUser = (state = {}, action) => {
    let returnvalue ;
        switch (action.type){
            case SET_AUTHENTICATED_USER: 
               let authenticatedUser = action.user;

                returnvalue =  { 
                    ...state,
                    authenticatedUser
                }
            return returnvalue;
            case GET_AUTHENTICATED_USER: 
               authenticatedUser = action.user;

                returnvalue =  { 
                    ...state,
                    authenticatedUser
                }
         return returnvalue;
            default :
                return state;
    }
}
export default authenticatedUser;