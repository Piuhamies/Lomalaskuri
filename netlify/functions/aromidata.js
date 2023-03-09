import fetch from "node-fetch";
var aromiData = [
    { day: "Maanantai", food: "", veganFood: "" },
    { day: "Tiistai", food: "", veganFood: "" },
    { day: "Keskiviikko", food: "", veganFood: "" },
    { day: "Torstai", food: "", veganFood: "" },
    { day: "Perjantai", food: "", veganFood: "" },
]
    exports.handler = async function (event, context) {

        //Find the menu url
        const restaurantId = "2856c0d5-d3f7-e511-bc65-60eb696ec4bb";
        const url = "http://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/main/AromiMenusJsonData";
        const response = await fetch(url);
        const data = await response.json();
        const restaurantObj = data.Restaurants.find((obj) => obj.RestaurantId === restaurantId);
        const curDate = new Date();
        const menuObj = restaurantObj.JMenus.find((menu) => {
            const startDate = new Date(menu.Start);
            const endDate = new Date(menu.End);
            return startDate < curDate && endDate > curDate;
        });
        const menuUrl = "https:" + menuObj.LinkUrl;


        //Get the menu contents
        const menuResponse = await fetch(menuUrl);
        const menuData = await menuResponse.json();
        menuData.Days.forEach((item, index) => {
            aromiData[index].food = item.Meals[1].Name;
            aromiData[index].veganFood = item.Meals[0].Name;
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aromiData),
        };
    }