import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import LeaderBoard from './LeaderBoard';
import Post from './Post';
import Login from './Login';
import UnAnsweredDetails from './UnAnsweredDetails';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Categories from './Categories';
import PrivateRoute from './PrivateRoute';

class Menu extends React.Component{
  constructor(props){
    super(props);
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }
  userLoggedIn = () => {
    let user = this.props.authenticatedUser;
    let msg_1 = "No user"; 
    let msg_2 = " is currently logged in";
    let msg  = "";

    if(!isEmpty(user)){
      msg = user + msg_2;
    }else {
      msg = msg_1 + msg_2;
    }
    return (<div>
      <i><h6>
        {msg}
      </h6></i>
    </div>)
  }
  render (){
    return(
    <Router>
       <div>
      {this.userLoggedIn() }
           <Link to="/">|| HomePage |</Link> 
           <Link to="/leaderboard">| LeaderBoard |</Link> 
           <Link to="/add">| Post new Question |</Link> 
           <Link to="/login">
             { !this.props.authenticatedUser && "| Login ||"}
             { this.props.authenticatedUser && "| Logout ||"}
           </Link> 
    </div>
      {/***
        * Goes through a list of possible matches and routes
        * to the correct one.
        */}
      <Switch>
        <Route path="/login" component={ Login } 
          authenticatedUser={ this.props.authenticatedUser }/>

          <Route path="/logout" component={ Login } 
          authenticatedUser={ this.props.authenticatedUser }/>

        <PrivateRoute path="/leaderboard" component={ LeaderBoard } 
          authenticatedUser={this.props.authenticatedUser}/>
        <PrivateRoute exact path='/add' component={ Post } 
          authenticatedUser={this.props.authenticatedUser}/>
        <PrivateRoute exact path='/questions/:id' component={ UnAnsweredDetails } 
          authenticatedUser={this.props.authenticatedUser}/>

        <PrivateRoute exact path="/" component={ Categories } 
          authenticatedUser={this.props.authenticatedUser}/>  
         {/** Redirects to page 404 - if you request /badurl */}

        <PrivateRoute exact path="*" component={ NoMatch } 
           authenticatedUser={this.props.authenticatedUser}/> 
  
     {/** the homepage should show first...
      * I have put it last to make it match last
      * but its the nomatch that matches...
      * PrivateRoute is used to 
      */}
      </Switch>
    </Router>)
    ;
  }
 }

 export const NoMatch = ({ location }) => (
  <div>
    <h3>404</h3>
    <h3>cannot access this page while user not logged in</h3>
  </div>)

 const mapStateToProps = ( state ) => {
  return {
      users : state.users,
      questions: state.questions,
      authenticatedUser : state.authenticatedUser.authenticatedUser,
    }
  }
  
function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

 export default connect(mapStateToProps) (Menu)