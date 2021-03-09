import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { isEmpty } from './Shared'
import { withRouter } from 'react-router';

class List extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    id : '',
    option : '',
  }
  this.handleClickDetails = this.handleClickDetails.bind(this);
}

handleClickDetails = ( id ) => {
  let history = this.props.history;
  console.log("handkeClickDetails .... ---- .... ..-- ..-.");
  console.log("ID ", id);
  history.push('/questions/:'+ id);

  console.log("...--....----....");
// /questions/' + el.id
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
              { questionsArray.map ((el) => {
              return(<tbody key={el.id}>
              { !unanswered && (
                <tr>
                  <td><i> {el.author}  </i> </td>
                  <td>
                    <img className="image" src={window.location.origin + users[el.author].avatarURL} 
                         alt="The avatar of the author"/>
                  </td>

                  <td>
                   <span>wonders, would you rather {el.optionOne.text} 
                   or {el.optionTwo.text}</span>
                  </td>
                  <td>
                    <Link to={{
                      pathname : '/questions/' + el.id,   
                      state: {
                        question : el,
                        unanswered : unanswered
                      }
                      }}><span> more details...</span>
                    </Link>
                  </td>
                  
              </tr>)}              
                {unanswered && (
                <tr>
                  <td><i>{el.author} </i> </td>
                  <td>
                    <img className="image" src={window.location.origin + users[el.author].avatarURL} 
                       alt="The avatar of the author"/>
                  </td>

                  <td>
                      <Link to={{ 
                          pathname : '/questions/' + el.id,   
                          state: {
                              question : el,
                              unanswered : unanswered
                            }
                          }}><span>wonders, would you rather {el.optionOne.text} 
                          or {el.optionTwo.text}</span>
                      </Link>
                  </td>
                </tr>
               )}
              </tbody>)
            })}
            </table>
          </div>)
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

// export default connect(mapStateToProps) (List);
export default withRouter(connect(mapStateToProps) (List));

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

