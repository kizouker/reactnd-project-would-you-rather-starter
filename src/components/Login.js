import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { connect } from 'react-redux';

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
        function isEmpty(val){
            return ( val === undefined || val == null || val.length <= 0  ) ? true : false;
          }
      //  console.log(this.props.users);
        const options1 = [
            'one', 'two', 'three'
          ]

          // get the users id:s and handle and pop in the dropdown

          // when one user is selected and press login  - the user handle is set in the store
          const options2 = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two', className: 'myOptionClassName' },
          ]

          let users = this.props.users;
          let optionsDyn = [];

        if(!isEmpty(users)){
            let userArray = Object.values(users);

            userArray.map( user => {
                    let object = {
                        value : user.id,
                        label : user.name
                    }
                    console.log("user");
                    console.log(object);
                    console.log("user");
                    optionsDyn.push(object);
            })
        }
        console.log("optionsDyn");
        console.log(optionsDyn);
        console.log("optionsDyn");

          const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two', className: 'myOptionClassName' },
          ]
 
        const defaultOption = optionsDyn[0]; 

      return(<div className="Login">
                 <h2 className="component-title">Login</h2>
                 <Dropdown options={optionsDyn} 
                            onChange={this._onSelect} 
                            value={defaultOption} 
                            placeholder="Choose user to login:"/>

                 <button onClick={this.handleClick} name="loginBtn"> 
                     { this.state.authenticated && <div>Logout</div>} 

                           
                     { !this.state.authenticated && <div>Login</div>} 
                </button>
              </div>
              );
    }
}

const mapStateToProps = ( state ) => {
    console.log("inside map state to props Login, state: ", state)

    return {
        users : state.users,
      }
}

export default connect(mapStateToProps) (Login);
