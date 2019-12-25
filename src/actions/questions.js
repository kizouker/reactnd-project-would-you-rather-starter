import {_getQuestions } from '../_DATA.js';
import { ACTION_POST_QUESTION, GET_INITIAL_QUESTIONS } from '../actionTypes'

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

export const handleInitialData = () => {
    return (dispatch) => {
        return _getQuestions()
            .then(res  => res)
            .then ((data) => {
                // let response = dispatch(receiveQuestions(data));
                // console.log("response" + response);
                // return response;

                dispatch(receiveQuestions(data));
            })
        }
    }

//new fn that calls the api and gets the initial questions
// aysnc middleware
// dispatch
// and then return the action above