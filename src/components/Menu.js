import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import LeaderBoard from './LeaderBoard';
import Post from './Post';
import Login from './Login';
import Answer from './Answer';
import '../App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Categories from './Categories';
import Protected from './Protected';
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
        {/* <Link to="/protected"> | Menu | </Link> */}
  {this.userLoggedIn() }
        
           <Link to="/">| HomePage |</Link> 
           <Link to="/leaderboard">| LeaderBoard |</Link> 
           <Link to="/post">| Post new Question |</Link> 
           <Link to="/login">|Login / Logout|</Link> 
        {/* sdadasö 
        
        Var ska jag sätta login - den ska alltid visas från och med att vi är inne
        men då logout...om jag trycker på en route så försvinner den*/}
      </div>
      <Switch>
        <Route path="/login" component={ Login } 
                            authenticatedUser={ this.props.authenticatedUser }/>
                            
        <PrivateRoute exact path="/protected" component={ Protected } 
                            authenticatedUser={ this.props.authenticatedUser }/>   
                            
        <PrivateRoute path="/leaderboard" component={LeaderBoard} authenticatedUser={this.props.authenticatedUser}/>
        <PrivateRoute path='/post' component={Post} authenticatedUser={this.props.authenticatedUser}/>
        <PrivateRoute exact path='/questions/:id' component={Answer} authenticatedUser={this.props.authenticatedUser}/>
        <PrivateRoute exact path="/" component={Categories} authenticatedUser={this.props.authenticatedUser}/> 
        <PrivateRoute path="/nomatch" component={ NoMatch } />
      </Switch>
    </Router>)
    ;
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
    authenticatedUser : state.authenticatedUser.authenticatedUser,
    }
  }
  
function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

 export default connect(mapStateToProps) (Menu)