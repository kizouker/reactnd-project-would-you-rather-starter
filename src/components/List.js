import React from 'react';
import { connect } from 'react-redux';

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
                                <img src={window.location.origin + users[el.author].avatarURL} width="10%" height="10%"/>
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
                    <Route path='/questions/:id' component={Answer}></Route>
                </Switch>


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

// const Child = (() => { 

//   let { id } = useParams();

//   console.log( id );

//   return (
//     <div>
//         <h3>{id}</h3>
//     </div>
//    );
//   }
//  )

const Child = ((props) => { 

  let { id } = props.match.params;

  console.log( id );

  return (
    <div>
        <h3>{id}</h3>
    </div>
   );
  }
 )


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

