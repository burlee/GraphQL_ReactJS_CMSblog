import React, { Component } from 'react'
import classes from './Navigation.scss'
import { NavLink, Route, Switch } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Home from '../Home/Home';
import CV from '../CV/CV';

export default class Navigation extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className={classes.Navigation}>
                    <ul>
                        <li><NavLink activeStyle={{ color: 'rgb(255, 255, 255, .9)' }} exact to="/">Home</NavLink></li>
                        <li><NavLink activeStyle={{ color: 'rgb(255, 255, 255, .9)' }} exact to="/posts">Artykuły</NavLink></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/posts' component={Posts} />
                    <Route path='/cv' component={CV} />
                </Switch>
            </React.Fragment>
        )
    }
}
