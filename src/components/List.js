import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data
  
constructor(props){
  super(props);
  this.state = {
    id : '',
    option : '',
  }
  this.returnNoUsers = this.returnNoUsers.bind(this);
  this.countNoVotesPerQuestion = this.countNoVotesPerQuestion.bind(this);
  this.percentagePerQuestion = this.percentagePerQuestion.bind(this);
}

percentagePerQuestion = () => {
  console.log("percentage")
  let noOfUsers = this.returnNoUsers();
  let countArray = this.countNoVotesPerQuestion();
  let percentagePerQuestArr = [];
  
  console.log("percentage", noOfUsers, countArray)
  countArray.map( element => {
      percentagePerQuestArr[element.id] = {
        optionOne : (element.optionOne/noOfUsers),
        optionTwo : (element.optionTwo/noOfUsers) };
      return percentagePerQuestArr;
  })
  console.log("percentagePerQuestArr", percentagePerQuestArr)
  return percentagePerQuestArr;
}

returnNoUsers = () => {
  let usersArray = Object.values(this.props.users);

  if (!isEmpty(usersArray)){
    return usersArray.length;
  }else {
    return 0;
  }
}  

countNoVotesPerQuestion = () => {
  let questionsArr = Object.values(this.props.questions);
  let countArray = [];
  questionsArr.map(element => {
                      // since we check when we add votes if the user
                      // already exists, we can now assume that a user
                      // only exists once in the array

      let optionOneVotes = element.optionOne.votes.length;
      let optionTwoVotes = element.optionTwo.votes.length;

      console.log("votes", optionOneVotes, optionTwoVotes);

      countArray.push({
        id: element.id,
        optionOne : optionOneVotes, 
        optionTwo : optionTwoVotes
      });

      return countArray;
      })
    return countArray;
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
                              <td>
                                Percentage: {this.percentagePerQuestion()[el.id].optionOne}
                              </td>
                              <td>   ...   or   ...   </td>
                              <td>{el.optionTwo.text}  
                              Votes: {el.optionTwo.votes.length}
                              </td>          
                              <td>
                                Percentage: {this.percentagePerQuestion()[el.id].optionTwo}
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

let sortFn = function(a, b) {
  if (a.timestamp > b.timestamp) {
    return 1;
  }
  if (a.timestamp < b.timestamp) {
    return -1;
  }
  return 0;
};

const mapStateToProps = ( state ) => {
  console.log("inside map state to props App, state: ", state)
  //inside mapStateToProps
  let unansweredQuestions = []; 
  let answeredQuestions = [];

  let qs = state.questions;
  let u = state.users;
  let au = state.authenticatedUser.authenticatedUser;

  if (state && !isEmpty(qs) && !isEmpty(u) && !isEmpty(au)){
      unansweredQuestions = (filterQuestions(qs, u, au)).unansw.sort(sortFn);;
      answeredQuestions = (filterQuestions(qs, u, au)).answ.sort(sortFn);;   
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
let filterQuestions = (questions, users, user)  => {
  let answersForUserArray = [];
  let unansweredResult = [];
  let answeredResult = [];
  let questionsArray = [];
  let result;

  if (!isEmpty(questions) && !isEmpty(users)){
    answersForUserArray = Object.keys(answersForUser(users, user));
    questionsArray = Object.values(questions);
    questionsArray.map(q => {
        if (!(isInArray(q.id, answersForUserArray))){
          unansweredResult.push(q);
        } else{
          answeredResult.push(q);
        }
        result = {
          unansw: unansweredResult,
          answ: answeredResult
        };
        return result;
        })
    return result;
  } else{
      return [];
  }
}

function isInArray(value, array) {
  let result = array.indexOf(value)> -1;
  return result;
}
    
var answersForUser = (users, user) => {
  let result = users[user].answers;
  return result;
}

