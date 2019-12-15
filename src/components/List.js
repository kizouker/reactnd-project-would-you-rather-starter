import React from 'react';
import {connect} from 'react-redux';

class List extends React.Component{
// https://stackoverflow.com/questions/50735735/order-of-component-life-cycle-with-react-redux-connect-and-redux-data


  constructor(props){
    super(props);
  }
  render (){


    // console.log("----- render")
    // console.log(this.props);
    // console.log("----- render")

    let questionsValueArray = Object.values(this.props)[0];
    let questions = Object.keys(this.props);
    let questionsProps = this.props;
     console.log ("object values");
   // questions.map (element => { console.log(element) });
      console.log(questions);
      console.log ("object values");
    //  //filter
    //  //put down there
    //  // 
    //  console.log ("elementS");
     
    
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
                {// questions.map ( e => 
                <tr>
                  <td>id: </td>
                </tr>  
              //)
              }
              </tbody>
            </table>
          </div>)}}

                {/**  
                <div className="grid-item">
                  <h3>Answered questions</h3>  
                  <table>
                    <thead>
                      <tr>
                    <th>
                    Would you rather
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Alt 2</td>
                    </tr>
                    </tbody>
                    
                  </table>
                </div>  -->*/}

 const mapStateToProps = ( state ) => {
   console.log("inside map state to props, state: ", state)
   return {
     questions: state.shared.questions
   }
}

export default connect(mapStateToProps)(List);