var lat;
var long;
var objData;
var date = new Date();
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (date.getDay() > 4) {
    document.getElementById("dayThreeName").innerHTML = week[date.getDay() - 5];
} else {
    document.getElementById("dayThreeName").innerHTML = week[date.getDay()];
}

//==========================
// Put data into HTML
//==========================

function putData() {
    document.getElementById("city").innerHTML = "City: " + objData.city.name;
    for (var i = 0; i < 3; i++) {
        var img = "day" + i + "Img";
        var cond = "day" + i + "con";
        var temp = "day" + i + "Temp";
        var hum = "day" + i + "Hum";
        var pres = "day" + i + "Pres";
        var wind = "day" + i + "Wind";
        var cloud = "day" + i + "Cloud";
        var degree = Math.round(objData.list[i].temp.day) + " C";

        //==========================
        // Switch Celsius to Fahrenheit
        //==========================

        if (document.getElementById("toggle").checked) {
            degree = Math.round(objData.list[i].temp.day) * 9 / 5 + 32 + " F";
        }
        // =========================

        document.getElementById(img).innerHTML = '<img src = "./img/' + objData.list[i].weather[0].icon + '.png" alt = "weather image">';
        document.getElementById(cond).innerHTML = "Condition: " + objData.list[i].weather[0].description;
        document.getElementById(temp).innerHTML = "Day temperature: " + degree;
        document.getElementById(hum).innerHTML = "Humidity: " + Math.round(objData.list[i].humidity) + "%";
        document.getElementById(pres).innerHTML = "Pressure: " + Math.round(objData.list[i].pressure) + " hPa";
        document.getElementById(wind).innerHTML = "Wind: " + Math.round(objData.list[i].speed * 10) / 10 + " m/s";
        document.getElementById(cloud).innerHTML = "Cloudiness: " + objData.list[i].clouds + "%";
    }
}

//==========================
// Get GeoCoordinates
//==========================

var options = {
    enableHighAccuracy: true,
    timeout: 4000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    lat = crd.latitude;
    long = crd.longitude;

    //==========================
    // Get GeoCoordinates
    //==========================

    function getApi() {
        if (lat && long) {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&" + "lon=" + long + "&units=metric" + "&APPID=8ce8d052973edd56b69fdc48d4309715",
                success: function(result) {
                    console.log(result);
                    objData = result;
                    putData();
                }
            });
        }
    }
    getApi();
}

function error(err) {
    // document.getElementById("block").innerHTML = "ERROR " + err.code + ":" + err.message;
    console.warn("ERROR " + err.code + " "+ err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

//==========================
// Submit form to get weather;
//==========================
function inputVal(){
  if(document.getElementById("input").value){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + document.getElementById("input").value + "&units=metric" + "&APPID=8ce8d052973edd56b69fdc48d4309715",
        success: function(result) {
            console.log(result);
            objData = result;
            putData();
        }
    });
  }
}
