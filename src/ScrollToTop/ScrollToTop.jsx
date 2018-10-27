import React from 'react';
import classes from './ScrollToTop.scss';

export default () => {
    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }
    return (<button onClick={scrollToTop} className={classes.ScrollButton}><i className="fas fa-angle-up"></i></button>)
}
