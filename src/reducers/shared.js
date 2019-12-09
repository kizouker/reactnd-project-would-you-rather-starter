import {GET_INITIAL_QUESTIONS} from './actions/questions.js';
import {_getQuestions } from '../_DATA.JS';

export const shared =  (state = null, action) => {
        switch (action.type){
            case GET_INITIAL_QUESTIONS: 

            let questions = _getQuestions();
            console.log(questions);
                return {
                    questions
                }
            default :
                return state;
        
    }
}
