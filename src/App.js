import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux';
import Answer from './Answer';
import LeaderBoard from './LeaderBoard';
import List from './List';
import Statistics from './Statistics';
import Post from './Post';
import User from './User';
import NotFound from './NotFound';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'



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

let questions = [];
let users = [] ;

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
        <p>
         Would you rather...
        </p>
       
      </header>

      
      <body>

      <Router>
          <div>
            <ul>
              <li>
                <Link to="/list">List</Link>
              </li>
              <li>
                <Link to="/statistics">Statistics</Link>
              </li>
              <li>
                <Link to="/leaderboard">LeaderBoard</Link>
              </li>
              <li>
                <Link to="/post">Post new Question</Link>
              </li>
              <li>
                <Link to="/answer">Answer Questions</Link>
              </li>
              <li>
                <Link to="/user">User Settings</Link>
              </li>
            </ul>
            <hr />
         <Switch>      
            <Route exact path="/list" component={List} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/post" component={Post} />
            <Route path="/answer" component={Answer} />
            <Route path="/user" component={User} />
        </Switch>
            
          </div>
          </Router>
        
      </body>
    </div>
  );
}

// <Answer> </Answer>
// <Post> </Post>
// <User> </User>

export default App;


