import React from 'react';
import {connect} from 'react-redux';


class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data
  
constructor(props){
  super(props);
  this.state = {
    id : '',
    option : '',
  }
  this.handleVote = this.handleVote.bind(this);
}



handleVote = ( e, el ) => {
  if (!(isEmpty(el))){
    let id1 = el.id;
    console.log(id1);
  }

  console.log("vote");

  // let specificQuestion = questions[id]
  let option = e.target.value;
  
 

  this.setState({option : option});

  console.log(e.target.value);
  
  // id:option|[x].votes[userid]
  console.log("vote");

}
//scope 2 -inside class 
  render (){
    //scope 3 -inside RE 
    console.log(this.props.questions)
    let questionsObj = this.props.questions;
    let  questionsArray=[];
    if (questionsObj !== undefined && questionsObj !== null) {
     questionsArray = Object.values(questionsObj);
  }
  //  let questionsValueArray = Object.values(this.props.questions)[0];
  // printConse(questionsValueArray);

    // if (questions !== undefined) {
     // let array = Object.values(questionsValueArray);
      //console.log("array :" + array);
      if (questionsArray !== null && questionsArray !== undefined  && questionsArray.length > 0) { 
        return(<div>
                <table>
                  <thead> 
                    <tr>
                      <th>Would you rather...</th> 
                    </tr>
                  </thead>
                    { 
      }
                    {questionsArray.map ((el) => {
                          return(
                            <tbody key={el.id}>
                                <tr>
                                  <td>{el.optionOne.text} 
                                    <button value="OptionOne" 
                                      onClick={ (e, el) => this.handleVote(e, el)}> Vote 
                                    </button>
                                  </td> 
                                  <td>   ...   or   ...   </td>
                                  <td>{el.optionTwo.text} <button value="OptionTwo" onClick={this.handleVote}> Vote </button></td> 
                                </tr>
                                <tr>                         
                                  <td> </td>
                                </tr>     
                              </tbody>
                            )
                          }
                      )
                    }
                 </table>
              </div>);
                } else{
                  return null;
              }
            }
        }       
      
 
const mapStateToProps = ( state ) => {
  //  console.log("inside map state to props, state: ", state)
   return {
     //users : state.shared.users,
    questions : state.questions,
    //unAnsweredQuestions: unansweredQuestions,
   // answeredQuestions: answeredQuestions
   }
}


export default List;


{/** 
//scope 1 -outside class 
function printConse (arg){
  if (arg !== undefined){
    let questionsValues = Object.values(arg); // the right thing
    console.log("Object.values(this.props)");
    console.log(questionsValues);
  }
  if (arg !== undefined){
    let questionsKeys = Object.keys(arg);
    console.log("Object.keys(this.props)"); // the wrong thing
    console.log(questionsKeys);
    if (arg[0] !== undefined){
      let  questionsValueArray = Object.values(arg)[0];
        console.log("Object.values(this.props)[0]");
        console.log(questionsValueArray);
        
        let array = Object.values(questionsValueArray)
        console.log("Object.values(questionsValueArray)");
        console.log(array);
  }


  }
  }

**/}



function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

