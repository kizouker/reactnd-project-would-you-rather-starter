import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from './Shared';
import { NoMatch } from './Menu';

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

     return  (<Redirect to={{
        pathname: '/login',
        state: { from : props.location }
      }} />)

      // (<Redirect to={{
      //   pathname: '/login',
      //   state: { redirected : true }
      // }} />)

      // if not authenticated and on the Answer Poll page => 404 page
      // if(!isEmpty(Component) && !isEmpty(path)){
      //   if(path.includes('question')){
          
      //     return <Redirect to='/nomatch' />
      //   }
      //   else if(path.includes('post')){
      //     return <Redirect to='/login' />
      //   }
      //   else if(path.includes('leaderboard')){
      //     return <Redirect to='/login' />
      //   }
      //   else if(path==='/'){
      //     return <Redirect to='/' />
      //   }
      //     // console.log("nomatch");
      //     // return <Redirect to='/nomatch' />
          
      // } else if(!isEmpty(Component)){
      //   console.log("nomatch");
      //   // return <Redirect to='/nomatch' />
      //   return <NoMatch/>
      // }
    }
  };

export default PrivateRoute;