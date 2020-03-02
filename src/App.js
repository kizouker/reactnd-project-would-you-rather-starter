import React from 'react';
import './App.css';
import { handleInitialData } from './actions/shared.js';
import Menu from './components/Menu.js';
import { connect } from 'react-redux';

class App extends React.Component{
 
  componentWillMount(){
    this.props.dispatch(handleInitialData());
  }
  render(){
    return(
    <div>
        <Menu></Menu>
    </div>)
    } 
}

export default connect()(App);