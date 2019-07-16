import React from 'react';

class Answer extends React.Component{
  render (){
    return(<div className="Answer">
            <h2 className="component-title">Answer</h2>
            <h3>Would you rather?</h3>
            <h4>Question...</h4>
              <ul>
                <li><h4>Option A<button>Choose</button></h4></li>
                <li><h4>Option B<button>Choose </button></h4></li>
              </ul>
            </div>);
      }
 }
 
 export default Answer;