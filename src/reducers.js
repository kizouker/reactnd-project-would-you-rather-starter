import postQuestion from './actions.js';
import {ACTION_POST_QUESTION, ACTION_UPDATE_STATISTICS, 
  ACTION_UPDATE_LIST, ACTION_UPDATE_LEADERBOARD} from './actionTypes'



/**
 * Reducers...
 * @param {*} state 
 * @param {*} action 
 */
export default  function reducer(state=[], action){
    switch(action.type) {
      case 'ACTION_POST_QUESTION' : 
        console.log("reducer: post question");
        
        return {
                
                question: state.text,

        };
      default:
        return state;
    }   
  }