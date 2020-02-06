import React from 'react';
import { connect } from 'react-redux';
import { setAuthenticatedUser} from '../actions/authedUser'

class FakeAuth extends React.Component {
    constructor(authenticatedUser){
      this.authenticatedUser = authenticatedUser;
      this.isAuthenticated = this.authenticatedUser ? true : false;
    } 

  // define a constructor - then you can pass authenticatd+authUser and use them
  // in the methods...
//   is_Authenticated : this.authenticatedUser ? true : false,
 

  // is_Authenticated : this.is_Authenticated ? 
  //                                     (this.setState({authenticated : false })) : 
  //                                     (this.setState({authenticated : true })),

  // isAuthenticated () {
  //   console.log("is_Authenticated: ", this.is_Authenticated);
  //   console.log("isAuthenticated " + this.authenticatedUser  + " in Login.js");
  //   if (authUser){
  //     console.log("true")
  //     return true;
  //   } else {
  //     console.log("false")
  //     return false;
  //   }
  // },
      
  authenticate() {
      // this.is_Authenticated = this.isAuthenticated(); 
      
      this.setAuthUser(this.authenticatedUser);
      // setTimeout(cb, 100) // dispatch an action for auth - redirectToReferrer
  }
  signout() {
      // this.is_Authenticated = this.isAuthenticated();
      this.setAuthUser('');
      // setTimeout(cb, 100)
  }

 setAuthUser = ( value ) => {
    // this.props.dispatch(handleInitialData(value));
    console.log("props", this.props);
    this.props.dispatch(setAuthenticatedUser(value));
    }
}

const mapStateToProps = ( state ) => {
    console.log("inside map state to props Login, state: ", state)
    return {
        users : state.users,
        authenticatedUser : state.authenticatedUser.authenticatedUser
      }
}
export default connect(mapStateToProps) (FakeAuth);