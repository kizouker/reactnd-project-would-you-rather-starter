import { GET_INITIAL_QUESTIONS } from '../actionTypes.js'
import { GET_INITIAL_USERS} from '../actionTypes.js'

const shared =  (state = {}, action) => {
    let returnvalue;
        switch (action.type){
            case GET_INITIAL_QUESTIONS: 
                returnvalue =  { 
                    ...state,
                    questions :  action.questions, 
                }
                return returnvalue;

            case GET_INITIAL_USERS: 
                returnvalue =  { 
                    ...state,
                    users :  action.users, 
                }
                return returnvalue;
            default :
                return state;
    }
}

export default shared;