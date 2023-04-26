import { useState } from 'react';
import { isEmpty } from './Shared.js';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const Answered = ({question, users, questions, authenticatedUser}) => {
    const [optionOne, setOptionOne] = useState(0);
    const [optionTwo, setOptionTwo] = useState(1);

    const returnNoUsers = () => {
        let usersArray = Object.values(this.props.users);
      
        if (!isEmpty(usersArray)){
          return usersArray.length;
        }else {
          return 0;
        }
      }  

    const countNoVotesPerQuestion = ( id ) => {
      console.log(" id: ", id);
      let questions = this.props.questions;
      console.log("questions: ", questions);
    
      let element = questions[id];
    
      let optionOneVotes = element.optionOne.votes.length;  
      let optionTwoVotes = element.optionTwo.votes.length;
    
      console.log("votes", optionOneVotes, optionTwoVotes);
    
      return {
        id: element.id,
        optionOne : optionOneVotes, 
        optionTwo : optionTwoVotes
      };
    }
    const percentagePerQuestion = ( id ) => {
        console.log("id: ", id);
        let noOfVotes = countNoVotesPerQuestion( id );
      
        let noOptA = noOfVotes.optionOne;
        let noOptB = noOfVotes.optionTwo;
      
        let totalVotes = noOptA + noOptB;
        let percentA; let percentB; 
      
        if (noOptA !== 0 && totalVotes !==0 ){
          percentA = Math.round((noOptA/totalVotes)*100)
        } else {
          percentA = 0;
        }
        if (noOptB !== 0 && totalVotes !==0 ){
          percentB = Math.round((noOptB/totalVotes)*100)
        } else{
          percentB = 0;
        }
      
        let statsPercent = {
              optionOne : percentA,
              optionTwo : percentB 
            };
       
        return statsPercent;
      }

    return (
        <tbody>
            <tr>
                <td>... {question.author} ...
                    <img src={window.location.origin + users[question.author].avatarURL}
                        width="10%" height="10%" alt="Avatar of the author." />
                    wonders if you, would you rather...
                </td>
                <td>
                    <table>
                        <tbody>
                            <tr>
                                <td><h5>{question.optionOne.text} </h5></td>
                            </tr>
                            <tr>
                                <td>{question.optionOne.votes.length} votes</td>
                            </tr>
                            <tr>
                                <td>
                                    {/** this below is a fn definition - not a call 
                                         * The (e) => whateverFunction(2) is a callback 
                                         * definition to be used on onClickor onChange so no needed here
                                         * so this doesn't work..just a reminder.
                                         {( e )  => this.countNoVotesPerQuestion(e, question.id ).optionOne} */}
                                    {percentagePerQuestion(question.id).optionOne} %
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    {{optionOne} &&
                        (<div>
                            <b> Choosen </b>
                        </div>)}
                </td>
                <td><h3>OR</h3></td>
                <td>
                    <table>
                        <tbody>
                            <tr>
                                <td><h5>{question.optionTwo.text} </h5></td>
                            </tr>
                            <tr>
                                <td>{question.optionTwo.votes.length} votes</td>
                            </tr>
                            <tr>
                                <td>
                                    {percentagePerQuestion(question.id).optionTwo} %
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    {{optionTwo} && (<div> <b> Choosen </b> </div>)}
                </td>
            </tr>
        </tbody>)

}
const mapStateToProps = (state) => {
    return {
      questions: state.questions,
      authenticatedUser: state.authenticatedUser,
      users: state.users,
    }
  }

 export default withRouter(connect(mapStateToProps)(Answered));
