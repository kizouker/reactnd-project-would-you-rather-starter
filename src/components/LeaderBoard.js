import React from 'react';

class LeaderBoard extends React.Component{
  render (){
    return(<div className="LeaderBoard">
            <h2 className="component-title">LeaderBoard</h2>


            <h3>Other people have voted like this...</h3>  
            <table align="center">
              <tr>
                <th>User</th>
                <th>Image</th>
                <th># answered</th>
                <th># asked</th>
              </tr>
              <tr>
                <td>raven</td>
                <td>...</td>
                <td>10</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>claw</td>
                <td>...</td>
                <td>5</td>
                <td>5</td>
              </tr>
              <tr>
                <td>foobar</td>
                <td>...</td>
                <td>5</td>
                <td>5</td>
              </tr>
            </table>
            </div>);
  }
 }
 
 export default LeaderBoard;