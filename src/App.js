import React from 'react';
import logo from './logo.svg';
import './App.css';

import Answer from './Answer';
import LeaderBoard from './LeaderBoard';
import List from './List';
import Statistics from './Statistics';
import Post from './Post';
import User from './User';
import NotFound from './NotFound';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import {postQuestion, updateStatistics, updateList, updateLeaderboard} from './actions';
import {connect} from 'react-redux';

//import this.props.store from './this.props.store.js';

import {ACTION_POST_QUESTION,ACTION_UPDATE_STATISTICS,
  ACTION_UPDATE_LIST, ACTION_UPDATE_LEADERBOARD} from "./actionTypes.js";

import reducer from './reducers';
import { GET_INITIAL_QUESTIONS } from './actions/questions';

/**
 * Redux this.props.this.props.store
 */
// const this.props.store = createthis.props.store(reducer, ['use redux']);

/**
 * Bound action creator
 */
// const boundPostQuestion = text => this.props.store.dispatch(postQuestion(text));
// const boundUpdateStatistics = text => this.props.store.dispatch(updateStatistics(text));
// const boundUpdateList = text => this.props.store.dispatch(updateList(text));
// const boundUpdateLeaderboard = text => this.props.store.dispatch(updateLeaderboard(text));

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
class App extends React.Component{
  // boundPostQuestion('hej');
  // boundUpdateStatistics('hej');
  // boundUpdateList('hej');
  // boundUpdateLeaderboard('hej');
    constructor(props){
      super(props)
      this.state = this.props.store.getState();

    }

  componentDidMount(){
      this.store.dispatch(GET_INITIAL_QUESTIONS);
  }

 
  render (){

   
  return (
    <div className="App">
      <header className="App-header">
        <p>Would you rather...</p>
      </header>
  
      <Router>
          <div className="menu">
            <nav>
            <table>
              <tr>
                <td>
                  <Link to="/list">| List Questions |</Link> 
                </td>
                <td>
                  <Link to="/leaderboard">| LeaderBoard |</Link> 
                </td>
                <td>
                  <Link to="/post">| Post new Question |</Link> 
                </td>
                <td>
                  <Link to="/answer">| Answer Questions |</Link>
                </td>
                <td>
                  <Link to="/user">| User Settings |</Link>
                </td>
                <td>
                  <Link to="/statistics">| Statistics |</Link> 
                </td>
              </tr>
            </table>
            </nav>
            <hr/>
         <Switch>      
            <Route exact path="/list" component={List} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/post" component={Post}/>
            <Route path="/answer" component={Answer} />
            <Route path="/user" component={User} />
        </Switch>
            
          </div>
          </Router>
    </div>
  );
  }
}

const mapStateToProps = ({state}) => ({
  question: state.questions
})

export default connect(mapStateToProps()(App));


