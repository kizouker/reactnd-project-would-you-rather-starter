import React from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.css';
import {connect} from 'react-redux';
import {handleInitialData} from './actions/questions.js'
import Menu from './components/Menu.js'

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
   this.props.dispatch(handleInitialData());
  }

  handleToggle = () => {
    console.log("Toggle")
    //  let currentState = this.state.like;
    this.setState( state => ({  unAnswered : !state.unAnswered,
    }));

    // let className = this.state.like ? 'classLike' : 'classNotLike';
    console.log("Toggle: " + this.state.unAnswered);
  }

  render (){
    const { unAnswered } = this.state;
    console.log(" i render");
    console.log(this.props.store);
    console.log();
    console.log(" i render");
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
                                  
                                    {console.log(this.props.store)}
                                    <List questions={this.props.unAnsweredQuestions}> </List>
                                  </div>) 
                } 
                { !unAnswered && (<div>
                                    <h3> Answered </h3>
                                    {console.log(this.props.store)}
                                    <List questions={this.props.AnsweredQuestions}></List>
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
var filterUnAnsweredQuestions = (state)  => {
  console.log("inside filterUnAnsweredQuestions")
  console.log(state);

  console.log("inside filterUnAnsweredQuestions")
if (state !== undefined){
  let users = state.users;
  let questions = state.questions;

  if (users!== undefined && questions !== undefined){

  console.log("filterUnAnsweredQuestions");

  console.log("inside filterUnAnsweredQuestions")
  console.log(users);
  console.log(questions);
  console.log("inside filterUnAnsweredQuestions")

  let user = 'sarahedo';
  
  questions.map( q => {
   return answersForUser(users, user).find(q.id); 
      })
  }}
}

var filterAnsweredQuestions = (users, questions)  => {
  console.log("filterAnsweredQuestions");
  let user = 'sarahedo';

  console.log("inside filterAnsweredQuestions")
  console.log(users);
  console.log(questions);
  console.log("inside filterAnsweredQuestions")
  
  let returnValue;

  returnValue = questions.map( q => {
    if(answersForUser(users, user).find(q.id)){
      returnValue.push(q.id);
    }
    return returnValue;
    })
  return returnValue;
}

var answersForUser = (users, user) => {
  return users[user].answers;
}

const mapStateToProps = ( state ) => {
 console.log("inside map state to props App, state: ", state)
  return {
      users : state.users,
      questions: state.questions,
      unAnsweredQuestions: ((state ) => filterUnAnsweredQuestions(state)) (/*TODO: Filter here by unanswered)*/),
     // answeredQuestions: state.questions && state.users && ((state) => filterAnsweredQuestions(state)) (/*TODO: Filter here by answered)*/)
    }
}
// the idea is to prepare the component with the data it needs
// ie filter the questions _before_ it is initialised
// but the problem arises since I want to pass _state_ to filter
// but it says filter is undefined


//export default connect(mapStateToProps()) (App); wrong - for some reason we are not calling the
//mapstatetoprops. we are passing it as an argument to connect

export default connect(mapStateToProps) (App);