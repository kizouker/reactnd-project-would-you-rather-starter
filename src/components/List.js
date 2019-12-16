import React from 'react';
import {connect} from 'react-redux';

class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data
  

    // let questionsValues = Object.values(this.props);
    // console.log("Object.values(this.props)");
    // console.log(questionsValues);

    // let questionsKeys = Object.keys(this.props);
    // console.log("Object.keys(this.props)");
    // console.log(questionsKeys);

    // questionsValueArray = Object.values(this.props)[0];
    //  console.log("Object.values(this.props)[0]");
    //  console.log(questionsValueArray);

    // array = Object.values(questionsValueArray)
    //  console.log("Object.values(questionsValueArray)");
    //  console.log(array);
 
  render (){

     console.log("Props: ")
    console.log(this.props);
    let questionsValueArray = Object.values(this.props)[0];
    if (questionsValueArray !== undefined) {
      let array = Object.values(questionsValueArray);
      if (array !== undefined) { 
        return(<div>
                <table>
                  <thead> 
                    <tr>
                      <th>Name</th> 
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Would you rather</td>
                    </tr>
                    <tr>
                    { array.map ((el) => {
                          return(
                              <td>id: {el.id}</td>
                            )
                          }
                      )
                    }
                    </tr>
                  </tbody>
                </table>
              </div>);
                }
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