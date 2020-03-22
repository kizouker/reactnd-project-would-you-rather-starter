import React from 'react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../actions/shared'
import { isEmpty } from './Shared'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

class UnAnsweredDetails extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
  
    this.state = {
      optionOne : false,
      optionTwo : false
    }
  }
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
  const { questions, users} = this.props;
  // const { statsOption1, statsOption2 } = this.props.location.state;

  console.log(this.props);

  if (!this.props.location || !this.props.location.state){
    return <Redirect to={'/nomatch'} />; 
  }
  else {
 
  let unanswered = this.props.location.state.unanswered;
  let statsOption1 = this.props.location.state.statsOption1;
  let statsOption2 = this.props.location.state.statsOption2;



  
  console.log("--------------------------")
  // get the question id from the route
  const questionId = this.props.match.params.id;
  console.log("the question id is: ", questionId) ;
  let questionsArray = Object.values(questions);
  let question = questionsArray.find (q => q.id === questionId);

  if (!question){
  console.log ("The question from history is: ", question);
  console.log ("----------------------------------");
  return(<Redirect to={'/nomatch'}/>)
} else{
    console.log ("Question does not exist");
    console.log("=================");
  }
    return( <div className="Answer">
    <h2 className="component-title">Answer</h2>
     <table>
       <thead> 
         <tr>
           <th>Would you rather...</th> 
         </tr>
       </thead>
      { unanswered && (
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
            <td><h3>OR</h3></td>
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
        </tbody>)}

        { !unanswered && (
        <tbody>
          <tr>
            <td>... {question.author} ...
              <img src={window.location.origin + users[question.author].avatarURL} 
              width="10%" height="10%" alt="Avatar of the author." />
              wonders if you, would you rather...
            </td>
            <td>
            <table>
              <tbody>
                <tr>  
                  <td><h5>{question.optionOne.text} </h5></td>
                </tr>
                <tr>
                  <td>{statsOption1.number} votes</td>
                </tr>
                <tr>
                  <td>
                    {statsOption1.percentage} %
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
            <td>
              {this.state.optionOne && 
              (<div> 
                  <b> Choosen </b>
              </div>)}
            </td>
            <td><h3>OR</h3></td>
            <td>
            <table>
              <tbody>
                <tr>  
                    <td><h5>{question.optionTwo.text} </h5></td>
                </tr>
                <tr>
                    <td>{statsOption2.number} votes</td>
                </tr>
                <tr>
                  <td>
                    {statsOption2.percentage} %
                  </td>
                </tr>
                </tbody>
              </table>
              </td>
            <td>
              {this.state.optionTwo && 
              (<div> 
                  <b> Choosen </b>
              </div>)}           
            </td> 
        </tr>                 
      </tbody>)}
  </table>
</div>)};

}
}
  const mapStateToProps = ( state ) => {
    return {
    questions : state.questions,
    authenticatedUser : state.authenticatedUser.authenticatedUser,
    users : state.users,
  }
}

export default withRouter(connect(mapStateToProps) (UnAnsweredDetails));