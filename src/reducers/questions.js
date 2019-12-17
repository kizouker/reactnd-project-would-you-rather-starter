import {ACTION_POST_QUESTION} from '../actionTypes'

const questions =  (state = {}, action) => {
        switch (action.type){
            case ACTION_POST_QUESTION: 
                let returnvalue =  { 
                    ...state,
                    ...state.questions,
                    ['asdf'] : action.text,
                        
                }
                console.log ("in q reducer");
                console.log(returnvalue);
                console.log ("in q reducer");
                return returnvalue;
            default :
                return state;
    }
}

export default questions;