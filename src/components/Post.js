import {postQuestion} from '../actions/questions.js';
import React from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../_DATA.js'

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
        question : {
          author : 'sarahedo',
          optionOne : 'Option one',
          optionTwo : 'Option Two'
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }


    // formatQuestion = ( optionOneText, optionTwoText, author ) => {

    //   console.log("optionOneText: " + optionOneText + ", optionTwoText :"+ optionTwoText + ", author: "+  author);
    //   return {
    //     id: generateUID(),
    //     timestamp: Date.now(),
    //     author,
    //     optionOne: {
    //       votes: [],
    //       text: optionOneText,
    //     },
    //     optionTwo: {
    //       votes: [],
    //       text: optionTwoText,
    //     }
    //   }
    // }
    
    
  handleSubmit = (event) => {
      // const {author, optionOne, optionTwo} = this.state.question;
      //Something with this is wrong...

    console.log("handleSubmit ---");
    alert('An new question was posted');
        
    console.log("state")
    console.log(this.state)
    console.log("state")

    console.log(this.state.question.optionOne + " "  + this.state.question.optionTwo + " " + this.state.question.author);



    // problem with args to formatQuestion ...where formatQuestion ({optionOneText, optionTwoText, author} )
    let question = formatQuestion(this.state.question.optionOne, this.state.question.optionTwo, 
      this.state.question.author);

      let id = question.id;
     // author = question.author;

      console.log ("New question");
      console.log (question);
      console.log ("New question");

      console.log(this.state)
    this.props.dispatch(postQuestion(question));

     //console.log (this.props);
     event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    /** problem: state is not updated directly it's postponed */
    /** solved - problem was declaration with beloq */
     // const {author, optionOne, optionTwo} = this.state.question;


    this.setState( currentState => ({
      ...currentState.question,
      question : {
          [name]: value
        }
      }
    ), () => console.log(this.state))
  //  console.log(this.state); //postponed en state change
  }

    render (){
      // let  {optionOne, optionTwo} = this.state.question;
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

                <form onSubmit={this.handleSubmit}>
                  <input name="optionOne" type="text" placeholder="1" onChange={this.handleInputChange}>
                  </input>

                  <input name="optionTwo" type="text" placeholder="2" onChange={this.handleInputChange}>
                  </input>

                  <br></br>
                
                  <input type="submit" value="submit"/>

                  {/** 
                   
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

                  */}
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