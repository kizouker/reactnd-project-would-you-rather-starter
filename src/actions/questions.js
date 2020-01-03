import {_getQuestions } from '../_DATA.js';
import { ACTION_POST_QUESTION, GET_INITIAL_QUESTIONS, 
    ACTION_UPDATE_QUESTION } from '../actionTypes'

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

export const handleInitialQuestionsData = () => {
    return (dispatch) => {
        return _getQuestions()
            .then(res  => res)
            .then ((data) => {
                dispatch(receiveQuestions(data));
            })
        }
    }