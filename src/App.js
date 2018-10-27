import React, { Component } from 'react';
import classes from './App.scss'
import Navigation from './Navigation/Navigation';
import {withRouter} from 'react-router-dom'

// client.query({
//   query: test
// }).then( ({data : {posts }}) => {
//   const fetchedPosts = posts;

//   fetchedPosts.forEach(({body, id}) => {
//     console.log(body, id)
//   })
// })

class App extends Component {
  
  componentDidMount(){
    window.addEventListener('popstate', this.handleOnUrlChange, false)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleOnUrlChange, false)
  }

  
  handleOnUrlChange = () => {
    if(this.props.location.pathname === '/posts' || this.props.location.pathname === '/'){
      document.body.style.overflow = "visible";
    }
  }

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

export default withRouter(App);
