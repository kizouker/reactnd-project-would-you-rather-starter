
import {postQuestion} from '../actions/questions.js';
import React from 'react';
import { connect } from 'react-redux';


class Post extends React.Component{
  constructor(props){
    super(props);
   // this.store = this.props.store.bind(this);
    this.state = { 
        question : {
          question1: "",
          alternative1 : "",
          alternative2 : "",
          answered: false 
        }
      }
    }
    
   handleSubmit = (event) => {
    console.log("handleSubmit ---");
    alert('An new question was posted');
    this.props.dispatch(postQuestion(this.state.question));
    console.log (this.props);
    event.preventDefault();
 
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState( currentState => ({
        question : {
          ...currentState.question,
          [name]:value
        }
      }));

    console.log(this.state);
  }

  render (){
    const {question1, alternative1, alternative2} = this.state.question;
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
              <textarea name="question1"  rows="3" cols="100" placeholder="Question" 
                onChange={e=> this.handleInputChange(e)}>
              </textarea>
              <br></br>
              <textarea name="alternative1"  rows="3" cols="100" placeholder="alternative1" 
                onChange={e=> this.handleInputChange(e)}>
              </textarea>
              <br></br>
              <textarea name="alternative2"  rows="3" cols="100" placeholder="alternative2" 
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
    state
   }
 }

 export default connect(mapStateToProps)(Post);