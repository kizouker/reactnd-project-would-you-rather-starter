import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { isEmpty } from './Shared'
import { setAuthenticatedUser} from '../actions/authedUser'
import { withRouter } from 'react-router';
// import withRouter  from './ComponentWithRouterProp.js'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { CompatRouter } from 'react-router-dom-v5-compat';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {  
            authenticatedUser : '',
            redirectFromReferrer : false
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
  
        this.setState({ redirectFromReferrer: true }, 
            () => console.log("redirectFromReferrer", this.state.redirectFromReferrer));
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
        const { users } = this.props;

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if ( this.state.redirectFromReferrer ){
            return <Redirect to = {from}/>
        } else {
            console.log ("no REDIRECT");
        }

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
       
      return(
     <Router>
      
                {/* <CompatRouter> */}
                <div className="Login">
                 
                { !this.props.authenticatedUser &&
                    <div className="dropdown">
                        <Dropdown options={ optionsDyn } 
                                    onChange={ this._onSelectSetAuthUser } 
                                    value={ authenticatedUser } 
                                    placeholder="Choose user to login:"/>
                    
                        
                    </div>
                }

                 <button onClick={e => this.handleClick(e)} name="loginBtn"> 
                    { !this.props.authenticatedUser && <div>Login</div>}
                    { this.props.authenticatedUser && <div>Logout</div>} 
                </button>
              </div>
              {/* </CompatRouter> */}
             </Router> 
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