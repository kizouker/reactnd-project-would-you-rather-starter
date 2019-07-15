import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux';
import Answer from 'Answer';

/**
 * Redux Store
 */
const store = createStore(questionsR, ['use redux']);

store.dispatch({
  type : 'ACTION_',
  text : 'Read the docs'
})

function questionsR(state=[], action){
  switch(action.type) {
    case 'ACTION_' : 
      return ;
    default:
      return state;

  }   
}

/**
 * Action types
 */
export const ACTION_POST_QUESTION = 'POST_QUESTION';
export const ACTION_UPDATE_STATISTICS = 'UPDATE_STATISTICS';
export const ACTION_UPDATE_LIST = 'UPDATE_LIST';
export const ACTION_UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD';

/**
 * Action creators
 */
export function postQuestion(text) {
  return { type: ACTION_POST_QUESTION, text }
}

export function updateStatistics(text) {
  return { type: ACTION_UPDATE_STATISTICS, text }
}

export function updateList(text) {
  return { type: ACTION_UPDATE_LIST, text }
}

export function updateLeaderboard(text) {
  return { type: ACTION_UPDATE_LEADERBOARD, text }
}

/**
 * Bound action creator
 */

const boundPostQuestion = text => store.dispatch(postQuestion(text));
const boundUpdateStatistics = text => store.dispatch(updateStatistics(text));
const boundUpdateList = text => store.dispatch(updateList(text));
const boundUpdateLeaderboard = text => store.dispatch(updateLeaderboard(text));

questions = [];
users = [] ;

let question = {
    id : '',
    author : '',
    timestamp: '',
    optionOne: '',
    optionTwo: ''
}

let user = {
  id : '',
  name : '',
  avatarURL: '',
  questions: [],
  answers: {id: '', value : ''}
}
/**
 * 
 * 
Answer V
User V
Post V
List V
Statistics V
LeaderBoard V
 */


function App() {
  boundPostQuestion('hej');
  boundUpdateStatistics('hej');
  boundUpdateList('hej');
  boundUpdateLeaderboard('hej');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


