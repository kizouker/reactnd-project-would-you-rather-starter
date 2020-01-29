import { withRouter, Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import React from 'react';



export const fn_other_file = (state) => {
 console.log("other file");
}


export function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0  ) ? true : false;
  }
  
 export function isEmptyObj(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

 export function isEmptyAndObj(val){
    return (val === undefined || val == null || val.length <= 0  || isEmptyObj(val)) ? true : false;
  }
      
// behöver komma åt state.authuser? men då behöver det vara en compont?
// ok men skicka in det som argument då...


export class AuthButton extends React.Component{
    redirectToHome = () => {
        console.log("rth---")
        const { history } = this.props;
        if ( history ){
            history.push("/");
        }
    }
    
    render(){
        const { history } = this.props;

        
        return(<div>
            {console.log("history: ", history)}
            {history ? (
            <div onClick={this.redirectToHome} >go to home..</div>)
            :
            (<div>oops</div>)}
        </div>);
    }

}

export default withRouter(AuthButton);

// export const AuthButton2 = withRouter({ history }, {authUser}) => {(
//     authUser ? (
//       <p>
//         Welcome! <button onClick={() => {
//           fakeAuth.signout(() => history.push('/'))
//         }}>Sign out</button>
//       </p>
//     ) : (<p>You are not logged in.</p>)
//   )}