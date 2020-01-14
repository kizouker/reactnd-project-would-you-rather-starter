import { GET_INITIAL_USERS, ACTION_UPDATE_QUESTION_USERS,
    ACTION_POST_UPDATE_ANSWERS_USERS } from '../actionTypes'

const users = (state = {}, action) => {
    let returnvalue, authUser, userss, qid, questions, user
    let answer;

        switch (action.type){
            case GET_INITIAL_USERS: 
                returnvalue =  { 
                    ...state,
                    ...state.users,
                    ...action.users, 
                }           
                return returnvalue;
                
                //TODO: should this be done here or in the _DATA savequestion ????
            case ACTION_UPDATE_QUESTION_USERS:   
                authUser = action.authUser //TODO - wrong
                //  slet authedUser = state.authedUser;
               // state = users
                qid = action.formattedQuestion.id;
                userss = state;
                user = userss[authUser];
                questions = user.questions;

                console.log("state in users reducer", state);
                returnvalue = {
                    ...userss, // spread from the state
                    [authUser]: {
                      ...userss[authUser],
                      questions: questions.concat(qid)
                    }
                }
                return returnvalue;

            case ACTION_POST_UPDATE_ANSWERS_USERS:
                userss = state;
                qid = action.question.id;
                authUser = action.authUser;
                answer = action.answer;

                returnvalue = {
                    ...userss,
                    [authUser]: {
                        ...userss[authUser],
                        answers: {
                        ...userss[authUser].answers,
                        [qid]: answer
                        }
                    }
                }
                return returnvalue;
            default :
                return state;
    }
}
export default users;

