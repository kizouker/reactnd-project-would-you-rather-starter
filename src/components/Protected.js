import React from 'react';

import '../App.css';
import { connect } from 'react-redux';
import LeaderBoard from './LeaderBoard';
import Post from './Post';
import Login from './Login';
import Answer from './Answer';
import '../App.css';
import { withRouter, Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Categories from './Categories';

import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

class Protected extends React.Component{
  render (){
    return( <div className="Protected">
            <table>
                <thead>
                    <tr>
                        <th>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            {/* <td>
                            {this.userLoggedIn()}
                            </td> */}
                            <td>
                                <Link to="/">| HomePage |</Link> 
                            </td>
                            <td>
                                <Link to="/leaderboard">| LeaderBoard |</Link> 
                            </td>
                            <td>
                                <Link to="/post">| Post new Question |</Link> 
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>);
    }
}
 
export default Protected;