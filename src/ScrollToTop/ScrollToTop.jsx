import React from 'react'
import classes from './ScrollToTop.scss'

export default ({scrollToTop}) => <button onClick={scrollToTop} className={classes.ScrollButton}><i className="fas fa-angle-up"></i></button>
