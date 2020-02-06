handleClick = (e) => { 
    /** vad jag vill är att statet om vi är inloggade ska 
     * 1) finnas globalt => state/store finns det state.authUser
     * 2) login/logout finns "globalt", går att importera
     * 3) login/logout ska visas hela tiden...
     */
     
     let cb;

     console.log("props: ", this.props);
    this.fakeAuth.authenticate(cb);0
    //     this.state.authenticated ? (this.setState({authenticated : false})) : 
    //                                 (this.setState({authenticated : true}))
    }

    setAuthUser = ( value ) => {
        // this.props.dispatch(handleInitialData(value));
        this.props.dispatch(setAuthenticatedUser(value));
    }

    _onSelect = ( obj ) => {
        this.setState({authenticatedUser : obj.value})
    }
    
    render (){
          let users = this.props.users;
          let optionsDyn = [];
        if(!isEmpty(users)){
            let userArray = Object.values(users);

            userArray.map( user => {
                    let object = {
                        value : user.id,
                        label : user.name
                    }
                    optionsDyn.push(object);
                    return optionsDyn; // TODO:
            })
        }

        const defaultOption = optionsDyn[0]; //TODO: fix default option
   
      return(<div className="Login">
                 <div className="component-title"></div>

                  <Dropdown options={optionsDyn} 
                            onChange={this._onSelect} 
                            value={this.state.authenticatedUser} 
                            placeholder="Choose user to login:"/>

                 <button onClick={(e) => {this.handleClick(e)}} name="loginBtn"> 
                     { this.state.authenticated && <div>Logout</div>} 
                     { !this.state.authenticated && <div>Login</div>} 
                </button>

                <AuthButton history={this.props.history}/>

                {/* authUser={this.state.authenticatedUser} history={this.props} */}
              </div>
              );
    }
}