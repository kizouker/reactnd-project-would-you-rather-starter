import React from 'react';

class List extends React.Component{
  render (){
    return(<div className="List">
             <h2 className="component-title">List of Questions</h2>
             <div class="grid-container">
                <div class="grid-item">
                  <h3>UnAnswered questions</h3>  
                  <table>
                    <tr>
                      <th>Name</th> 
                    </tr>
                    <tr>
                      <td>Question 1</td>
                    </tr>
                    <tr>
                      <td>Question 2</td>
                    </tr>
                    <tr>
                      <td>Question 3</td>
                    </tr>
                  </table>
                </div>
                <div class="grid-item">
                  <h3>Answered questions</h3>  
                  <table>
                    <tr>
                      <th>Name</th> 
                    </tr>
                    <tr>
                      <td>Question 1</td>
                    </tr>
                    <tr>
                      <td>Question 2</td>
                    </tr>
                    <tr>
                      <td>Question 3</td>
                    </tr>
                  </table>
                </div>
            </div>
        </div>);
  }
 }
 
 export default List;