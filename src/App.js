import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared.js';
import Menu from './components/Menu.js';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.dispatch(handleInitialData());
  }
  render(){
    return(
    <div>
        <Menu></Menu>
        {/* route to <HomePage>*/}
    </div>)
    } 
}

          
// the idea is to prepare the component with the data it needs
// ie filter the questions _before_ it is initialised
// but the problem arises since I want to pass _state_ to filter
// but it says filter is undefined

const mapStateToProps = ( state ) => {
    //  console.log("inside map state to props, state: ", state)
     return {
     }
  }

export default connect(mapStateToProps) (App);