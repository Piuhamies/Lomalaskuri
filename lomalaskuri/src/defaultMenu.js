import React from 'react';
import Cookie from 'js-cookie';
import { Link, Redirect } from 'react-router-dom'


export class DefaultMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {curSchool: null, reset: false, prevReset:false};
        this.changeSchool = this.changeSchool.bind(this);
    }
    componentDidMount() {
        let curSchoolUrl = window.location.pathname.substring(1, window.location.pathname.indexOf("/", 1));
        let curSchoolElem = this.props.schools[this.props.schools.findIndex(i => i.href === curSchoolUrl)];
        var properties = curSchoolElem != null && curSchoolElem  !== "undefined" ?  curSchoolElem.theme : this.props.schools[0].theme ;
        this.props.updateDarkMode(properties, true);
        if(this.state.reset === true && this.state.prevReset === false) {
            this.setState({curSchool: { 'curSchoolUrl': curSchoolUrl, 'curSchoolElem':curSchoolElem}, reset: true, prevReset: true});
        }
        else if(this.state.reset === true && this.state.prevReset === true) {    
            this.setState ({curSchool: { 'curSchoolUrl': curSchoolUrl, 'curSchoolElem':curSchoolElem}, reset: false, prevReset: false});
        }
        else {
            this.setState({curSchool: { 'curSchoolUrl': curSchoolUrl, 'curSchoolElem':curSchoolElem}} );
        }
    }
    toggle = () =>  {
        console.log(this.props.isDarkMode);
        var properties = this.state.curSchool.curSchoolElem != null && this.state.curSchool.curSchoolElem  !== "undefined" ?  this.state.curSchool.curSchoolElem.theme : this.props.schools[0].theme ;
        this.props.updateDarkMode(properties);
    }
    changeSchool() {
        Cookie.set('site', null);
        this.setState({reset:true, prevReset: false});
    }
    render() {
        let curSchool = this.state.curSchool !== null ? this.state.curSchool.curSchoolElem : this.props.schools[0];
        console.log(this.state.curSchool);
        let menuItems = curSchool.menuItems.map((x) => <Link key={`menuItem${x.nimi}`} to={"/"+ curSchool.href +"/"+ x.nimi}>{x.nimi}</Link>);
        console.log("render");
        console.log(this.state);
        return ( this.state.reset ? <Redirect to="/" /> : 
        <>
            {menuItems}
        <button className="linkLookALike" onClick={this.toggle}id="dynaaminenNappi">Vaihda teemaa</button>
            <button className="linkLookALike"  onClick={this.changeSchool}> Vaihda koulua</button>
        </>
        );
    }
}