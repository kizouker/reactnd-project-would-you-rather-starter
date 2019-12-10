import React from 'react';

class Statistics extends React.Component{
  render (){
    return(<div className="Statistics">
            <h2 className="component-title">Statistics</h2>

            <h3>Other people have voted like this...</h3>  
            <table align="center">
              <tr>
                <th>Name</th>
                <th>Option A</th>
                <th>#</th>
                <th>%</th>
                <th>Option B</th>
                <th>#</th>
                <th>%</th>
              </tr>
              <tr>
                <td>Question 1</td>
                <td>dasdlfkasdf</td>
                <td>10</td>
                <td>50%</td>
                <td>asdfasfd</td>
                <td>10</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>Question 2</td>
                <td>dasdlfkasdf</td>
                <td>2</td>
                <td>25%</td>
                <td>asdfasfd</td>
                <td>3</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>Question 3</td>
                <td>dasdlfkasdf</td>
                <td>3</td>
                <td>33%</td>
                <td>asdfasfd</td>
                <td>7</td>
                <td>67%</td>
              </tr>
            </table>
             
            </div>);
  }
 }
 
 export default Statistics;