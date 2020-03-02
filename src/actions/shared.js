import { getInitialData } from '../_DATA.js';
import { receiveUsers, updateAnswersUsers } from '../actions/users'
import { receiveQuestions, updateAnswersQuestion, postQuestion } from '../actions/questions'
import { setAuthenticatedUser } from '../actions/authedUser'
import { _saveQuestionAnswer, _saveQuestion } from '../_DATA.js';
import { updateQuestionsInUsers } from './users.js';

export function handleInitialData (authedUser) {
    return (dispatch) => {
      return getInitialData()
        .then(({ users, questions}) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(questions))
          dispatch(setAuthenticatedUser(authedUser))
        })
    }
  }
  
export const saveQuestion = (question, authUser) => {
  return (dispatch) => {
      return _saveQuestion(question)
          .then ((formattedQuestion) => {
              dispatch(postQuestion(formattedQuestion));;
              dispatch(updateQuestionsInUsers(formattedQuestion,authUser));
      })
  }
}

// answering a poll, voting
export const saveQuestionAnswer = (question, authUser, answer) => {
  return (dispatch) => {
      return _saveQuestionAnswer(authUser, question.id, answer ) 
          .then ((response) => {
              dispatch(updateAnswersQuestion(question, question.id));
              dispatch(updateAnswersUsers(question, authUser, answer));
      })
  }
}