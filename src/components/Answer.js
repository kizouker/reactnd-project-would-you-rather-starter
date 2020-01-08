import React from 'react';
import { connect } from 'react-redux';
import { updateQuestion } from '../actions/questions'

class Answer extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.state = {
      optionOne : 'true',
    }
  }
  componentDidMount() {
    const { question } = this.props.location.state; 

    // let user = this.props.authenticatedUser;
    // let questions2 = this.props.questions;

      //

  }

handleVote = ( e) => {
  let user = this.props.authenticatedUser;
  let questions2 = this.props.questions;

 
  // const {user, questions2} = this.props;
  let option = e.target.name;

  let optionOneVotes, optionTwoVotes;


  // let oppositOption;


  // what option is chosen?
  if (option === "optionOne"){
    // oppositOption = "optionTwo";
    this.setState({optionOne : true});
  } else{
    // oppositOption ="optionOne"
    this.setState({optionOne : false});
  }

  // get the id of the question
  let id = e.target.value;
  // let user = this.props.authenticatedUser;
  // let questions = this.props.questions;

  console.log("user in handleVote", user);
  console.log("question in handleVote", questions2);
  
  if (!isEmpty(id) && !isEmpty(option) && !isEmpty(user)) {

    optionOneVotes = questions2[id]["optionOne"].votes;
    optionTwoVotes = questions2[id]["optionTwo"].votes;

    let question = questions2[id];
    // let _option = question[option];
    // let _v = _option.votes;

    // let _oppositOption = question[oppositOption];
    // let _v_o = _oppositOption.votes;


    //   if (!(_v.includes(user)) && !(_v_o.includes(user))){
// four cases
/** if user already exists in A , but clicked on b, then add user to B ( and remove from A)
if user already exists in B, but clicked on am then add user to A (and remove from B)

if user already exists in A, but clicked on a, then do nothing
if user already exists in B, but clicked on b, then do nothing
 */
    // the user voted for one of the options
    if ((optionOneVotes.includes(user)) && !(optionTwoVotes.includes(user)) 
          && option === "optionTwo"){
      optionOneVotes.pop(user);
      optionTwoVotes.push(user);
      
      question["optionOne"].votes = optionOneVotes;
      question[option].votes = optionTwoVotes;
      this.props.dispatch(updateQuestion(id, question));

    } else if(optionTwoVotes.includes(user) && !(optionOneVotes.includes(user)) 
        && option === "optionOne"){
      optionOneVotes.push(user);
      optionTwoVotes.pop(user);

      question["optionTwo"].votes = optionTwoVotes;
      question[option].votes = optionOneVotes;
      this.props.dispatch(updateQuestion(id, question));
    }
    
    // _v.push(user);
    //   question[option].votes = _v;
     
      
    }
  }
  render (){
    const { users } = this.props; 
    const { question }  = this.props.location.state  
    return(<div className="Answer">
            <h2 className="component-title">Answer</h2>
              <table>
                <thead> 
                  <tr>
                    <th>Would you rather...</th> 
                  </tr>
                </thead>
                  <tbody >
                    <tr>
                      <td>... {question.author} ...
                        <img src={window.location.origin + users[question.author].avatarURL} width="10%" height="10%"/>
                        wonders if you, would you rather...
                        </td>
                        <td>{question.optionOne.text} 
                          <button name="optionOne" value={question.id}
                            onClick={ (e) => this.handleVote(e)}> Vote 
                          </button>
                          Votes: {question.optionOne.votes.length} 
                          {this.state.optionOne && (<div> 
                          <b> Choosen </b>
                        </div>)}
                        </td>
                       
                        <td>   ...   or   ...   </td>
                        <td>{question.optionTwo.text}  
                          <button name="optionTwo" value={question.id}
                              onClick={ (e) => this.handleVote(e)}> Vote 
                            </button> 
                            Votes: {question.optionTwo.votes.length}  
                            {!this.state.optionOne && (<div> 
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

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

export default connect(mapStateToProps) (Answer);


