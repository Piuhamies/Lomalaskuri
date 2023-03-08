const request = require('request');
const fetch = require('node-fetch');
var otaniemiData = [
    { day: "Maanantai", food: "", veganFood: "" },
    { day: "Tiistai", food: "", veganFood: "" },
    { day: "Keskiviikko", food: "", veganFood: "" },
    { day: "Torstai", food: "", veganFood: "" },
    { day: "Perjantai", food: "", veganFood: "" },
]
exports.handler = async function (event, context) {
    const newDate = new Date();
    const currentDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    const url = `https://www.amica.fi/api/restaurant/menu/week?language=fi&restaurantPageId=330303&weekDate=${currentDate}`;
    const response = await fetch(url);
    const data = await response.json();
    const weekMenu = data.LunchMenus;
    for (const day in weekMenu) {
        try {
            let menu = weekMenu[day].SetMenus[1].Meals;
            let veganMenu = weekMenu[day].SetMenus[0].Meals;
            let date = weekMenu[day].DayOfWeek;

            let food = []
            for (item in menu) {
                food.push(menu[item].Name);
            }
            food = food.join(" ja ");

            let veganFood = []
            for (item in veganMenu) {
                veganFood.push(veganMenu[item].Name);
            }
            veganFood = veganFood.join(" ja ");

            otaniemiData[day].day = date;
            otaniemiData[day].food = food;
            otaniemiData[day].veganFood = veganFood;
        } catch (e) {
            if (!(e instanceof TypeError)) {
                console.error(e);
            }
        }
    }
    return {
        statusCode: 200,
        body: otaniemiData,
    };
}