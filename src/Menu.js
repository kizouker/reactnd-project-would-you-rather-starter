import React from 'react';
import './App.css';
import {createStore} from 'redux';
import Answer from './Answer';
import LeaderBoard from './LeaderBoard';
import List from './List';
import Statistics from './Statistics';
import Post from './Post';
import User from './User';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'


const routing = (
  <Router>
    <div className="menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/list" component={List} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/leaderboard" component={LeaderBoard} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

class Menu extends React.Component{
  render (){
    return(<div className="Menu">
            <h2 className="component-title">Menu</h2>
            </div>);
  }
 }
 
 export default Menu;




 <table>
          <tr>
            <td><List> </List></td>
            <td><Statistics></Statistics></td>
          </tr>
          <tr>
            <td><LeaderBoard></LeaderBoard></td>
            <td></td>
          </tr>
        </table>