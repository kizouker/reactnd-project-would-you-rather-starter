import React from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.css';
import {connect} from 'react-redux';
import {handleInitialQuestionsData} from './actions/questions.js'
import {handleInitialUserData} from './actions/users.js'
import Menu from './components/Menu.js'
import { findDOMNode } from 'react-dom';

/**
 * Bound action creator
 */
// const boundPostQuestion = text => this.props.store.dispatch(postQuestion(text));

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      unAnswered : true
    };
    this.handleToggle = this.handleToggle.bind(this);
    console.log(this.props.store);
  }

  componentWillMount(){
    //log the props to see the dispatch method/function
   this.props.dispatch(handleInitialQuestionsData());
   this.props.dispatch(handleInitialUserData());
  }

  handleToggle = () => {
    this.setState( state => ({  unAnswered : !state.unAnswered,
    }));
  }

  render (){
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
                { unAnswered && (<div>
                                    <h3> unAnswered </h3>            
                                    {console.log(this.props)}
                                    <List questions={this.props.unAnsweredQuestions}> </List>
                                  </div>) 
                } 
                { !unAnswered && (<div>
                                    <h3> Answered </h3>
                                    {console.log(this.props)} 
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

// check if answers is empty or not
//check in the users array // 
// for all users, check if id 8xf0y6ziyjabvozdd253nd exist in answers
// return true or false


//using es6 fn
// var filterUnansweredQuestions = (questions, users)  => {
//   var questionsArray = Object.values(questions);
//   //var usersArray = Object.values(users);
//   // problem state is not passed to the function it is not bound
//   //inside the comp you use bind - but outside what to use?
//   console.log("inside filterUnAnsweredQuestions")
//   if (questionsArray !== undefined && users !== undefined){
//   let user = 'sarahedo';
//   let result= [];
//      questionsArray.map( q => {
//       let element = answersForUser(users, user).find( qid => {
//                                                 return qid !== q.id;
//                                         }); 
//       console.log(element)
//       result.push(element);
//       }) 
//       console.log("result")
//       console.log(result)
//     return result;
//   }
// }

var filterUnansweredQuestions = (questions, users)  => {
  var questionsArray = Object.values(questions);
  //var usersArray = Object.values(users);
  // problem state is not passed to the function it is not bound
  //inside the comp you use bind - but outside what to use?
  console.log("inside filterUnAnsweredQuestions")
  let user = 'sarahedo';
  let result, result2 = [];
  let returnValue = [];

  if (questionsArray !== undefined && users !== undefined){
    result2 = answersForUser(users, user);
  }

  result = Object.keys(result2);
  console.log("Resulöt")
  console.log(result)

  questionsArray.map(q => {

    if (result.includes(q.id)){
      returnValue.push(q);
    }
  })

  console.log("result")
  console.log(returnValue)
return returnValue;

}

  var answersForUser = (users, user) => {
    console.log("answersForUser");
    console.log(users);
    let result = users[user].answers;

    return result;
  }

var filterAnsweredQuestions = (questions, users )  => {
  var questionsArray = Object.values(questions);
  console.log("filterAnsweredQuestions");
  let user = 'sarahedo';

  console.log(users);
  console.log(questionsArray);
 
  let result = [];
    questionsArray.map( q => {
      let resultArray = Object.values(answersForUser(users, user));
    if(!resultArray.includes(q)){
      result.push(q);
    }
      console.log("result")
      console.log(result)
      
      return result;
    })
  }

function isInArray(element1, element2){
if (element1 === element2){
  return true;
} else {
  return false;
}
}
function isEmptyObj(obj){
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
function isEmpty(val){
  return (isEmptyObj(val) || val === undefined || val == null || val.length <= 0  ) ? true : false;
}
const mapStateToProps = ( state ) => {
 console.log("inside map state to props App, state: ", state)
   //inside mapStateToProps
              let unansweredQuestions = null; // null, [] or {}, depending on your approaches
              let answeredQuestions = null;

              if (state && !isEmpty(state.questions)  && !isEmpty(state.users) ) {
                  console.log("State questions are filled: ", state.questions, state.users);
                  unansweredQuestions = filterUnansweredQuestions(state.questions, state.users);
                  answeredQuestions = filterAnsweredQuestions(state.questions, state.users);
                  return {
                    users : state.users,
                    questions: state.questions,
                    unAnsweredQuestions: unansweredQuestions,
                    answeredQuestions: answeredQuestions
                  }
              } else 
                  return {
                    users : state.users,
                    questions: state.questions,
                  }
  }
          
        // answeredQuestions: state.questions && state.users && ((state) => filterAnsweredQuestions(state)) (/*TODO: Filter here by answered)*/)
            

// the idea is to prepare the component with the data it needs
// ie filter the questions _before_ it is initialised
// but the problem arises since I want to pass _state_ to filter
// but it says filter is undefined


//export default connect(mapStateToProps()) (App); wrong - for some reason we are not calling the
//mapstatetoprops. we are passing it as an argument to connect

export default connect(mapStateToProps) (App);

{/**
 * const mapStateToProps = ( state ) => {
 console.log("inside map state to props App, state: ", state)
    return {
      users : state.users,
      questions: state.questions,
      unAnsweredQuestions: ((state ) => {

        console.log(state.users);
        console.log(state.questions);

                  //inside mapStateToProps
              let unansweredQuestions = null; // null, [] or {}, depending on your approaches
              if (state && state.questions && state.users) {
                  console.log("State questions are filled: ", state.questions, state.users);
                  unansweredQuestions = filterUnansweredQuestions(state.questions, state.users);
              }
              return {
                unansweredQuestions
              
              }
            })
          }
           **/   

        // answeredQuestions: state.questions && state.users && ((state) => filterAnsweredQuestions(state)) (/*TODO: Filter here by answered)*/)
              
} 