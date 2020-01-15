import React from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends React.Component{
  
  render (){
    const { users } = this.props;
    let foo;
    let userAnswers_Array;
    let usersArray = Object.values(users);;    
    console.log("leaderboard", users)
      // sorting the mapped array containing the reduced values
      let sum = 0;
        var mappedUsersSum = usersArray.map(function(user, i) {
          if (!isEmpty(users.answers)){
            userAnswers_Array = Object.values(users.answers);
            sum = userAnswers_Array.length;
            console.log("user", userAnswers_Array);
          } else if(!isEmpty(user.questions)){
            sum = sum + user.questions.length;
            console.log("user.questions.",user.questions)
          }
        return { index: i, sum};
      })

      mappedUsersSum.sort(function(a, b) {
        if (a.sum > b.sum) {
          return 1;
        }
        if (a.sum < b.sum) {
          return -1;
        }
        return 0;
      });
  
      // container for the resulting order
      var sortedArray = mappedUsersSum.map(function(el){
        console.log("sort element", el);
        return usersArray[el.index];
      });

    return(<div className="LeaderBoard">
              <h2 className="component-title">LeaderBoard</h2>
              <h3>Other people have voted like this...</h3>  
              <table align="center">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Image</th>
                  <th># answered</th>
                  <th># asked</th>
                </tr>
              </thead>
              <tbody>
                {foo = sortedArray.map(user => {
                   if (!isEmpty(user.answers)){
                      userAnswers_Array = Object.values(user.answers);
                        console.log("user.answers. ----",userAnswers_Array)
                      }
                    return(
                    <tr key={user.id}>
                      <td>{user.name}</td>  
                      <td><img src={window.location.origin + user.avatarURL} width="10%" height="10%"/></td>
                      <td>{userAnswers_Array.length}</td>  
                      <td>{user.questions.length}</td>
                    </tr>);
                    })
                  }
                </tbody>
              </table>
            </div>)
      }
}

 function mapStateToProps(state)  {
   return {
    users : state.users,
   }
 }
 export default connect(mapStateToProps) (LeaderBoard);

 function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0  ) ? true : false;
}

