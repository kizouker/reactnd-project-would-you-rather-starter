import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import LeaderBoard from './LeaderBoard';
import Statistics from './Statistics';
import Post from './Post';
import Login from './Login';

import '../App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Categories from './Categories';

class Menu extends React.Component{
  constructor(props){
    super(props);
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }

  userLoggedIn = () => {
    let user = this.props.authenticatedUser.authenticatedUser;
    let msg_1 = "No user"; 
    let msg_2 = " is currently logged in";
    let msg  = "";

    if(!isEmpty(user)){
      msg = user + msg_2;
    }else {
      msg = msg_1 + msg_2;
    }
    return (<div>
      <h5>
        {msg}
      </h5>
    </div>)
  }
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
                  {this.userLoggedIn()}
                  </td>
                  <td>
                    <Link to="/">| HomePage |</Link> 
                  </td>
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
          <Route exact path="/" component={Categories} />   
          <Route path="/login" component={Login} />    
          <Route path="/statistics" component={Statistics} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/post" component={Post}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>);
  }
 }
 
 const NoMatch = ({ location }) => (
  <div>
    <h3>404</h3>
    <h3> cannot access<code>{location.pathname}</code> while user not logged in</h3>
  </div>)

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