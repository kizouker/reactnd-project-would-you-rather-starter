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
            authenticated : false,
            authenticatedUser : '',
            redirectToReferrer: false
      }
      this._onSelect = this._onSelect.bind(this);
      this.handleClick = this.handleClick.bind(this)
    //   this.isAuthenticated = this.isAuthenticated.bind(this)
    }
  fakeAuth = {
    is_Authenticated : false,
    isAuthenticated () {
        //Decides if the user is authenticated in in thate case
        // returns true/false
//        this.props.dispatch(setAuthenticatedUser(authedUser))
        console.log("props: ", this.props);
      let authUser = this.props.authenticatedUser;
      console.log("isAuthenticated " + authUser + " in Login.js");
      if (authUser){
       return true;
      } else {
          return false;
      }
  },
    
    authenticate(cb) {
        this.is_Authenticated = this.isAuthenticated(); // when should I
        // use this.isAuthenticated()
        // this.isAuthenticated
        
        this.setAuthUser(this.state.authenticatedUser);
        setTimeout(cb, 100) // dispatch an action for auth - redirectToReferrer
    },
    signout(cb) {
        this.is_Authenticated = this.isAuthenticated();
        this.setAuthUser('');
        setTimeout(cb, 100)
    }
  }

    handleClick = (e) => { 
    /** vad jag vill är att statet om vi är inloggade ska 
     * 1) finnas globalt => state/store finns det state.authUser
     * 2) login/logout finns "globalt", går att importera
     * 3) login/logout ska visas hela tiden...
     */
     
     let cb;

     console.log("props: ", this.props);
    this.fakeAuth.authenticate(cb);
    //     if (!this.state.authenticated){
    //         this.setAuthUser(this.state.authenticatedUser)
    //     } else{
    //         this.setAuthUser('');
    //         this.setState({authenticatedUser : ''})

    //     }
    //     this.state.authenticated ? (this.setState({authenticated : false})) : 
    //                                 (this.setState({authenticated : true}))
    }

    setAuthUser = ( value ) => {
        // this.props.dispatch(handleInitialData(value));
        this.props.dispatch(setAuthenticatedUser(value));
    }

    _onSelect = ( obj ) => {
        this.setState({authenticatedUser : obj.value})
    }
    
    render (){
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
                            onChange={this._onSelect} 
                            value={this.state.authenticatedUser} 
                            placeholder="Choose user to login:"/>

                 <button onClick={(e) => {this.handleClick(e)}} name="loginBtn"> 
                     { this.state.authenticated && <div>Logout</div>} 
                     { !this.state.authenticated && <div>Login</div>} 
                </button>

                <AuthButton history={this.props.history}/>

                {/* authUser={this.state.authenticatedUser} history={this.props} */}
              </div>
              );
    }
}

const mapStateToProps = ( state ) => {
    console.log("inside map state to props Login, state: ", state)
    return {
        state,
        users : state.users,
        authenticatedUser : state.authenticatedUser.authenticatedUser
      }
}

export default connect(mapStateToProps) (Login);
