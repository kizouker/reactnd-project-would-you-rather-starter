import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import UnAnswered from './UnAnswered.js';
import Answered from './Answered.js';

class UnAnsweredDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOne: false,
      optionTwo: false
    }
  }
  /** 
    four cases
    if user already exists in A , but clicked on b, then add user to B ( and remove from A)
    if user already exists in B, but clicked on am then add user to A (and remove from B)

   if user already exists in A, but clicked on a, then do nothing
   if user already exists in B, but clicked on b, then do nothing
  */

  render() {
    const { questions, users } = this.props;

    let unanswered;
    if (!(this.props.location.state && this.props.location.state.unanswered)) {
      unanswered = false;
    } else {
      unanswered = this.props.location.state.unanswered;
    }

    const questionId = this.props.match.params.id;

    let questionsArray = Object.values(questions);
    let question = questionsArray.find(q => q.id === questionId);

    if (!question) {

      return (<Redirect to={'/nomatch'} />)
    } else {
      return (

        <div className="Answer">
          <h2 className="component-title">Answer</h2>
          <table>
            <thead>
              <tr>
                <th>Would you rather...</th>
              </tr>
            </thead>
            {unanswered && <UnAnswered question={question} users={users} />}
            {!unanswered && <Answered question={question} users={users} />}
          </table>
        </div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    authenticatedUser: state.authenticatedUser,
    users: state.users,
    option : state.otion,
  }
}

export default withRouter(connect(mapStateToProps)(UnAnsweredDetails));