import React from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
// import { useParams } from "react-router";
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
    const { answered } = this.props;
    let questionsObj = this.props.questions;
    
      if(!answered){
          questionsObj =this.props.unAnsweredQuestions; 
      } else {
        questionsObj =this.props.answeredQuestions;
      }
    //scope 3 -inside RE 
    console.log(this.props)
    let users = this.props.users;
    console.log(users);
    
    let questionsArray = [];

    if (questionsObj !== undefined && questionsObj !== null) {
      questionsArray = Object.values(questionsObj);
    }
    if (!isEmpty(users) && questionsArray !== null && 
          questionsArray !== undefined  && questionsArray.length > 0) { 
      return(
        <Router>
            <div>
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

                                    {/* <Link to='/answers/6'> Answer poll
                                    </Link> */}
                                    <Link to={{
                                          pathname : '/questions/:' + el.id,   
                                          state: {
                                                question : el,
                                              }
                                          }}>| Answer Poll |
                                    </Link>
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
                <Switch>   
                    <Route exact path='/questions/:id' component={Answer}></Route>
                </Switch>

    
)
                {/* <Switch>  
                    <Route path=':/id' children={<Child />}></Route>
                </Switch> */}

                
            </div>
            </Router>);
        } else{
          return null;
      }
    }
}         

const mapStateToProps = ( state ) => {
  console.log("inside map state to props App, state: ", state)
    //inside mapStateToProps
               let unansweredQuestions = []; // null, [] or {}, depending on your approaches
               let answeredQuestions = [];
 
                console.log("unans", unansweredQuestions);
                console.log("ans", answeredQuestions);

               if (state && !isEmpty(state.questions) && !isEmpty(state.users)
                   &&  !isEmpty(state.authenticatedUser.authenticatedUser)) {
                     console.log("State questions are filled: ", state.questions, state.users, state.authenticatedUser.authenticatedUser);
                     unansweredQuestions = filterUnansweredQuestions(state.questions, state.users, state.authenticatedUser.authenticatedUser);
                     answeredQuestions = filterAnsweredQuestions(state.questions, state.users, state.authenticatedUser.authenticatedUser);                 
                    
                   //saometin is over-running the state...too it's not 
                   // logged by the middleware logger
                   return {
                           users : state.users,
                           questions: state.questions,
                           unAnsweredQuestions: unansweredQuestions,
                           answeredQuestions: answeredQuestions,
                           authenticatedUser : state.authenticatedUser.authenticatedUser
                         }     
                    } else {

                    return {
                      users : state.users,
                      questions: state.questions,
                      unAnsweredQuestions: unansweredQuestions,
                      answeredQuestions: answeredQuestions,
                      authenticatedUser : state.authenticatedUser.authenticatedUser
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
    questionsArray = Object.values(questions);
    questionsArray.map(q => {
                    if (!(isInArray(q.id, answersForUserArray))){
                            // if (!(answersForUserArray.includes(q.id))){
                              returnValue.push(q);
                            }
                          //return returnValue;
                        }
                          )
      return returnValue;
          } else {
              return [];
            }
}

const filterAnsweredQuestions = (questions, users, user )  => {
  let questionsArray = [];
  let answersForUserArray= [];

  if (!isEmpty(questions) && !isEmpty(users)){
      questionsArray = Object.values(questions);
      answersForUserArray= Object.keys(answersForUser(users, user));
      let result = [];
      questionsArray.map( q => {
                            if(isInArray(q.id, answersForUserArray)){
                              result.push(q);
                            }    
                          return result;
      })
        return result;
      }else {
        return [];
      }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
    
var answersForUser = (users, user) => {
  let result = users[user].answers;
  return result;
}
