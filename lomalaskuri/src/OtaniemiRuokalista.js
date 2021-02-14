import React from 'react';
export class OtaniemiRuokalista extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todaysRuokalista: null, ruokalista: null };
    }

    componentDidMount() {

        nextStep();
        onloadDocumentFromContent = onloadDocumentFromContent.bind(this);
        function nextStep() {
            var requesturl = `https://lomalaskuribackend.herokuapp.com/otaniemidata`;
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
            document.getElementById("Loading").remove();
            let foodlist = document.getElementById("foodList");
            foodlist.innerHTML = data;
            //poistetaan alusta turha roska
            foodlist.firstChild.remove();
            foodlist.firstChild.remove();
            foodlist.firstChild.remove();

            document.getElementById("foodList").style.display = "block";
        }
    }
    componentDidCatch() {
        console.log("sinä joka luet tätä, älä rämputä niitä välilehtiä niin nopeasti")
    }
    render() {
        return (
            <div id="show">
                <h1>Ruokalistat</h1>
                <div id="Loading" class="loader">
                    <div class="loader-inner square-spin">
                        <div></div>
                    </div>
                </div>
               {/* <div id="firstFood">{this.state.todaysRuokalista}</div>*/}
                <div id="foodListPos">
                    <div id="foodList">{this.state.ruokalista}</div>
                </div>
                <div id="the-canvas"></div>
            </div>
        )
    }
}