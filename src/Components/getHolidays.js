import holidayData from "../holidays.json";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    while (date.getTime() < Date.now()) {
        date.setFullYear(date.getFullYear() + 1);
    }
    return date.getTime();
};

export default function formatHolidays(datasetName) {
    let formattedDates = holidayData[datasetName].map(data => {
        data.start = formatDate(data.start);
        data.end = formatDate(data.end);
        return data;
    })
    formattedDates.sort((a, b) => a.end - b.end);
    return formattedDates;
}