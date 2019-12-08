import React from 'react';
import Cookie from 'js-cookie';
import { Link, Redirect } from 'react-router-dom'


export class DefaultMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {curSchool: null, reset: false, prevReset:false};
        this.changeSchool = this.changeSchool.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        let curSchoolUrl = window.location.pathname.substring(1, window.location.pathname.indexOf("/", 1));
        let curSchoolElem = props.schools[props.schools.findIndex(i => i.href === curSchoolUrl)];
        var properties = curSchoolElem != null && curSchoolElem  !== "undefined" ?  curSchoolElem.theme : props.schools[0].theme ;
        properties.forEach((elem, index) => {
            document.documentElement.style.setProperty(elem.nimi, props.isDarkMode ? elem.dark : elem.light);
           });
        if(state.reset === true && state.prevReset === false) {
            return {curSchool: { 'curSchoolUrl': curSchoolUrl, 'curSchoolElem':curSchoolElem}, reset: true, prevReset: true}
        }
        else if(state.reset === true && state.prevReset === true) {    
            return {curSchool: { 'curSchoolUrl': curSchoolUrl, 'curSchoolElem':curSchoolElem}, reset: false, prevReset: false}
        }
        else {
            return {curSchool: { 'curSchoolUrl': curSchoolUrl, 'curSchoolElem':curSchoolElem}}
        }
    }
    toggle = () =>  {
        let darkMode = this.props.isDarkMode;
        console.log(this.props.isDarkMode);
        var properties = this.state.curSchool.curSchoolElem != null && this.state.curSchool.curSchoolElem  !== "undefined" ?  this.state.curSchool.curSchoolElem.theme : this.props.schools[0].theme ;
        this.props.updateDarkMode(properties);
    }
    changeSchool() {
        Cookie.set('site', null);
        this.setState({reset:true, prevReset: false});
    }
    render() {
        let curSchool = this.state.curSchool.curSchoolElem ? this.state.curSchool.curSchoolElem : this.props.schools[0];
        console.log(this.state.curSchool);
        let menuItems = curSchool.menuItems.map((x) => <Link key={`menuItem${x.nimi}`} to={"/"+ curSchool.href +"/"+ x.nimi}>{x.nimi}</Link>);
        console.log("render");
        console.log(this.state);
        return ( this.state.reset ? <Redirect to="/" /> : 
        <>
            {menuItems}
        <button class="linkLookALike" onClick={this.toggle}id="dynaaminenNappi">Vaihda teemaa</button>
            <button class="linkLookALike"  onClick={this.changeSchool}> Vaihda koulua</button>
        </>
        );
    }
}