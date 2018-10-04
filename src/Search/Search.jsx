import React, { Component } from 'react';
import classes from './Search.scss'
import {DebounceInput} from 'react-debounce-input';

class Search extends Component {
  state = {
    position: 'inherit'
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let posY = window.scrollY;
    if(posY >= 100){
      this.setState({position: 'fixed'})
    }else{
      this.setState({position: 'inherit'})
    }
  }

  render() {
    const { searchTerm } = this.props;
    return (
      <div className={classes.Search} style={{position: this.state.position}}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={searchTerm} 
          placeholder="Wyszukaj artykułu..."
          />
        <div>
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-github-square"></i>
        </div>
      </div>
    )
  }
}

export default Search;
