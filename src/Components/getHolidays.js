import holidayData from "../holidays.json";

const formatDate = (dateString) => {
    let date = new Date(dateString);
    while (date.getTime() < Date.now()) {
        date.setFullYear(date.getFullYear() + 1);
    }
    return date.getTime();
};

export default function formatHolidays(datasetName) {
    return (holidayData[datasetName].map(data => {
        data.start = formatDate(data.start);
        data.end = formatDate(data.end);
        return data;
    }));
}