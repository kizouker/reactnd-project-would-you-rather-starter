import React from 'react';
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
        this.setState( currentState => 
            ({  unAnswered : !currentState.unAnswered,
        }));
    }

render (){
        const { unAnswered } = this.state;

        return (<div className="App">
                    <header className="App-header">
                    <p>Would you rather...</p>
                    </header>
                    <div className="List">
                        <div className="grid-container"></div>
                        <div className="grid-item">
                        <button id="switchState" name="switchState" onClick={this.handleToggle}>
                            <h3>{ unAnswered ? "unAnswered" : "Answered" }</h3>
                        </button>
                        { unAnswered && (<div><List unanswered={unAnswered}></List></div>)} 
                        { !unAnswered && (<div><List unanswered={unAnswered}></List></div>)}
                    </div>
                </div>
            </div>)
        }
    }

export default Categories;
             