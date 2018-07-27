onmessage = function (data) {
    data = data.data;
    let mapData = [];
    let year = +data[0].t.substring(0, data[0].t.indexOf('-'));
    mapData.push({
        year: year,
        minTemperature: data[0].v,
        MaxTemperature: data[0].v,
        averageTemperature: 0
    });
    let index = 0;
    for (let entry of data) {
        let nextYear = +entry.t.substring(0, entry.t.indexOf('-'));
        if (nextYear != year) {
            let daysInYear = ((year % 100) != 0 || (year % 400) == 0) ? 366: 355;
            mapData[index].averageTemperature /= daysInYear;
            mapData.push({
                year: nextYear,
                minTemperature: entry.v,
                MaxTemperature: entry.v,
                averageTemperature: 0
            });
            index++;
            year = nextYear;
        } else {
            let minTemperature = mapData[index].minTemperature;
            let MaxTemperature = mapData[index].MaxTemperature;
            mapData[index].minTemperature = minTemperature > entry.v ? entry.v : minTemperature;
            mapData[index].MaxTemperature = MaxTemperature < entry.v ? entry.v : MaxTemperature;
            mapData[index].averageTemperature += entry.v;

        }

    }
    let daysInYear = ((year % 100) != 0 || (year % 400) == 0) ? 366: 355;
    mapData[index].averageTemperature /= daysInYear;
    postMessage(mapData);
}