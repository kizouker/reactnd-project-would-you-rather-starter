import { GET_INITIAL_QUESTIONS } from '../actions/questions.js';

const shared =  (state = {}, action) => {
        switch (action.type){
            case GET_INITIAL_QUESTIONS: 
                let returnvalue =  { 
                    ...state,
                    questions :  action.questions, 
                }
                return returnvalue;
            default :
                return state;
    }
}

export default shared;