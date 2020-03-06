import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from './Shared';
import { withRouter } from 'react-router';


//import { NoMatch } from './Menu';
//Used to route to se if the user is authenticated
//If not the user is re-directed to a Login page
//or if no Component was specified the no-match page appears
const PrivateRoute = props => {
    let { component: Component, path, authenticatedUser, ...rest } = props;

    // if the user is authenticated, just Route to the Component
    if ( authenticatedUser ) {
        return <Route {...rest} render={props => {
          return (<Component {...props} />)}
         } />;
    // if the user is not authenticated, and a url was requested such as
    // '/post'/, '/leaderboard', etc - the first redirect the user to '/login'/
    // and then to the original request, i.e. /xxx

    } else {
      let location = props.location;
      let history = props.history;
      
      console.log("location: ", location);
      console.log("path ", history.location);

      if (isEmpty (location)){
        location = history.location;
        console.log("location updated: ", location);
      }

      if(!isEmpty(Component) && !isEmpty(path)){
          if(path.includes('question')){
            return  (<Redirect to={{
              pathname: '/login',
              state: { from : location }
            }} />)
            // return <Redirect to='/nomatch' />
        }
     return(<Redirect to={{
        pathname: '/login',
        state: { from : location }
      }} />)
    }
  }}
  

 export default withRouter(PrivateRoute);