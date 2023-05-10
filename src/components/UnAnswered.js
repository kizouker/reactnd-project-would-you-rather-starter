import { useState } from 'react';
import handleVote from './HandleVote';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/*
1, understand mapStateToprops vs useState
2, behöver jag skicka med questions, etc i handlevote när de finnsi statet?
*/
const UnAnswered = ({ question, users, questions, authenticatedUser}) => {
    const [optionOne, setOptionOne] = useState(0);
    const [optionTwo, setOptionTwo] = useState(0);

    const [option, setOption] = useState({
        "name": '',
    });

    const handleChange = event => {
      
        event.persist();
        console.log(event.target.value);

        setOption(current => ({
            ...current,
            "name": event.target.value
        }));
        
        handleVote();
        
    };

    function handleClick(event) {
        event.persist();
        console.log(event.target.value);
        
      }
    return (
        <tbody>
            <tr>
                <td>... {question.author} ...
                    <img src={window.location.origin + users[question.author].avatarURL}
                        width="10%" height="10%" alt="Avatar of the author." />
                    wonders if you, would you rather...
                </td>
                <td>{question.optionOne.text}
                    <button name="optionOne" value={question.id}
                        onClick={(e) => handleChange(e) }>Vote
                    </button>
                </td>
                <td>
                    {{ optionOne } && (<div><b>Choosen</b> </div>)}
                </td>
                <td><h3>OR</h3></td>
                <td>{question.optionTwo.text}
                    <button name="optionTwo" value={question.id}
                        onClick={(e) => handleChange(e)}> Vote
                    </button>
                </td>
                <td>
                    {{ optionTwo } && (<div><b>Choosen</b></div>)}
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

export default withRouter(connect(mapStateToProps)(UnAnswered));
