import React from 'react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../actions/shared'
import { isEmpty } from './Shared'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

class UnAnsweredDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      optionOne : false,
      optionTwo : false
    }
    this.handleVote = this.handleVote.bind(this);
    this.returnNoUsers = this.returnNoUsers.bind(this);
    this.countNoVotesPerQuestion = this.countNoVotesPerQuestion.bind(this);
    this.percentagePerQuestion = this.percentagePerQuestion.bind(this);
  }
    /** 
      four cases
      if user already exists in A , but clicked on b, then add user to B ( and remove from A)
      if user already exists in B, but clicked on am then add user to A (and remove from B)

     if user already exists in A, but clicked on a, then do nothing
     if user already exists in B, but clicked on b, then do nothing
    */


returnNoUsers = () => {
  let usersArray = Object.values(this.props.users);

  if (!isEmpty(usersArray)){
    return usersArray.length;
  }else {
    return 0;
  }
}  
countNoVotesPerQuestion = ( id ) => {
  console.log(" id: ", id);
  let questions = this.props.questions;
  console.log("questions: ", questions);

  let element = questions[id];

  let optionOneVotes = element.optionOne.votes.length;  
  let optionTwoVotes = element.optionTwo.votes.length;

  console.log("votes", optionOneVotes, optionTwoVotes);

  return {
    id: element.id,
    optionOne : optionOneVotes, 
    optionTwo : optionTwoVotes
  };
}

percentagePerQuestion = ( id ) => {
  console.log(" id: ", id);
  let noOfUsers = this.returnNoUsers();
  let votes = this.countNoVotesPerQuestion( id );
  
  console.log("percentage", noOfUsers, votes)
  let statsPercent = {
        optionOne : Math.round((votes.optionOne/noOfUsers)*100),
        optionTwo : Math.round((votes.optionTwo/noOfUsers)*100) 
      };
 
  return statsPercent;
}

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
  // let qid;

  console.log(this.props);

  // If we just post the url and want info - we have to set
  // unanswered = false - since we don't use the <Link> and we don't
  // want to vote
  let unanswered;
  if(!(this.props.location.state && this.props.location.state.unanswered)){
    unanswered = false;
  } else {
    unanswered = this.props.location.state.unanswered;
  }
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
                  <td>{question.optionOne.votes.length} votes</td>
                </tr>
                <tr>
                  <td>
                    {/** this below is a fn definition - not a call 
                     * The (e) => whateverFunction(2) is a callback 
                     * definition to be used on onClickor onChange so no needed here
                    */}
                    {/* {( e )  => this.countNoVotesPerQuestion(e, question.id ).optionOne} */}
                    {this.percentagePerQuestion( question.id ).optionOne} %
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
                  <td><h5>{question.optionOne.text} </h5></td>
                </tr>
                <tr>
                  <td>{question.optionOne.votes.length} votes</td>
                </tr>
                <tr>
                  <td>
                    {this.percentagePerQuestion( question.id ).optionOne} %
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
</div>)}}
}

  const mapStateToProps = ( state ) => {
    return {
      questions : state.questions,
      authenticatedUser : state.authenticatedUser.authenticatedUser,
      users : state.users,
  }
}

export default withRouter(connect(mapStateToProps) (UnAnsweredDetails));