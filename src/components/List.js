import React from 'react';
import {connect} from 'react-redux';

//scope 1 -outside class 
function printConse (arg){

  if (arg !== undefined){
    let questionsValues = Object.values(arg);
    console.log("Object.values(this.props)");
    console.log(questionsValues);
  }
 
  if (arg !== undefined){
    let questionsKeys = Object.keys(arg);
    console.log("Object.keys(this.props)");
    console.log(questionsKeys);
  }

  if (arg[0] !== undefined){
  let  questionsValueArray = Object.values(arg)[0];
    console.log("Object.values(this.props)[0]");
    console.log(questionsValueArray);
    
    let array = Object.values(questionsValueArray)
    console.log("Object.values(questionsValueArray)");
    console.log(array);
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
   let questionsValueArray = Object.values(this.props)[0];
    if (questionsValueArray !== undefined) {
      let array = Object.values(questionsValueArray);
      if (array !== undefined) { 
        return(<div>
                <table>
                  <thead> 
                    <tr>
                      <th>Would you rather...</th> 
                    </tr>
                  </thead>
                    { array.map ((el) => {
                          return(
                            <tbody key={el.id}>
                                <tr>
                                  <td>id: {el.id}</td> 
                                </tr>
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
            } else {
              return null;
            }
        }       
    }
 
  

    

const mapStateToProps = ( state ) => {
  //  console.log("inside map state to props, state: ", state)
   return {
     questions: state.shared.questions
   }
}


export default connect(mapStateToProps)(List);