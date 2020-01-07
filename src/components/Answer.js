import React from 'react';
import { connect } from 'react-redux';
import { updateQuestion } from '../actions/questions'

class Answer extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }
  componentDidMount() {
    const { question } = this.props.location.state; 
  }

handleVote = ( e) => {
  let option = e.target.name;
  let oppositOption;

  if (option === "optionOne"){
    oppositOption = "optionTwo";
  } else{
    oppositOption ="optionOne"
  }

  let id = e.target.value;
  let user = this.props.authenticatedUser;
  let questions = this.props.questions;

  if (!isEmpty(id) && !isEmpty(option) && !isEmpty(user)) {
    let question = questions[id];
    let _option = question[option];
    let _v = _option.votes;

    let _oppositOption = question[oppositOption];
    let _v_o = _oppositOption.votes;

    if (!(_v.includes(user)) && !(_v_o.includes(user))){
      _v.push(user);
      question[option].votes = _v;
      this.props.dispatch(updateQuestion(id, question))

    } else{
      alert("You already voted for this option");
    }
     
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
                          </td>
                        <td>   ...   or   ...   </td>
                        <td>{question.optionTwo.text}  
                          <button name="optionTwo" value={question.id}
                              onClick={ (e) => this.handleVote(e)}> Vote 
                            </button> 
                            Votes: {question.optionTwo.votes.length}             
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


