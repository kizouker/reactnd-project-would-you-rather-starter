import {GET_INITIAL_QUESTIONS} from '../actions/questions.js';
import {_getQuestions } from '../_DATA.js';

const shared =  (state = null, action) => {
        switch (action.type){
            case GET_INITIAL_QUESTIONS: 

           // let questions = _getQuestions(); //shouldn't be called from the reducers (api) - 
            //do it in actions - 
            //dispatch
            

            let returnvalue =  { 
                ...state,
                questions :  questions, // this should come frome the actions
            }

            console.log(returnvalue);
                return returnvalue;
            default :
                return state;
        
    }
}

export default shared;
