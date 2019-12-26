import {ACTION_POST_QUESTION} from '../actionTypes'

import { GET_INITIAL_QUESTIONS } from '../actionTypes.js'

const questions =  (state = {}, action) => {
    let returnvalue;
        switch (action.type){
            case GET_INITIAL_QUESTIONS: 
                returnvalue =  { 
                    ...state,
                    ...state.questions,
                    ...action.questions, 
                }
                return returnvalue;

            case ACTION_POST_QUESTION: 
                 returnvalue =  { 
                    ...state,
                    ...state.questions,
                    [action.question.id] : action.question,
                }
                return returnvalue;
            default :
                return state;
    }
}

export default questions;