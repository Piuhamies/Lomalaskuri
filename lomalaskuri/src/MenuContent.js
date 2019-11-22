import React from 'react';
import { BrowserRouter as Router,
    Switch,
    Route,
    Redirect, 
    Link } from 'react-router-dom';

export class MenuContent extends React.Component {
    render() {
        return (
            <>
            <Router> 
                {this.props.schools[this.props.selectedSchool].menuItems.map((x, index) => (<Link key={"Menu" + index }>{x}</Link>)
        )} </Router>
        </>
            );
    }
}