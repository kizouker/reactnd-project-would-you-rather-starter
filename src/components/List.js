import React from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Answer from './Answer';
import { Route, Link, BrowserRouter as Router, Switch } 
  from 'react-router-dom'

class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data
  
constructor(props){
  super(props);
  this.state = {
    id : '',
    option : '',
  }
}
//scope 2 -inside class 
  render (){
    const { unanswered } = this.props;
    let questionsObj = this.props.questions;
    
    if(!unanswered){
        questionsObj =this.props.answeredQuestions;
    } else {
        questionsObj =this.props.unAnsweredQuestions; 
    }

    console.log("Answered? :" + this.props.answered);
    console.log("questionsObj", questionsObj);

    //scope 3 -inside RE 
    let users = this.props.users;
    let questionsArray = [];

    if (!(isEmpty(questionsObj))) {
      questionsArray = Object.values(questionsObj);
    }
    if (!isEmpty(users) && !(isEmpty(questionsArray))) { 
      return(<div>
              <table>
                <thead> 
                  <tr>
                    <th>Would you rather...</th> 
                  </tr>
                </thead>
                  {questionsArray.map ((el) => {
                    return(<tbody key={el.id}>
                            <tr>
                             <td>... {el.author} ...
                                <img src={window.location.origin + users[el.author].avatarURL} 
                                  width="10%" height="10%"/>
                                wonders if you, would you rather...
                              </td>
                              <td>{el.optionOne.text}    
                                  Votes: {el.optionOne.votes.length} 
                              </td>
                              <td>   ...   or   ...   </td>
                              <td>{el.optionTwo.text}  
                              Votes: {el.optionTwo.votes.length}
                              </td>          
                              <td>
                                <Link to={{
                                  pathname : '/questions/' + el.id,   
                                  state: {
                                    question : el,
                                  }
                                  }}>| Answer Poll |
                                </Link>
                              </td>        
                            </tr>
                          </tbody>)
                        }
                    )
                  }
                </table>
            </div>)
        } else{
          return null;
      }
    }
}         

const mapStateToProps = ( state ) => {
  console.log("inside map state to props App, state: ", state)
  //inside mapStateToProps
  let unansweredQuestions = []; 
  let answeredQuestions = [];

  let qs = state.questions;
  let u = state.users;
  let au = state.authenticatedUser.authenticatedUser;

  console.log("unans", unansweredQuestions);
  console.log("ans", answeredQuestions);

  if (state && !isEmpty(qs) && !isEmpty(u) && !isEmpty(au)){
      unansweredQuestions = filterUnansweredQuestions(qs, u, au);
      answeredQuestions = filterAnsweredQuestions(qs, u, au);                 
    return {
              users : u,
              questions: qs,
              unAnsweredQuestions: unansweredQuestions,
              answeredQuestions: answeredQuestions,
              authenticatedUser : au
            }     
  } else {
    return {
      users : u,
      questions: qs,
      unAnsweredQuestions: unansweredQuestions,
      answeredQuestions: answeredQuestions,
      authenticatedUser : au
    }       
  }
}

export default connect(mapStateToProps) (List);

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

const filterUnansweredQuestions = (questions, users, user)  => {
  let answersForUserArray = [];
  let returnValue = [];
  let questionsArray = [];

  if (!isEmpty(questions) && !isEmpty(users)){
    answersForUserArray = Object.keys(answersForUser(users, user));
    // console.log("filterUnansweredQuestions, answersForUserArray ", answersForUserArray);

    questionsArray = Object.values(questions);
    questionsArray.map(q => {
                    if (!(isInArray(q.id, answersForUserArray))){
                              console.log("qid is not in the answered column", q.id)
                              returnValue.push(q);
                            }
                          return returnValue;
                        }
                      )
      console.log ("filterUnansweredQuestions, result", returnValue);
      return returnValue;
    } 
    else{
        return [];
    }
}

const filterAnsweredQuestions = (questions, users, user )  => {
  let questionsArray = [];
  let answersForUserArray= [];
  if (!isEmpty(questions) && !isEmpty(users)){
      questionsArray = Object.values(questions);
      answersForUserArray= Object.keys(answersForUser(users, user));
      // console.log("filterUnansweredQuestions, answersForUserArray ", answersForUserArray);

      let result = [];
      questionsArray.map( q => {
                            if(isInArray(q.id, answersForUserArray)){
                              console.log("qid is in the answered column", q.id)

                              result.push(q);
                            }    
                          return result;
      })
        console.log ("filterAnsweredQuestions, result", result);
        return result;
      }
      else {
        return [];
    }
  }

function isInArray(value, array) {
  console.log("el has index: ", array.indexOf(value));

  let result = array.indexOf(value)> -1;
  console.log("isinarray result: ", result);
  return result;
}
    
var answersForUser = (users, user) => {
  let result = users[user].answers;
  return result;
}
