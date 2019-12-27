import React from 'react';
import {connect} from 'react-redux';

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
class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data
  
constructor(props){
  super(props);
}
//scope 2 -inside class 
  render (){
    //scope 3 -inside RE 
    //console.log(this.props.questions)
    let questionsObj = this.props.questions;
    let questionsArray = Object.values(questionsObj);

  //  let questionsValueArray = Object.values(this.props.questions)[0];
  // printConse(questionsValueArray);

    // if (questions !== undefined) {
     // let array = Object.values(questionsValueArray);
      //console.log("array :" + array);
      if (questionsArray !== undefined) { 
        return(<div>
                <table>
                  <thead> 
                    <tr>
                      <th>Would you rather...</th> 
                    </tr>
                  </thead>
                    { 
                    //console.log("för loopen")
                    //contains the wrong things
                    //console.log(array)
                    //
                    //console.log("för loopen");
      }
                    {questionsArray.map ((el) => {
                          return(
                            <tbody key={el.id}>
                                {/** <tr>
                                  <td>id: {el.id}</td> 
                                </tr>
                                **/}
                                
                                <tr>
                                  <td>{el.optionOne.text}</td> 
                                </tr>
                                <tr>
                                  <td>{el.optionTwo.text}</td> 
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
     questions: state.questions
   }
}


export default connect(mapStateToProps)(List);