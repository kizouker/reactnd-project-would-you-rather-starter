import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from './Shared'
import Answer from './Answer';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
class List extends React.Component{

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
  let noOfUsers = this.returnNoUsers();
  let countArray = this.countNoVotesPerQuestion();
  let percentagePerQuestArr = [];
  
  console.log("percentage", noOfUsers, countArray)
  countArray.map( element => {
      percentagePerQuestArr[element.id] = {
        optionOne : Math.round((element.optionOne/noOfUsers)*100),
        optionTwo : Math.round((element.optionTwo/noOfUsers)*100) };
      return percentagePerQuestArr;
  })
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
  let questionsArrOrg = Object.values(this.props.questions);
  let countArray = [];
  questionsArrOrg.map(element => {
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

 
    const Part2 = (questionsObj) => {
      { 
        if (!(isEmpty(questionsObj))) {
          questionsArray = Object.values(questionsObj);
        }
        questionsArray.map ((el) => {
        return(<tbody key={el.id}>
                { !unanswered && (
                  <tr>
                    <td>... {el.author} ...</td>
                    <td><img src={window.location.origin + users[el.author].avatarURL} 
                        width="10%" height="10%" alt="The avatar of the author"/>
                        wonders if you, would you rather...
                    </td>
                    <td>{el.optionOne.text}</td>
                    <td>Votes: {el.optionOne.votes.length}</td>
                    <td>Percentage: <br></br>
                      {this.percentagePerQuestion()[el.id].optionOne} %
                    </td>
                    <td>... or ...</td>
                    <td>{el.optionTwo.text}</td>
                    <td>
                      Votes: {el.optionTwo.votes.length} 
                    </td>
                    <td>
                      Percentage: <br></br>
                      {this.percentagePerQuestion()[el.id].optionTwo} %
                    </td>
                  </tr>)}              
  
                {unanswered && (
                    <Link to={{ pathname : '/questions/' + el.id,   
                    state: {
                    question : el,
                      }}}>
                  <tr>
                    <td>... {el.author} ...</td>
                    <td><img src={window.location.origin + users[el.author].avatarURL} 
                        width="10%" height="10%" alt="The avatar of the author"/>
                        'wonders if you, would you rather...</td>
                    <td>{el.optionOne.text}</td>
                    <td>{el.optionTwo.text}</td>
                  </tr>
                  </Link>
                  )}
                </tbody>)
              })}
    }
    const Part1 = (questionsObj) => {
      return(<Router>
        <div>
            <table>
              <thead> 
                <tr>
                  <th>Would you rather...</th> 
                </tr>
              </thead>
              <tbody>
              <Part2 questionsObj={questionsObj}></Part2>
              </tbody>
              </table>
      </div>
      <Switch>  
        <Route path='/questions/:id' component={Answer}></Route>
        </Switch>
      </Router>)
    };

    if (!isEmpty(users) && !(isEmpty(questionsArray))) { 
      return(<Part1 questionsObj={questionsObj}></Part1>);

    

      // const Part =  () =>
      //   { questionsArray.map ((el) => {
      // return(<tbody key={el.id}>
      //         { !unanswered && (
      //           <tr>
      //             <td>... {el.author} ...</td>
      //             <td><img src={window.location.origin + users[el.author].avatarURL} 
      //                 width="10%" height="10%" alt="The avatar of the author"/>
      //                 wonders if you, would you rather...
      //             </td>
      //             <td>{el.optionOne.text}</td>
      //             <td>Votes: {el.optionOne.votes.length}</td>
      //             <td>Percentage: <br></br>
      //               {this.percentagePerQuestion()[el.id].optionOne} %
      //             </td>
      //             <td>... or ...</td>
      //             <td>{el.optionTwo.text}</td>
      //             <td>
      //               Votes: {el.optionTwo.votes.length} 
      //             </td>
      //             <td>
      //               Percentage: <br></br>
      //               {this.percentagePerQuestion()[el.id].optionTwo} %
      //             </td>
      //           </tr>)}              

      //         {unanswered && (
      //             <Link to={{ pathname : '/questions/' + el.id,   
      //             state: {
      //             question : el,
      //               }}}>
      //           <tr>
      //             <td>... {el.author} ...</td>
      //             <td><img src={window.location.origin + users[el.author].avatarURL} 
      //                 width="10%" height="10%" alt="The avatar of the author"/>
      //                 'wonders if you, would you rather...</td>
      //             <td>{el.optionOne.text}</td>
      //             <td>{el.optionTwo.text}</td>
      //           </tr>
      //           </Link>
      //           )}
      //         </tbody>)
      //       })}
      //       </table>
      //     </div>)
        } else{
          return null;
      }
    }
}         

let sortFn = function(a, b) {
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
};

const mapStateToProps = ( state ) => {
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

