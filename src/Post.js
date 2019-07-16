import React from 'react';

class Post extends React.Component{
  render (){

    //formatQuestion
    return(<div className="Post" >
          <h2 className="component-title">Post a new question</h2>
          <h3>Would you rather:</h3>
          <div class="form">
            <form>
            <textarea rows="3" cols="100" placeholder="Question">
              </textarea>
              <br></br>
              <textarea rows="3" cols="100" placeholder="alternative1">
              </textarea>
              <br></br>
              <textarea rows="3" cols="100" placeholder="alternative2">
              </textarea>
              <br></br>
              <input type="submit" value="submit"/>
            </form>
          </div>
        </div>);
  }
 }
 
 export default Post;