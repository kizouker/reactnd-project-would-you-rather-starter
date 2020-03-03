import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { isEmpty } from './Shared'
import { setAuthenticatedUser} from '../actions/authedUser'
import { withRouter } from 'react-router';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {  
            authenticatedUser : '',
      }
      this._onSelectSetAuthUser = this._onSelectSetAuthUser.bind(this);
      this.handleClick = this.handleClick.bind(this)
      this.authenticate = this.authenticate.bind(this)
      this.signout = this.signout.bind(this)
      
    }

    _onSelectSetAuthUser = ( authenticatedUser ) => {
        this.setState({ authenticatedUser },
            () => console.log(`Option selected:`, this.state.authenticatedUser)
            );
    }
    
    authenticate() {
        let history = this.props.history;
        console.log("history ", history)
        this.setAuthUser( this.state.authenticatedUser );
        history.push('/');
    }
        
    signout() {
        this.setState({ authenticatedUser : ''}, 
        () => console.log('authUser', this.state.authenticatedUser));
        this.setAuthUser('');
    }
      
    setAuthUser = ( obj ) => {
        this.props.dispatch(setAuthenticatedUser(obj.value));
    }
         
  handleClick = () => { 
        this.props.authenticatedUser ? this.signout() : this.authenticate();
       }  
    render (){
        const { authenticatedUser } = this.state;
          let users = this.props.users;
          let optionsDyn = [];
        if(!isEmpty(users)){
            let userArray = Object.values(users);

            userArray.map( user => {
                    let object = {
                        value : user.id,
                        label : user.name
                    }
                    optionsDyn.push(object);
                    return optionsDyn;
            })
        }

      return(<div className="Login">
                 <div className="component-title"></div>
                  <Dropdown options={ optionsDyn } 
                            onChange={ this._onSelectSetAuthUser } 
                            value={ authenticatedUser } 
                            placeholder="Choose user to login:"/>
            
                 <button onClick={e => this.handleClick(e)} 
                    name="loginBtn"> 
                {/*** Checks if the user is autheticated and shows the
                * appropriate button "Login" or "Logout" */}
                 { this.props.authenticatedUser && <div>Logout</div>} 
                 { !this.props.authenticatedUser && <div>Login</div>} 
                </button>
              </div>
              );
    }
}

const mapStateToProps = ( state ) => {
    return {
        users : state.users,
        authenticatedUser : state.authenticatedUser.authenticatedUser
      }
}

export default withRouter(connect(mapStateToProps) (Login));