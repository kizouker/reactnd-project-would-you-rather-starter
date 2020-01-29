
import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isEmpty } from './Shared'

const PrivateRoute = props => {
    // console.log("Props: ", props);
    let { component: Component, authenticatedUser, ...rest } = props;
    if (authenticatedUser) {
        // console.log("Comp name", Component.WrappedComponent.name)
        return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
        if(!isEmpty(Component) && !isEmpty(Component.WrappedComponent)){
        console.log("Comp name", Component.WrappedComponent.name)
        return <Redirect to='/nomatch' />
        // component.WrappedComponent.name)
     }
       return <Redirect to='/login' />
        
    }
  };


export default PrivateRoute;