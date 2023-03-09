import fetch from "node-fetch";
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
    const url = `https://www.compass-group.fi/menuapi/week-menus?language=fi&costCenter=3868&date=${currentDate}`;
    const response = await fetch(url);
    const data = await response.json();
    data.menus.forEach((daysMenu, day) => {
        try {
            console.log(daysMenu);
            const menu = daysMenu.menuPackages[1].meals;
            const veganMenu = daysMenu.menuPackages[0].meals;
            const date = daysMenu.date;

            let food = []
            menu.forEach((item, index) => {
                food.push(item.name);
                food.push(index === menu.length - 2 ? " ja " : ", ");
            });
            food.pop();
            food = food.join("");

            let veganFood = []
            veganMenu.forEach((item, index) => {
                veganFood.push(item.name);
                veganFood.push(index === menu.length - 2 ? " ja " : ", ");
            });
            veganFood.pop();
            veganFood = veganFood.join("");

            otaniemiData[day].food = food;
            otaniemiData[day].veganFood = veganFood;
        } catch (e) {
            console.error(e);   
        }
    });
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otaniemiData),
    };
}