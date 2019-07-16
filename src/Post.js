import React from 'react';

class Post extends React.Component{
  render (){
    return(<div className="Post" >
          <h2 className="component-title">Post a new question</h2>
          <h3>Would you rather:</h3>
          <div class="form">
            <form>
              <input type ="text" name="Id" placeholder="Give ID"/><br></br>
              <input type ="text" name="alternative1" placeholder="Alternative #1"/><br></br>
              <input type ="text" name="alternative2" placeholder="Alternative #2"/><br></br>
              <input type="submit" value="submit"/>
            </form>
          </div>
        </div>);
  }
 }
 
 export default Post;