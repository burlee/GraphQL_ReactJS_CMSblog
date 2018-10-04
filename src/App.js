import React, { Component } from 'react';
import classes from './App.scss'
import Navigation from './Navigation/Navigation';



// client.query({
//   query: test
// }).then( ({data : {posts }}) => {
//   const fetchedPosts = posts;

//   fetchedPosts.forEach(({body, id}) => {
//     console.log(body, id)
//   })
// })

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <div className={classes.Wrapper}>
            <Navigation/>
          </div>
      </React.Fragment>
    );
  }
}

export default App;
