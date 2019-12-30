import { SET_AUTHENTICATED_USER } from '../actionTypes'

const shared =  (state = {}, action) => {
    let returnvalue ;
        switch (action.type){
            case SET_AUTHENTICATED_USER: 
            returnvalue =  { 
                ...state,
                ...state.users,
                ...action.users,
                authenticatedUser: action.user,
            }
            return returnvalue;

            default :
                return state;
    }
}
export default shared;