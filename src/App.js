import React from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
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
    this.props.dispatch(handleInitialData());
  }

  handleToggle = () => {
    this.setState( state => ({  unAnswered : !state.unAnswered,
    }));
  }

  render (){
    console.log("unanswererd", this.props.unansweredQuestions);
    console.log("answererd", this.props.answeredQuestions);
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
             <h3 className="component-title">List of Questions</h3>
             <div className="grid-container"></div>
             <div className="grid-item">
              <button id="switchState" name="switchState" onClick={this.handleToggle}>
                Toggle
              </button>

              {  unAnswered && (<div>
                                    <h4> unAnswered </h4>            
                                    <List questions={this.props.unAnsweredQuestions}> </List>
                                  </div>)
                } 
                { !unAnswered && (<div>
                                    <h4> Answered </h4>
                                    <List questions={this.props.answeredQuestions}></List>
                                  </div>)
                }
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
var filterUnansweredQuestions = (questions, users, user)  => {
  
  let answersForUserArray = [];
  let returnValue = [];
  let questionsArray = [];

  if (!isEmpty(questions) && !isEmpty(users)){
    answersForUserArray = Object.keys(answersForUser(users, user));
    questionsArray = Object.values(questions);
    questionsArray.map(q => {
                            if (!answersForUserArray.includes(q.id)){
                              returnValue.push(q);
                            }
                          //return returnValue;
                        }
                      )
  return returnValue;

  } else {
    return [];
  }
}

var answersForUser = (users, user) => {
  let result = users[user].answers;
  return result;
}

var filterAnsweredQuestions = (questions, users, user )  => {
  let questionsArray = [];
  let answersForUserArray= [];

  if (!isEmpty(questions) && !isEmpty(users)){
      questionsArray = Object.values(questions);
      answersForUserArray= Object.values(answersForUser(users, user));
      let result = [];
      questionsArray.map( q => {
                            if(answersForUserArray.includes(q)){
                              result.push(q);
                            }    
                          return result;
      })
      return result;
      }else {
        return [];
      }
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