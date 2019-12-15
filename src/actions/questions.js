import {_getQuestions } from '../_DATA.js';

export const GET_INITIAL_QUESTIONS = 'GET_INITIAL_QUESTIONS'

export function receiveQuestions(questions){
    return {    
            type: GET_INITIAL_QUESTIONS,
            questions
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