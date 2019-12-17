import React from 'react';
import './App.css';

//import Answer from './components/Answer';
//import LeaderBoard from './components/LeaderBoard';
import List from './components/List';
//import Statistics from './components/Statistics';
//import Post from './components/Post';
//import User from './components/User';
//import NotFound from './components/NotFound';
//import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
//import {postQuestion, updateStatistics, updateList, updateLeaderboard} from './actions';
import {connect} from 'react-redux';
import {handleInitialData} from './actions/questions.js'
import Menu from './components/Menu.js'

//import { GET_INITIAL_QUESTIONS } from './actions/questions';

/**
 * Bound action creator
 */
// const boundPostQuestion = text => this.props.store.dispatch(postQuestion(text));
// const boundUpdateStatistics = text => this.props.store.dispatch(updateStatistics(text));
// const boundUpdateList = text => this.props.store.dispatch(updateList(text));
// const boundUpdateLeaderboard = text => this.props.store.dispatch(updateLeaderboard(text));

class App extends React.Component{

    // constructor(props){
    //   super(props)
    // }

  componentWillMount(){
    //log the props to see the dispatch method/function
   this.props.dispatch(handleInitialData());
  }

  handleToggle = () => {
    console.log("Toggle")
  }
  render (){
    
  return (
    <div className="App">
      <header className="App-header">
        <p>Would you rather...</p>
      </header>
  
     <Menu></Menu>
          <div className="List">
             <h2 className="component-title">List of Questions</h2>
             <div className="grid-container"></div>
             <div className="grid-item">
                  <h3>UnAnswered questions</h3>  

              <button id="switchState" name="switchState" onClick={this.handleToggle}>
                switchState 
              </button>
              {//** change text above "unAnswered" >-> "answered"  do a filter
              }
              <div className="unAnswered">
                <List></List>
             </div>
            </div>
        </div>
    </div>
  );
  }
}
// {} descructering ...ecma6 - const {sd} = state
// const mapStateToProps = ( state ) => ({
//   questions: state.questions
// })

const mapStateToProps = ( state ) => {
  // console.log("inside map state to props, state: ", state)
  return {
    questions: state.questions
  }
}

//export default connect(mapStateToProps()) (App); wrong - for some reason we are not calling the
//mapstatetoprops. we are passing it as an argument to connect

export default connect(mapStateToProps) (App);


