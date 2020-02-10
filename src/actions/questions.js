
import { ACTION_POST_QUESTION, GET_INITIAL_QUESTIONS, 
    ACTION_UPDATE_QUESTION, ACTION_POST_UPDATE_ANSWERS_QUESTIONS } from '../actionTypes'

export function receiveQuestions(questions){
    return {    
            type: GET_INITIAL_QUESTIONS,
            questions
        }
}

export function postQuestion(question) {
    return { 
            type: ACTION_POST_QUESTION, 
            question 
        }
  }

export function updateQuestion(id, question) {
    return { 
            type: ACTION_UPDATE_QUESTION, 
            id,
            question 
        }
}
export function updateAnswersQuestion(question, id) {
    return { 
            type: ACTION_POST_UPDATE_ANSWERS_QUESTIONS, 
            question,  
            id
        }
}