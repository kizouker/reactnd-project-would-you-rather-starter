import { useState } from 'react';
import handleVote from './HandleVote';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const UnAnswered = ({ question, users, questions, authenticatedUser, e }) => {
    const [optionOne, setOptionOne] = useState(0);
    const [optionTwo, setOptionTwo] = useState(0);

    const [option, setOption] = useState({
        name: '',
        value: ''
    });

    const handleChange = event => {
        const eventet = event.persist();
        console.log(eventet);
        setOption(current => ({
            ...current,
            [eventet.target.name]: eventet.target.value
        }));
        handleVote(option, questions, authenticatedUser);
    };
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
                        onClick={(e) => console.log(e)}>Vote
                    </button>
                </td>
                <td>
                    {{ optionOne } && (<div><b>Choosen</b> </div>)}
                </td>
                <td><h3>OR</h3></td>
                <td>{question.optionTwo.text}
                    <button name="optionTwo" value={question.id}
                        onClick={(e) => console.log(e)}> Vote
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
