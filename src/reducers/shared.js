import {GET_INITIAL_QUESTIONS} from '../actions/questions.js';
import {_getQuestions } from '../_DATA.js';

const shared =  (state = null, action) => {
        switch (action.type){
            case GET_INITIAL_QUESTIONS: 

            let questions = _getQuestions();
            

            let returnvalue =  { 
                ...state,
                questions :  questions,
            }
            
            console.log(returnvalue);
                return returnvalue;
            default :
                return state;
        
    }
}

export default shared;
