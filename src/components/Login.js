import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            authenticated : false,
        }

    }

    handleClick = () => {
        this.state.authenticated ? (this.setState({authenticated : false})) : 
                                    (this.setState({authenticated : true}))

        console.log("authenticated : " + this.state.authenticated);
    }
    render (){
      return(<div className="Login">
                 <h2 className="component-title">Login</h2>
                 <button onClick={this.handleClick} name="loginBtn"> 
                     { this.state.authenticated && <div>Logout</div>} 

                           
                     { !this.state.authenticated && <div>Login</div>} 
                </button>
              </div>
              );
    }
}

export default Login;