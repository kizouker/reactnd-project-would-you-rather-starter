import {postQuestion} from '../actions/questions.js';
import React from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../_DATA.js'

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
        question : {
          author : "sarahedo",
          optionOne : "alt1",
          optionTwo : "alt2"
        }
      }
    }
    
  handleSubmit = (event) => {
      const {author, optionOne, optionTwo} = this.state.question;

    console.log("handleSubmit ---");
      alert('An new question was posted');

    let question = formatQuestion(optionOne, optionTwo, author);

      let  id = question.id;
       author = question.author;

      console.log ("New question");
      console.log (question);
      console.log ("New question");

     this.props.dispatch(postQuestion(question));

     //console.log (this.props);
     event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState( currentState => ({
      question : {
          [name]: value
        }
      }
    ))
    console.log(this.state); //postponed en state change
  }

    render (){
      const {question1, optionOne, optionTwo} = this.state.question;
      //formatQuestion
      //handleInput => parent
      //dispatcher function
      //reducer, samma sak?
      //sätt och hämta
      // action => reducer 
      return(<div className="Post" >
            <h2 className="component-title">Post a new question</h2>
            <h3>Would you rather:</h3>
            <div className="form">
                <form onSubmit={e=>this.handleSubmit(e)}>
                  <textarea name="question1"  type="text" value={this.state.question.question1} rows="3" cols="100" placeholder="Question" 
                      onChange={e=> this.handleInputChange(e)}>
                  </textarea>
                  <br></br>
                  <textarea name="optionOne"  type="text"  value={this.state.question.optionOne} rows="3" cols="100" placeholder="optionOne" 
                    onChange={e=> this.handleInputChange(e)}>
                  </textarea>
                  <br></br>
                  <textarea name="optionTwo"  type="text"  value={this.state.question.optionTwo} rows="3" cols="100" placeholder="optionTwo" 
                    onChange={e=> this.handleInputChange(e)}>
                  </textarea>
                  <br></br>
                  <input type="submit" value="submit"/>
                </form>
            </div>
          </div>);
      }
  }

 
 let mapStateToProps = (state)  => {
   return {
      questions : state.questions
   }
 }

 export default connect(mapStateToProps)(Post);