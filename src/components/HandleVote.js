import { isEmpty } from './Shared.js';
import { saveQuestionAnswer } from '../actions/shared';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const HandleVote = ({option, questions, authenticatedUser}) => {

    // console.log("questions: " + JSON.stringify(questions));
    // console.log("authenticatedUser: " + JSON.stringify(authenticatedUser));

    const triggerAnswered = () => {
        console.log("-------------");
        console.log("--- before ---", this.props.location.state.unanswered);
        this.props.location.state.unanswered = false;
        console.log("--- after ---", this.props.location.state.unanswered);
        console.log("-------------");
      }
    

  
    // let authenticatedUser = this.props.authenticatedUser;
    // let questions = this.props.questions;
    console.log({option});
    

    // let option = {target}.first;
    let optionName = {option}.name
    let optionOneVotes, optionTwoVotes;

    // what option is chosen?
    if (optionName === "optionOne") {
        this.setState({ optionOne: true, optionTwo: false });
    } else if (optionName === 'optionTwo') {
        this.setState({ optionOne: false, optionTwo: true });
    }
    // get the id of the question
    // let id = e.target.value;
    let id = {option}.value;

    if (!isEmpty(id) && !isEmpty(optionName) && !isEmpty(authenticatedUser)) {
        optionOneVotes = questions[id]['optionOne'].votes;
        optionTwoVotes = questions[id]['optionTwo'].votes;

        let question = questions[id];

        if (!(optionOneVotes.includes(authenticatedUser)) && !(optionTwoVotes.includes(authenticatedUser))) {
            let optionVotes = questions[id][option].votes;

            optionVotes.push(authenticatedUser);
            question[option].votes = optionVotes;

            let answer = option;
            this.props.dispatch(saveQuestionAnswer(question, authenticatedUser, answer));
        }

        if ((optionOneVotes.includes(authenticatedUser)) && !(optionTwoVotes.includes(authenticatedUser))
            && optionName === "optionTwo") {
            optionOneVotes.pop(authenticatedUser);
            optionTwoVotes.push(authenticatedUser);

            question["optionOne"].votes = optionOneVotes;
            question["optionTwo"].votes = optionTwoVotes;

            let answer = "optionTwo";

            this.props.dispatch(saveQuestionAnswer(question, authenticatedUser, answer));
        } else if (optionTwoVotes.includes(authenticatedUser) && !(optionOneVotes.includes(authenticatedUser))
            && optionName === "optionOne") {
            optionOneVotes.push(authenticatedUser);
            optionTwoVotes.pop(authenticatedUser);

            question["optionTwo"].votes = optionTwoVotes;
            question["optionOne"].votes = optionOneVotes;
            let answer = "optionOne";
            this.props.dispatch(saveQuestionAnswer(question, authenticatedUser, answer));
        }
    }

    // When we vote for a question => the questions now answered
    // we trigger a re-render by setting unanswered=false
    triggerAnswered();
    //

    return(<div></div>);
}


const mapStateToProps = (state) => {
    return {
      questions: state.questions,
      authenticatedUser: state.authenticatedUser,
      users: state.users,
    }
  }

 export default withRouter(connect(mapStateToProps)(HandleVote));
