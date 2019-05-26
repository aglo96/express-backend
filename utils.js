const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +  '.json?access_token=pk.eyJ1IjoiZGFzZGEiLCJhIjoiY2p0eHcybXFhMmVocDRhcGkxamFhbGd5YyJ9.c9wAdOP23L8uzR28fk--Ag&limit=1';
    request({url:url, json:true}, (err,res)=> {
        if (err) {
            callback("Unable to connect to locaiton services!", undefined);
        }
        else if(res.body.error ) {
            callback('unable to find location',undefined); 
        }
        else {
            callback(undefined,{
                latitude:res.body.features[0].center[0],
                longitude:res.body.features[0].center[1],
                location:res.body.features[0].place_name
        
            })
        }
    });

}

module.exports = geocode;
 


