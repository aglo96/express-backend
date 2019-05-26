const request = require('request');



const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/99c3f0a789127a64076721f2b791bf82/' + latitude + ',' + longitude;
    request({url:url, json:true}, (err,res)=> {
        if (err) {
            callback("Unable to connect to weather services!",undefined);
        }
        else if(res.body.error) {
            callback('unable to find location',undefined); 
        }
        else {
            callback(undefined, res.body.daily.data[0].summary)
        }
    });

}
module.exports=forecast;
