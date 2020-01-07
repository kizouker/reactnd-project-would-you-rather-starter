import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';

import { setAuthenticatedUser } from '../actions/authedUser'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {  
            authenticated : false,
            authenticatedUser : ''
        }
        this._onSelect = this._onSelect.bind(this);
    }

    handleClick = (e) => {
        if (!this.state.authenticated){
            this.setAuthUser(this.state.authenticatedUser)
        } else{
            this.setAuthUser('');
            this.setState({authenticatedUser : ''})

        }
        this.state.authenticated ? (this.setState({authenticated : false})) : 
                                    (this.setState({authenticated : true}))
   //     console.log("authenticated: " + this.state.authenticated);
    }

    setAuthUser = ( value ) => {
        // console.log("setAuthenticatedUser");
        // console.log(this.props)
        this.props.dispatch(setAuthenticatedUser(value));
        // console.log("setAuthenticatedUser");
    }

    _onSelect = ( obj ) => {
        // console.log(" _onSelect")
        // console.log(obj)
        // console.log(" _onSelect")

        this.setState({authenticatedUser : obj.value})
    }
    
    render (){
        function isEmpty(val){
            return ( val === undefined || val == null || val.length <= 0 ) ? true : false;
          }
          let users = this.props.users;
          let optionsDyn = [];

        if(!isEmpty(users)){
            let userArray = Object.values(users);

            userArray.map( user => {
                    let object = {
                        value : user.id,
                        label : user.name
                    }
                    // console.log("user");
                    // console.log(object);
                    // console.log("user");
                    optionsDyn.push(object);
                    return optionsDyn; // TODO:
            })
        }
        // console.log("optionsDyn");
        // console.log(optionsDyn);
        // console.log("optionsDyn");
        const defaultOption = optionsDyn[0]; //TODO: fix default option
   
      return(<div className="Login">
                 <div className="component-title"></div>
                 <Dropdown options={optionsDyn} 
                            onChange={this._onSelect} 
                            value={this.state.authenticatedUser} 
                            placeholder="Choose user to login:"/>
                 <button onClick={this.handleClick} name="loginBtn"> 
                     { this.state.authenticated && <div>Logout</div>} 
                     { !this.state.authenticated && <div>Login</div>} 
                </button>
              </div>
              );
    }
}

const mapStateToProps = ( state ) => {
    console.log("inside map state to props Login, state: ", state)
    return {
        state,
        users : state.users,
        authenticatedUser : state.authenticatedUser
      }
}

export default connect(mapStateToProps) (Login);
