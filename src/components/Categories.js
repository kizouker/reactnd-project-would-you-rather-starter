import React from 'react';
import { connect } from 'react-redux';
import List from './List';

class Categories extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        unAnswered : true
      };
      this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle = () => {
        this.setState( state => 
            ({  unAnswered : !state.unAnswered,
        }));
    }

render (){
        // console.log(this.props.questions)
        let users = this.props.users;
        const { unAnswered } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                <p>Would you rather...</p>
                </header>
                <div className="List">
                        <div className="grid-container"></div>
                        <div className="grid-item">
                            <button id="switchState" name="switchState" onClick={this.handleToggle}>
                                Toggle
                            </button>
                            {/* <List></List> */}

                                {  unAnswered && (<div>
                                                    <h4> unAnswered </h4>            
                                                    {/* <List questions={this.props.unAnsweredQuestions}> </List> */}
                                                    <List answered={unAnswered}> </List> 
                                                    </div>)
                                } 
                                { !unAnswered && (<div>
                                                    <h4> Answered </h4>
                                                    <List answered={unAnswered}></List>
                                                    </div>)
                                }
                                                </div>
                </div>
            </div>)
        }
    }

    

const mapStateToProps = ( state ) => {
    //  console.log("inside map state to props, state: ", state)
     return {
          questions : state.questions,
          unAnsweredQuestions: state.unansweredQuestions,
          answeredQuestions: state.answeredQuestions,
          authenticatedUser : state.authenticatedUser,
          users : state.users,
     }
  }
  
  export default connect(mapStateToProps) (Categories);

             