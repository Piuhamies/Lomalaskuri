import React from 'react';
import { Link } from 'react-router-dom';
import darkModeIcon from './icons8-moon-symbol.svg';

export class NewSchoolSelector extends React.Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.props.toggleTheme(this.props.themes.login);
    }
    componentDidMount() {
        this.props.toggleTheme(this.props.themes.login, true)
    }
    render() {
        return (
            <>
            <div class="login">
                
                <h1>Tervetuloa Lomalaskuriin!</h1>
                <div class="loginOptions">
                <h2> Valitse koulusi: </h2>
                <p> sveverionjonne </p>
                {this.props.schools.map((x, index) => (<Link onChange={() => console.log("change")} key={"kouluValinta" + index} className="schoolSelection" to={x.href + "/" + x.menuItems[0].nimi}>{x.schoolName}</Link>))}
                </div>
                <img class="darkIcon" alt="vaihda dark themeen" onClick={this.toggle} src={darkModeIcon} />
            </div>
            </>
        );
    }
}
