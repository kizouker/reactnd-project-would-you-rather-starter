import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isEmpty } from './Shared'
//Used to route to se if the user is authenticated
//If not the user is re-directed to a Login page
//or if no Component was specified the no-match page appears

const PrivateRoute = props => {
    let { component: Component, path, authenticatedUser, ...rest } = props;
    if (authenticatedUser) {
        return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
      // if not authenticated and on the Answer Poll page => 404 page
      if(!isEmpty(Component) && path.includes('question')){
        return <Redirect to='/nomatch' />
      }
      // else => to home /
      else if(!isEmpty(Component)){
        return <Redirect to='/' />
      }
    // if not authenticated => redirect to /login
    return <Redirect to='/login' />
    }
  };

export default PrivateRoute;