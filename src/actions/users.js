import { GET_INITIAL_USERS, ACTION_UPDATE_QUESTION_USERS,
    ACTION_POST_UPDATE_ANSWERS_USERS } from '../actionTypes'
    
export function receiveUsers(users){
    return {    
            type: GET_INITIAL_USERS,
            users
        }
}

export function updateQuestionsInUsers(formattedQuestion, authUser){
    return {    
            type: ACTION_UPDATE_QUESTION_USERS,
            formattedQuestion,
            authUser
        }
}

export function updateAnswersUsers(question, authUser, answer) {
    return { 
            type: ACTION_POST_UPDATE_ANSWERS_USERS, 
            question,
            authUser,
            answer
        }
}