import { saveQuestion } from '../actions/shared.js';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { withRouter } from 'react-router';

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
        question : {
          author : '',
          optionOne : '',
          optionTwo : '',
          timestap: '',
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

  handleSubmit = ( event ) => {
    let authUser = this.props.authenticatedUser;
    let date = new Date();
    let timestamp = date.getTime();
    // console.log("timestamp ", timestamp);

    let question = {  
      optionOne : this.state.question.optionOne,
      optionTwo : this.state.question.optionTwo,
      author : authUser,
      timestamp : timestamp
    };

      this.props.dispatch(saveQuestion(question, authUser));
      const { history } = this.props;
      console.log("history ", history);  
      history.push('/');
      event.preventDefault();
    }

  handleInputChange( event ) {
    console.log("handleInputChange", this.props.authenticatedUser);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState( currentState => ({
      question : {
          ...currentState.question,
          [name]: value
        }
      }
    ), () => console.log(this.state))
  }
  
    render (){
      const { optionOne, optionTwo } = this.state.question;
      return(<Router>
              <div className="Post" >
              <h2 className="component-title">Post a new question</h2>
              <h3>Would you rather:</h3>
                  <div className="form">
                    <form onSubmit={this.handleSubmit}>
                      <textarea rows="4" cols="100" name="optionOne" type="text" 
                        placeholder="Here you write the first option ..." 
                        onChange={this.handleInputChange}
                        value={optionOne.value} > 
                      </textarea>

                      <textarea rows="4" cols="100" name="optionTwo" type="text" 
                        placeholder="Here you write the second option ..." 
                        onChange={this.handleInputChange}
                        value={optionTwo.value} >
                      </textarea>
                  
                      <br></br>
                      <input type="submit" value="submit"/>
                    </form>
                </div>
              </div>
            </Router>);
      }
  }

 let mapStateToProps = (state)  => {
   return {
      users : state.users,
      questions: state.questions,
      authenticatedUser : state.authenticatedUser.authenticatedUser,
   }
 }

 export default withRouter(connect(mapStateToProps) (Post))