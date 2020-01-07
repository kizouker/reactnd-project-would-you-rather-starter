import {ACTION_POST_QUESTION,  GET_INITIAL_QUESTIONS, ACTION_UPDATE_QUESTION } from '../actionTypes.js'

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
            
                //same as in _DATA.js...
            case ACTION_POST_QUESTION: 
                 returnvalue =  { 
                    ...state,
                    ...state.questions,
                    [action.question.id] : action.question,
                }
                return returnvalue;

            case ACTION_UPDATE_QUESTION: 
                returnvalue =  { 
                ...state,
                ...state.questions,
                [action.id] : action.question,
            }
           return returnvalue;
            default :
                return state;
    }
}

export default questions;