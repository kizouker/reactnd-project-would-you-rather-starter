import React from 'react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../actions/shared'
import { isEmpty } from './Shared'
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

class Answer extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
  
    this.state = {
      optionOne : false,
      optionTwo : false
    }
  }

  // componentDidMount() {
  //   const { question } = this.props.location.state; 
  // }
    /** 
      four cases
      if user already exists in A , but clicked on b, then add user to B ( and remove from A)
      if user already exists in B, but clicked on am then add user to A (and remove from B)

     if user already exists in A, but clicked on a, then do nothing
     if user already exists in B, but clicked on b, then do nothing
    */
handleVote = ( e ) => {
  let authenticatedUser = this.props.authenticatedUser;
  let questions = this.props.questions;
  let option = e.target.name;
  let optionOneVotes, optionTwoVotes;

    // what option is chosen?
  if (option === "optionOne"){
    this.setState({optionOne : true, optionTwo : false});
  } else if (option === 'optionTwo'){
    this.setState({optionOne : false, optionTwo : true});
  }
  // get the id of the question
  let id = e.target.value;

  if (!isEmpty(id) && !isEmpty(option) && !isEmpty(authenticatedUser)) {
    optionOneVotes = questions[id]['optionOne'].votes;
    optionTwoVotes = questions[id]['optionTwo'].votes;
    
    let question = questions[id];

    if (!(optionOneVotes.includes(authenticatedUser)) && !(optionTwoVotes.includes(authenticatedUser))){
      let optionVotes = questions[id][option].votes;

      optionVotes.push(authenticatedUser);
      question[option].votes = optionVotes;

      let answer = option;
      this.props.dispatch(saveQuestionAnswer(question, authenticatedUser, answer));
    }

    if ((optionOneVotes.includes(authenticatedUser)) && !(optionTwoVotes.includes(authenticatedUser)) 
          && option === "optionTwo"){
      optionOneVotes.pop(authenticatedUser);
      optionTwoVotes.push(authenticatedUser);
      
      question["optionOne"].votes = optionOneVotes;
      question["optionTwo"].votes = optionTwoVotes;

      let answer = "optionTwo";

      this.props.dispatch(saveQuestionAnswer(question, authenticatedUser, answer));
    } else if(optionTwoVotes.includes(authenticatedUser) && !(optionOneVotes.includes(authenticatedUser)) 
        && option === "optionOne"){
      optionOneVotes.push(authenticatedUser);
      optionTwoVotes.pop(authenticatedUser);

      question["optionTwo"].votes = optionTwoVotes;
      question["optionOne"].votes = optionOneVotes;
      let answer = "optionOne";
      this.props.dispatch(saveQuestionAnswer(question, authenticatedUser, answer));
    }
  }
}

render (){
  const { questions, history, users } = this.props;
  // let location = this.props.location;
  let locationState = this.props.location.state;
  // const { question }  = this.props.location.state;
  let location = history.location;

  let question;
  console.log ("questions", questions);

  if ( locationState ){
    question = locationState.question;
    console.log("question from location", question);
  } else {
    console.log("Location history ", location);
    console.log("state from history ", location.state);
    
    if (isEmpty(location.state) || isEmpty(location.state.question)){
      let foo = location.pathname.split('/');
      let id = foo[2];
      console.log ("The question id is: ", id);
      let questionsArray = Object.values(questions);
      let question = questionsArray.find (q => q.id === id);

      console.log ("The question from history is: ", question);
      console.log ("The author sis ", question.author);
      console.log ("----------------------------------");
   
    } else {
      question = location.state.question;
      console.log("question from history", question);
    }
  }
 

  //   console.log ("The question from history is: ", question);
  //   console.log ("The author sis ", question.author);
  //   console.log ("----------------------------------");
  // }
  if (isEmpty(question)){
    console.log ("Question does not exist", question);
    console.log("=================");
    history.push('/nomatch');
  }

    return(<div className="Answer">
           <h2 className="component-title">Answer</h2>
            <table>
              <thead> 
                <tr>
                  <th>Would you rather...</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>... {question.author} ...
                    <img src={window.location.origin + users[question.author].avatarURL} 
                    width="10%" height="10%" alt="Avatar of the author." />
                    wonders if you, would you rather...
                  </td>
                  <td>{question.optionOne.text} 
                    <button name="optionOne" value={question.id}
                      onClick={ (e) => this.handleVote(e)}> Vote 
                    </button>
                  </td>
                  <td>
                    {this.state.optionOne && 
                    (<div> 
                        <b> Choosen </b>
                    </div>)}
                  </td>
                  <td>   ...   or   ...   </td>
                  <td>{question.optionTwo.text}  
                    <button name="optionTwo" value={question.id}
                        onClick={ (e) => this.handleVote(e)}> Vote 
                      </button> 
                  </td>
                  <td>
                    {this.state.optionTwo && 
                    (<div> 
                        <b> Choosen </b>
                    </div>)}           
                  </td> 
                </tr>                 
              </tbody>
            </table>
          </div>);
    }
 }
 const mapStateToProps = ( state ) => {
   return {
    questions : state.questions,
    authenticatedUser : state.authenticatedUser.authenticatedUser,
    users : state.users,
   }
}

export default withRouter(connect(mapStateToProps) (Answer));