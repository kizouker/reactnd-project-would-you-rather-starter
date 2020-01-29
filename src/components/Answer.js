import React from 'react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../actions/shared'

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
  }
 // four cases
    /** if user already exists in A , but clicked on b, then add user to B ( and remove from A)
    if user already exists in B, but clicked on am then add user to A (and remove from B)

    if user already exists in A, but clicked on a, then do nothing
    if user already exists in B, but clicked on b, then do nothing
    */
handleVote = ( e ) => {
      let authUser = this.props.authenticatedUser;
      let questions = this.props.questions;
      let option = e.target.name;
      let optionOneVotes, optionTwoVotes;
      console.log("# of users", this.returnNoUsers());
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
    

      if (!isEmpty(id) && !isEmpty(option) && !isEmpty(authUser)) {
        optionOneVotes = questions[id]['optionOne'].votes;
        optionTwoVotes = questions[id]['optionTwo'].votes;
        
        let question = questions[id];

        if (!(optionOneVotes.includes(authUser)) && !(optionTwoVotes.includes(authUser))){
          let optionVotes = questions[id][option].votes;

          optionVotes.push(authUser);
          question[option].votes = optionVotes;

          let answer = option;
          this.props.dispatch(saveQuestionAnswer(question, authUser, answer));
        }

        if ((optionOneVotes.includes(authUser)) && !(optionTwoVotes.includes(authUser)) 
              && option === "optionTwo"){
          optionOneVotes.pop(authUser);
          optionTwoVotes.push(authUser);
          
          question["optionOne"].votes = optionOneVotes;
          question["optionTwo"].votes = optionTwoVotes;

          let answer = "optionTwo";

          this.props.dispatch(saveQuestionAnswer(question, authUser, answer));
        } else if(optionTwoVotes.includes(authUser) && !(optionOneVotes.includes(authUser)) 
            && option === "optionOne"){
          optionOneVotes.push(authUser);
          optionTwoVotes.pop(authUser);

          question["optionTwo"].votes = optionTwoVotes;
          question["optionOne"].votes = optionOneVotes;

          let answer = "optionOne";

          this.props.dispatch(saveQuestionAnswer(question, authUser, answer));
        }
    }
}

render (){
  const { users } = this.props; 
  const { question }  = this.props.location.state;

    return(<div className="Answer">
           ß<h2 className="component-title">Answer</h2>
            <table>
              <thead> 
                <tr>
                  <th>Would you rather...</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>... {question.author} ...
                    <img src={window.location.origin + users[question.author].avatarURL} width="10%" height="10%"/>
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
                    {!this.state.optionOne && 
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

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

export default connect(mapStateToProps) (Answer);