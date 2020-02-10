
import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isEmpty } from './Shared'

const PrivateRoute = props => {
    let { component: Component, authenticatedUser, ...rest } = props;
    if (authenticatedUser) {
        return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
        if(!isEmpty(Component) ){
        return <Redirect to='/nomatch' />
     }
       return <Redirect to='/login' />
        
    }
  };


export default PrivateRoute;