import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import LeaderBoard from './LeaderBoard';
import Statistics from './Statistics';
import Post from './Post';
import Login from './Login';
import '../App.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

class Menu extends React.Component{
  render (){
    return(
    <Router>

    <div className="login">
     
    </div>
        
    <div className="menu">
     <table>
        <thead>
              <tr>
                <th> <Link to="/login"> | Login | </Link> </th> 
              </tr>
        </thead>
        <tbody>
                {console.log(this.props.authenticatedUser.authenticatedUser)}
                {!isEmpty(this.props.authenticatedUser.authenticatedUser) && 
                <tr>
                  <td>
                    <Link to="/leaderboard">| LeaderBoard |</Link> 
                  </td>
                  <td>
                    <Link to="/post">| Post new Question |</Link> 
                  </td>
                  <td>
                    <Link to="/statistics">| Statistics |</Link> 
                  </td>                
                </tr>}  
          </tbody>
      </table> 
        <Switch>  
          <Route path="/login" component={Login} />    
          <Route path="/statistics" component={Statistics} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/post" component={Post}/>
        </Switch>
      </div>
    </Router>);
  }
 }
 
 const mapStateToProps = ( state ) => {
//  console.log("inside map state to props App, state: ", state)
  return {
    users : state.users,
    questions: state.questions,
    authenticatedUser : state.authenticatedUser,
    }
  }
  
function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

 export default connect(mapStateToProps) (Menu)