import React from 'react';
import {connect} from 'react-redux';
import { updateQuestion } from '../actions/questions'
  
class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data
  
constructor(props){
  super(props);
  this.state = {
    id : '',
    option : '',
  }
  this.handleVote = this.handleVote.bind(this);
}

handleVote = ( e) => {
  let option = e.target.name;
  let id = e.target.value;
  let user = this.props.authenticatedUser.authenticatedUser;
  let questions = this.props.questions;

  if (!isEmpty(id) && !isEmpty(option) && !isEmpty(user)) {

    let question = questions[id];
    let _option = question[option];
    let _v = _option.votes;
    _v.push(user);

      question[option].votes = _v;
      console.log("newq");
    console.log(question);
      console.log("newq");
      console.log("id");
      console.log(id);


this.props.dispatch(updateQuestion(id, question))
      
    

    console.log("votes");
  
  //  this.setState({option : option});
    }
  }

//scope 2 -inside class 
  render (){
    //scope 3 -inside RE 
    console.log(this.props)
    let users = this.props.users;
    console.log(users);

    let questionsObj = this.props.questions;
    let questionsArray=[];

    if (questionsObj !== undefined && questionsObj !== null) {
      questionsArray = Object.values(questionsObj);
    }

    if (!isEmpty(users) && questionsArray !== null && questionsArray !== undefined  && questionsArray.length > 0
      ) { 
      return(<div>
              <table>
                <thead> 
                  <tr>
                    <th>Would you rather...</th> 
                  </tr>
                </thead>
                  {questionsArray.map ((el) => {

                    
                        return(
                          <tbody key={el.id}>
                              <tr>
                                <td>{el.optionOne.text} 
                                  <button name="optionOne" value={el.id}
                                    onClick={ (e) => this.handleVote(e)}> Vote 
                                  </button>
                                 Votes: {el.optionOne.votes.length} 
                                 <img src={window.location.origin + users[el.author].avatarURL} width="10%" height="10%"/>
                                </td>
                                <td>   ...   or   ...   </td>
                                <td>{el.optionTwo.text}  
                                  <button name="optionTwo" value={el.id}
                                      onClick={ (e) => this.handleVote(e)}> Vote 
                                    </button> 
                                    Votes: {el.optionTwo.votes.length} 
                                    <img src={window.location.origin + users[el.author].avatarURL} width="10%" height="10%"/>
                            
                                </td> 
                              </tr>
                                <tr>                         
                                <td></td>
                                </tr>     
                            </tbody>
                          )
                        }
                    )
                  }
                </table>
            </div>);
              } else{
                return null;
            }
          }
        }         
      
 
const mapStateToProps = ( state ) => {
  //  console.log("inside map state to props, state: ", state)
   return {
   
    
    questions : state.questions,
    authenticatedUser : state.authenticatedUser,
    users : state.users,
    //unAnsweredQuestions: unansweredQuestions,
   // answeredQuestions: answeredQuestions
   }
}


export default connect(mapStateToProps) (List);

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

