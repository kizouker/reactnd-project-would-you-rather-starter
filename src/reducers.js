/**
 * Reducers...
 * @param {*} state 
 * @param {*} action 
 */
export default  function reducer(state=[], action){
    switch(action.type) {
      case 'ACTION_POST_QUESTION' : 
        console.log("reducer: post question");
        return ;
      default:
        return state;
    }   
  }