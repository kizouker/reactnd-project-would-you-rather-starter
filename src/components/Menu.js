import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Answer from './Answer';
import LeaderBoard from './LeaderBoard';
import List from './List';
import Statistics from './Statistics';
import Post from './Post';
import User from './User';
import Login from './Login';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

class Menu extends React.Component{
  render (){
    return(<div className="Menu">
               <h2 className="component-title">Menu</h2>
               <Router>
        <div className="menu">
     <table>
        <thead>
              <tr>
                <th></th> 
              </tr>
        </thead>
        <tbody>
              <tr>
                <td>
                  <Link to="/login">| Login |</Link> 
                </td>
                {console.log(this.props.authenticatedUser)}
                {!isEmpty(this.props.authenticatedUser) && <div> <td>
                  <Link to="/list">| List Questions |</Link> 
                </td>
                <td>
                  <Link to="/leaderboard">| LeaderBoard |</Link> 
                </td>
                <td>
                  <Link to="/post">| Post new Question |</Link> 
                </td>
                <td>
                  <Link to="/answer">| Answer Questions |</Link>
                </td>
                <td>
                  <Link to="/user">| User Settings |</Link>
                </td>
                <td>
                  <Link to="/statistics">| Statistics |</Link> 
                </td> 
                
                </div>}
                
              </tr>
          </tbody>
      </table> 
        
            <hr/>
         <Switch>  
            <Route path="/login" component={Login} />    
            <Route exact path="/list" component={List} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/post" component={Post}/>
            <Route path="/answer" component={Answer} />
            <Route path="/user" component={User} />
        </Switch>
            
          </div>
  </Router>
            </div>);
  }
 }
 
 const mapStateToProps = ( state ) => {
//  console.log("inside map state to props App, state: ", state)
  return {
    users : state.users,
    questions: state.questions,
    authenticatedUser : state.shared.authenticatedUser,
    }
}

function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

 export default connect(mapStateToProps) (Menu);