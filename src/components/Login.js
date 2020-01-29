import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { fn_other_file, AuthButton } from './Shared'

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
    }
     
    handleClick = (e) => {
/** vad jag vill är att statet om vi är inloggade ska 
 * 1) finnas globalt => state/store finns det state.authUser
 * 2) login/logout finns "globalt", går att importera
 * 3) login/logout ska visas hela tiden...
 */
      fn_other_file();
        if (!this.state.authenticated){
            this.setAuthUser(this.state.authenticatedUser)
        } else{
            this.setAuthUser('');
            this.setState({authenticatedUser : ''})

        }
        this.state.authenticated ? (this.setState({authenticated : false})) : 
                                    (this.setState({authenticated : true}))
    }

    setAuthUser = ( value ) => {
        this.props.dispatch(handleInitialData(value));
    }

    _onSelect = ( obj ) => {
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
