import React from 'react';
import {Redirect} from 'react-router-dom';

export default class QuickOtaniemiRuokalista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false, ready: true, todaysRuokalista: null, ruokalista: null};
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect push to={`${this.props.href}`} />: (
            <div className="quickBox anim active">
                <div className="quickBoxLeft">
                    
                    <h1 className="quickTitle" >Päivän ruokalista:</h1>
                {this.state.ready === true ? (<>
                <div id="firstFood" className="quickContent">
                    <h1>To be implemented</h1>
                </div>
            </>) : (<div id="Loading" className="loader quickLoader">
        <div className="loader-inner square-spin">
        <div></div>
       </div>
        </div>)  }
        </div>
        <div onClick={redirect} className="quickBoxRight">
            <div className="quickWhite arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>
            </div>
        </div>
        );
    }
}