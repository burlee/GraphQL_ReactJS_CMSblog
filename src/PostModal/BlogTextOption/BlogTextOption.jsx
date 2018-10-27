import React from 'react';
import classes from './BlogTextOption.scss'

const BlogTextOption = ({background, enlargeFont, decreaseFont}) => {
  return (
    <div className={classes.BlogTextOption} style={{background: background}}>
      <button onClick={enlargeFont}>+</button>
      <button onClick={decreaseFont}>-</button>
    </div>
  )
}

export default BlogTextOption;