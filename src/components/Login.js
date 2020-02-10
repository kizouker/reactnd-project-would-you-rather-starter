import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { fn_other_file, AuthButton, isEmpty } from './Shared'
import { setAuthenticatedUser} from '../actions/authedUser'

/**
 * 
 * what is the difference of using "state" or to use a class variable to
 * remember/persist the state of isAuthenticatedUser?
 * 
 * what is the life cycle of component state?
 * 
 * I know that redux state is more persistant?
 * But How about a state in a js class?
 * 
 */
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {  
            authenticatedUser : '',
            redirectToReferrer: false
      }
      this._onSelectSetAuthUser = this._onSelectSetAuthUser.bind(this);
      this.handleClick = this.handleClick.bind(this)
    }

    // sets the authedUser in the state
    _onSelectSetAuthUser = ( authenticatedUser ) => {
        this.setState({ authenticatedUser },
            () => console.log(`Option selected:`, this.state.authenticatedUser)
            );
    }
    
    authenticate() {
        this.setAuthUser( this.state.authenticatedUser );
    }
    
    signout() {
        this.setState({ authenticatedUser : ''}, 
        () => console.log('authUser', this.state.authenticatedUser));
        this.setAuthUser('');
    }
      
    setAuthUser = ( obj ) => {
        this.props.dispatch(setAuthenticatedUser(obj.value));
    }
         
  handleClick = (e) => { 
    /** vad jag vill är att statet om vi är inloggade ska 
     * 1) finnas globalt => state/store finns det state.authUser
     * 2) login/logout finns "globalt", går att importera
     * 3) login/logout ska visas hela tiden...
     */
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
                    return optionsDyn; // TODO:
            })
        }

        const defaultOption = optionsDyn[0]; //TODO: fix default option
   
      return(<div className="Login">
                 <div className="component-title"></div>
                  <Dropdown options={optionsDyn} 
                            onChange={this._onSelectSetAuthUser} 
                            value={authenticatedUser} 
                            placeholder="Choose user to login:"/>

                 <button onClick={(e) => {this.handleClick(e)}} name="loginBtn"> 

                 { this.props.authenticatedUser && <div>Logout</div>} 
                 { !this.props.authenticatedUser && <div>Login</div>} 

                </button>
                <AuthButton history={this.props.history}/>
              </div>
              );
    }
}

const mapStateToProps = ( state ) => {
    console.log("inside map state to props Login, state: ", state)
    return {
        users : state.users,
        authenticatedUser : state.authenticatedUser.authenticatedUser
      }
}

export default connect(mapStateToProps) (Login);

/****
 * 
 * Problems I faced
 * 1) In _onSelectSetAuthUser = ( obj ) the  this.setState({authenticatedUser : 'tantra'}) is
 * not really set, or is postponed - however the same value is controlled by the dropdown
 * and there it is updated...
 * BUG IN COMP OR WRONG USE...SETSTATE SHOLD JUST USE THE VARIABLE
 * AND THEN THE VALUE IS SET TO ...+ */

