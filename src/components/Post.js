import { saveQuestion } from '../actions/shared.js';
import React from 'react';
import { connect } from 'react-redux';

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
        question : {
          author : '',
          optionOne : '',
          optionTwo : ''
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

  handleSubmit = (event) => {
    alert('An new question was posted');
    let authUser = this.props.authenticatedUser;
    
  let question = {  
    optionOne : this.state.question.optionOne,
    optionTwo : this.state.question.optionTwo,
    author : authUser
  };
  

  /**
   *             <div className="form">
                <form onSubmit={this.handleSubmit}>
                  <textarea cols="100" rows="4" name="optionOne" placeholder="Here you write the first option ..." onChange={this.handleInputChange}>
                  </textarea>
                  <br></br>
                  <textarea cols="100" rows="4" name="optionTwo" placeholder="Here you write the second option ... ..." onChange={this.handleInputChange}>
                  </textarea>
                  <br></br>
                  <input type="submit" value="submit"/>
                </form
   */
  this.props.dispatch(saveQuestion(question, authUser));
  event.preventDefault();
  }

  handleInputChange(event) {
   console.log("handleInputChange", this.props.authenticatedUser);
  const target = event.target;
    const value = target.value;
    const name = target.name;
    /** problem: state is not updated directly it's postponed */
    /** solved - problem was declaration with beloq */
     const {author, optionOne, optionTwo} = this.state.question;

    this.setState( currentState => ({
      question : {
        // author : this.props.authenticatedUser,
          ...currentState.question,
          [name]: value
        }
      }
    ), () => console.log(this.state))
  //  console.log(this.state); //postponed en state change
  console.log("tate in Post", this.state);
  }
  
    render (){
      //handleInput => parent
      return(<div className="Post" >
            <h2 className="component-title">Post a new question</h2>
            <h3>Would you rather:</h3>
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                  <input name="optionOne" type="text" placeholder="1" onChange={this.handleInputChange}>
                  </input>
                  <input name="optionTwo" type="text" placeholder="2" onChange={this.handleInputChange}>
                  </input>
                  <br></br>
                  <input type="submit" value="submit"/>
                </form>
            </div>
          </div>);
      }
  }

 let mapStateToProps = (state)  => {
   return {
      users : state.users,
      questions: state.questions,
      authenticatedUser : state.authenticatedUser.authenticatedUser,
   }
 }

 export default connect(mapStateToProps)(Post);