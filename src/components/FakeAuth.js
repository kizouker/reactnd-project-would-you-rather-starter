import React from 'react';
import { connect } from 'react-redux';
import { setAuthenticatedUser} from '../actions/authedUser'

class FakeAuth extends React.Component {
    constructor(authenticatedUser){
      this.authenticatedUser = authenticatedUser;
      this.isAuthenticated = this.authenticatedUser ? true : false;
    } 
      
  authenticate() {
      this.setAuthUser(this.authenticatedUser);
  }
  signout() {
      this.setAuthUser('');
  }

 setAuthUser = ( value ) => {
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