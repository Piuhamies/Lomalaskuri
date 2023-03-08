import request from "request";
var aromiData = [
    { day: "Maanantai", food: "", veganFood: "" },
    { day: "Tiistai", food: "", veganFood: "" },
    { day: "Keskiviikko", food: "", veganFood: "" },
    { day: "Torstai", food: "", veganFood: "" },
    { day: "Perjantai", food: "", veganFood: "" },
];
exports.handler = async function (event, context) {
    request({
        headers: {
            'origin': 'ruokalistat.espoocatering.fi', 'X-Requested-With': 'XMLHttpRequest'
        },
        uri: 'http://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/main/AromiMenusJsonData',
        method: 'Get'
    }, function (err, res, body) {
        if (err) { return console.log(err); }
        aromiJson = JSON.parse(body);
        let intialData = aromiJson;
        var date = new Date();
        var dates = [];
        var endDates = [];
        for (var i in intialData.Restaurants) {
            if (intialData.Restaurants[i].RestaurantId == "2856c0d5-d3f7-e511-bc65-60eb696ec4bb") {
                var restaurantNumber = i;
            }
        };
        for (var i in intialData.Restaurants[restaurantNumber].JMenus) {
            dates.splice(i, 0, intialData.Restaurants[restaurantNumber].JMenus[i].Start);
            endDates.splice(i, 0, intialData.Restaurants[restaurantNumber].JMenus[i].End);
            var parsedDate = Date.parse(date);
            if (parsedDate > Date.parse(dates[i]) && parsedDate < Date.parse(endDates[i])) {
                var dateNumber = i;
                menuFinalId = intialData.Restaurants[restaurantNumber].JMenus[dateNumber].MenuId;
                request({
                    headers: {
                        'origin': 'ruokalistat.espoocatering.fi', 'X-Requested-With': 'XMLHttpRequest'
                    },
                    uri: `https://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/menu/${menuFinalId}`,
                    method: 'Get'
                }, function (err, res, body) {
                    if (err) { return console.log(err); }
                    let json = JSON.parse(body);
                    json.Days.forEach((item, index) => {
                        dayObject = json.Days["" + index];
                        aromiData[index].food = dayObject.Meals[0].Name;
                        aromiData[index].veganFood = dayObject.Meals[1].Name;
                    });
                });
            }
        }
    });
    return {
        statusCode: 200,
        body: JSON.stringify(aromiData),
    };
}