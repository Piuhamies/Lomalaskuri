corsRequest = function (uri, success) {

    var ajaxParams = {
        url: uri,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        data: '',
        success: success
    };

    return $.ajax(ajaxParams);
};

//Wuuhuuu nyt tämä ruokalista toimii
var menuFinalId = "";
function loadData() {
    corsRequest("https://cors-anywhere.herokuapp.com/http://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/main/AromiMenusJsonData", function (data) {
        var intialData = data;
        console.log(intialData);
        var date = new Date();
        var dates = [];
        var endDates = [];
        for (var i in intialData.Restaurants) {
            if (intialData.Restaurants[i].RestaurantId == "2856c0d5-d3f7-e511-bc65-60eb696ec4bb") {
                var restaurantNumber = i;
            }
        };
        for (var i in intialData.Restaurants[restaurantNumber].JMenus) {
            console.log("hi");
            dates.splice(i, 0, intialData.Restaurants[restaurantNumber].JMenus[i].Start);
            endDates.splice(i, 0, intialData.Restaurants[restaurantNumber].JMenus[i].End);
            var parsedDate = Date.parse(date);
            if (parsedDate > Date.parse(dates[i]) && parsedDate < Date.parse(endDates[i])) {
                var dateNumber = i;
                console.log(Date.parse(dates[i]));
                console.log(parsedDate);
                menuFinalId = intialData.Restaurants[restaurantNumber].JMenus[dateNumber].MenuId;
                nextStep();
            }
        }
    });
};

$(".loader").show();
loadData();
function nextStep() {
    var requesturl = `https://cors-anywhere.herokuapp.com/https://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/menu/${menuFinalId}`;
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
    var curDay = nyt.getDay();
    if(curDay >menuJson.Days[length]) {
        curDay = menuJson.Days[length];
    }
console.log(menuJson);
    var first = document.getElementById("firstFood");
    var title = document.createElement("h1");
    var days = ["maanantai", "tiistai", "keskiviikko", "torstai", "perjantai","lauantai", "sunnuntai"];
    var menuDate = new Date(Date.parse(menuJson.Days[curDay].Date));
    title.textContent = days[curDay] +  "  " +menuDate.toLocaleDateString("fi-FI");
    first.appendChild(title);
    menuJson.Days.forEach((element, index) => {
        console.log(element);
    });
}