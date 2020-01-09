import React from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared.js'
import Menu from './components/Menu.js'
import Categories from './components/Categories.js'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    return(
    <div>
        <Menu></Menu>
       
      </div>);
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