
nextStep();
async function nextStep() {
    var requesturl = `https://lomalaskuribackend.herokuapp.com/aromidata`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', requesturl);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function () {
        if (this.status == 200) {
            onloadDocumentFromContent(this.response);
        }
        else {
            console.log(this.error);
        }
    };
}

function onloadDocumentFromContent(data) {
    var menuJson = JSON.parse(data);
    var nyt = new Date();
    var curDate = nyt.getDate();
    var days = ["maanantai", "tiistai", "keskiviikko", "torstai", "perjantai","lauantai", "sunnuntai"];
    let foodStuff = document.createElement("div");
    document.getElementById("firstFood").innerHTML = "";
    document.getElementById("foodList").innerHTML = "";
    menuJson.Days.forEach((element, index) => {
        var menuDate = new Date(element.Date);
        var tempTitle = document.createElement("h1");
        tempTitle.textContent = days[menuDate.getDay()-1] +  "  " +menuDate.toLocaleDateString("fi-FI");
        if(curDate == menuDate.getDate()) {
            let firstElem = document.getElementById("firstFood");
            let textElem = document.createElement("p");
            textElem.textContent = `Päivän ruoka: ${element.Meals[0].Name} `;
            textElem.setAttribute("id", "FoodGlimpse")
            firstElem.appendChild(textElem);
        }
           
            let listEl = document.getElementById("foodList");
            listEl.appendChild(tempTitle);
            for(let i= 0; i<element.Meals.length; i++ ) {
                let textElem = document.createElement("p");
                textElem.textContent = `${element.Meals[i].MealType}:    ${element.Meals[i].Name} `;
                listEl.appendChild(textElem);
            }
    });
    
}
nextStep().then(() => {
    document.getElementById("Loading").remove();
});