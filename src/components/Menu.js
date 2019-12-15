import React from 'react';
import '../App.css';
import {createStore} from 'redux';
import Answer from './Answer';
import LeaderBoard from './LeaderBoard';
import List from './List';
import Statistics from './Statistics';
import Post from './Post';
import User from './User';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';

const routing = (
  <Router>
        <div className="menu">
     <table>
        <thead>
              <tr>
                <th>Name</th> 
              </tr>
        </thead>
        <tbody>
              <tr>
                <td>
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
              </tr>
          </tbody>
      </table> 
        
            <hr/>
         <Switch>      
            <Route exact path="/list" component={List} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/post" component={Post}/>
            <Route path="/answer" component={Answer} />
            <Route path="/user" component={User} />
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