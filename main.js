
var lat;
var long;

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    document.getElementById("long").innerHTML = position.coords.latitude;
    document.getElementById("lat").innerHTML = position.coords.longitude;
}

//==========================
// Get GeoCoordinates
//==========================


var options = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);


//==========================
// Get GeoCoordinates
//==========================

function getApi(){
  if (lat && long) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" + "lon=" + long + "&APPID=8ce8d052973edd56b69fdc48d4309715",
        success: function(result) {
            console.log(result);
        }
    });
  }
}
//
// $(document).ready(function() {
//
//
//
//     // function getWeather() {
//     //     $.ajax({
//     //         url: "http://api.openweathermap.org/data/2.5/forecast?id=702550&APPID=8ce8d052973edd56b69fdc48d4309715",
//     //         success: function(result) {
//     //             console.log(result);
//     //         }
//     //     });
//     // }
//     //
//     // getWeather();
// });
