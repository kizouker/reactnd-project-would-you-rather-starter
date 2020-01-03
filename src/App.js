import React from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { handleInitialQuestionsData } from './actions/questions.js'
import { handleInitialUserData } from './actions/users.js'
import { handleInitialData } from './actions/shared.js'

import Menu from './components/Menu.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      unAnswered : true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount(){
    // this.props.dispatch(handleInitialQuestionsData());
    // this.props.dispatch(handleInitialUserData());

    this.props.dispatch(handleInitialData());
    
  }

  handleToggle = () => {
    this.setState( state => ({  unAnswered : !state.unAnswered,
    }));
  }

  render (){
    // console.log(this.props.questions)
    let users = this.props.users;
    if (!isEmpty(users)){
      // console.log("user is not empty");
      console.log(users);
    }else{
      // console.log("user is empty");
    }
    
    const { unAnswered } = this.state;
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
              <button id="switchState" name="switchState" onClick={this.handleToggle}>
                {  unAnswered && (<div>
                                    <h3> unAnswered </h3>            
                                    <List questions={this.props.unAnsweredQuestions}> </List>
                                  </div>)
                } 
                { !unAnswered && (<div>
                                    <h3> Answered </h3>
                                    <List questions={this.props.answeredQuestions}></List>
                                  </div>)
                }
              </button>
              {//** change text above "unAnswered" >-> "answered"  do a filter
              <div className="unAnswered">
                </div>
              }
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

var filterUnansweredQuestions = (questions, users, user)  => {
  // console.log("inside filterUnAnsweredQuestions")
  var questionsArray = Object.values(questions);

  let result, result2 = [];
  let returnValue = [];

  if (questionsArray !== undefined && users !== undefined){
    result2 = answersForUser(users, user);
  }

  result = Object.keys(result2);
  questionsArray.map(q => {
    if (result.includes(q.id)){
      returnValue.push(q);
    }
    return returnValue;
  }
 )
  return returnValue;
}

var answersForUser = (users, user) => {
  let result = users[user].answers;

  return result;
}

var filterAnsweredQuestions = (questions, users, user )  => {
  var questionsArray = Object.values(questions);

  let result = [];
    questionsArray.map( q => {
                         let resultArray = Object.values(answersForUser(users, user));
    if(!resultArray.includes(q)){
      result.push(q);
    }    
      return result;
    })
}

function isEmptyObj(obj){
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  || isEmptyObj(val)) ? true : false;
}

const mapStateToProps = ( state ) => {
 console.log("inside map state to props App, state: ", state)
   //inside mapStateToProps
              let unansweredQuestions = null; // null, [] or {}, depending on your approaches
              let answeredQuestions = null;

              if (state && !isEmpty(state.questions)  && !isEmpty(state.users) &&  !isEmpty(state.authenticatedUser.authenticatedUser)) {
                  console.log("State questions are filled: ", state.questions, state.users, state.authenticatedUser.authenticatedUser);
                  unansweredQuestions = filterUnansweredQuestions(state.questions, state.users, state.authenticatedUser.authenticatedUser);
                  answeredQuestions = filterAnsweredQuestions(state.questions, state.users, state.authenticatedUser.authenticatedUser);
                  return {
                    users : state.users,
                    questions: state.questions,
                    unAnsweredQuestions: unansweredQuestions,
                    answeredQuestions: answeredQuestions,
                    authenticatedUser : state.authenticatedUser.authenticatedUser
                  }
                } else 
                  return {
                    users : state.users,
                    questions: state.questions,
                    authenticatedUser : state.authenticatedUser.authenticatedUser
                  }
  }
          
// the idea is to prepare the component with the data it needs
// ie filter the questions _before_ it is initialised
// but the problem arises since I want to pass _state_ to filter
// but it says filter is undefined

export default connect(mapStateToProps) (App);