console.log("DASdsad");
const geocode = require('./utils.js');
const forecast = require("./forecast.js");


const add = (a,b,callback) => {
    setTimeout(()=> {
        callback(a+b);
    },2000);
};


add(1,4,(sum) => {
    console.log(sum);
});



geocode('Philadelphia', (error,data)=> {
    if (error) {
        return console.log(error);
    }
    forecast(data.latitude, data.longitude, (err,forecastdata) => {
        if (err) {
            return console.log(err);
        }
        console.log(data.location);
        console.log(forecastdata);
    })
});

/* forecast(-75.7088, 44.1545, (err,data) => {
    console.log("error", err);
    console.log("Data", data);
}) */
