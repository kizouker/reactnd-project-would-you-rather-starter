import {_getQuestions, _saveQuestionAnswer, _saveQuestion } from '../_DATA.js';

import { ACTION_POST_QUESTION, GET_INITIAL_QUESTIONS, 
    ACTION_UPDATE_QUESTION } from '../actionTypes'

import { updateUsers } from './users.js';

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
            .then ((response) => {
                dispatch(receiveQuestions(response));
        })
    }
}

// post a new poll question
export const saveQuestion = (question) => {
    return (dispatch) => {
        return _saveQuestion(question)
            //.then(res  => res)
            .then (([formattedQuestion, users]) => {
                console.log("formattedQuestion",formattedQuestion);
                dispatch(postQuestion(formattedQuestion));
                console.log("users",users);
                dispatch(updateUsers(users));
        })
    }
}

// answering a poll, voting
export const saveQuestionAnswer = () => {
    return (dispatch) => {
        return _saveQuestionAnswer()
            .then(res  => res)
            .then ((data) => {
                dispatch(updateQuestion(data));
        })
    }
}

    // _saveQuestion
    // _saveQuestionAnswer