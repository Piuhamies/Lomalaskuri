import React from 'react';
import {Redirect} from 'react-router-dom';



export default class QuickRuokalista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false, ready: false, todaysRuokalista: null, ruokalista: null};
    }
    componentDidMount() {
        nextStep();
        onloadDocumentFromContent = onloadDocumentFromContent.bind(this);
         async function nextStep() {
            var requesturl = `https://lomalaskuribackend.herokuapp.com/aromidata`;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', requesturl);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            xhr.onload = function () {
                if (this.status === 200) {
                    onloadDocumentFromContent(this.response);
                }
                else {
                    console.log(this.error);
                }
            };
        }
        function onloadDocumentFromContent(data) {
            try {
                var menuJson = JSON.parse(data);
            }
            catch {
                console.log("Unable to fetch food data");
                let textElem = (<div className="quickText quickRuokalista"><p id="FoodGlimpse">Tänään ei ole kouluruokailua</p> </div>); //luotetaan siihen, ettei ruokailua ole jos ruokalistojen haku epäonnistuu
                this.setState({ready: true, todaysRuokalista: textElem });
                return;
            }
            var nyt = new Date();
            var curDate = nyt.getDate();
            var days = ["sunnuntai","maanantai", "tiistai", "keskiviikko", "torstai", "perjantai","lauantai"];
            var paivanNimi = <h1 className="alaotsikot" >{days[nyt.getDay()] +  "  " +nyt.toLocaleDateString("fi-FI")}:</h1>
            this.setState({ready: true, todaysRuokalista: (<>{paivanNimi} <div className="quickText quickRuokalista"><p>Tänään ei ole kouluruokailua</p> </div> </> )});
            menuJson.Days.forEach((element, index) => {
                var menuDate = new Date(element.Date);
                var tempTitle = <h1 className="alaotsikot">{days[menuDate.getDay()-1] +  "  " +menuDate.toLocaleDateString("fi-FI")}</h1>
                if(curDate === menuDate.getDate()) {
                    let textElem = (<div className="quickText quickRuokalista"><p key={element.Meals[0].Name + "Key"} id="FoodGlimpse">Päivän ruoka: {element.Meals[0].Name} </p> </div>);
                    console.log(textElem);
                    this.setState({ready: true, todaysRuokalista: textElem });
                }
                    
            });
        }
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
                    {this.state.todaysRuokalista}
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