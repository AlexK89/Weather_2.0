var lat;
var long;
var objData;
var date = new Date();
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (date.getDay() + 2 > 6) {
    document.getElementById("dayThreeName").innerHTML = week[date.getDay() - 5];
} else {
    document.getElementById("dayThreeName").innerHTML = week[date.getDay() + 2];
}

//==========================
// Put data into HTML
//==========================

function putData() {
    var curDegree = Math.round(objData.current.temp_c) + ' <span class = "celDeg">C</span>';
    if (document.getElementById("toggle").checked) {
        curDegree = Math.round(objData.current.temp_c * 9 / 5) + 32 + ' <span class = "farDeg">F</span>';
    }
    document.getElementById("city").innerHTML = objData.location.name;
    document.getElementById("currentImg").innerHTML = '<img src = "./img/' + objData.current.condition.code + '.png" id = "currentImg">';
    document.getElementById("currentImg").setAttribute("alt", objData.current.condition.text);
    document.getElementById("currentTemp").innerHTML = curDegree;
    document.getElementById("currentSunUp").innerHTML = objData.forecast.forecastday[0].astro.sunrise;
    document.getElementById("currentSunDown").innerHTML = objData.forecast.forecastday[0].astro.sunset;

    for (var i = 0; i < 3; i++) {
        var img = "day" + i + "Img";
        var temp = "day" + i + "Temp";
        var hum = "day" + i + "Hum";
        var pres = "day" + i + "Pres";
        var wind = "day" + i + "Wind";
        var cloud = "day" + i + "Cloud";
        var degree = Math.round(objData.forecast.forecastday[i].day.avgtemp_c) + '<span class = "celDeg">C</span>';
        var altImg = "dayImg" + i;

        //==========================
        // Switch Celsius to Fahrenheit
        //==========================

        if (document.getElementById("toggle").checked) {
            degree = Math.round(objData.forecast.forecastday[i].day.avgtemp_c * 9 / 5) + 32 + '<span class = "farDeg">F</span>';
        }
        // =========================

        document.getElementById(img).innerHTML = '<img src = "./img/' + objData.forecast.forecastday[i].day.condition.code + '.png" id="' + altImg + '">';
        document.getElementById(altImg).setAttribute("alt", objData.forecast.forecastday[i].day.condition.text);
        document.getElementById(temp).innerHTML = degree;
        document.getElementById(hum).innerHTML = Math.round(objData.forecast.forecastday[i].day.avghumidity) + "%";
        document.getElementById(wind).innerHTML = Math.round(objData.forecast.forecastday[i].day.maxwind_kph * 1000 / 3600) + " m/s";
        document.getElementById(cloud).innerHTML = objData.forecast.forecastday[i].hour[0].cloud + "%";
    }
}

//==========================
// Get GeoCoordinates
//==========================

var options = {
    enableHighAccuracy: true,
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
                url: "https://api.apixu.com/v1/forecast.json?key=32b5b567c77b4a20aa5161100170807&q=" + lat + "," + long + "&days=3",
                success: function(result) {
                    objData = result;
                    putData();
                }
            });
        }
    }
    getApi();
}

function error(err) {
    console.warn("ERROR " + err.code + " " + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

//==========================
// Submit form to get weather;
//==========================
function inputVal() {
    if (document.getElementById("input").value) {
        $.ajax({
            url: "https://api.apixu.com/v1/forecast.json?key=32b5b567c77b4a20aa5161100170807&q=" + document.getElementById("input").value + "&days=3",
            success: function(result) {
                document.getElementById("warning").innerHTML = "";
                objData = result;
                putData();
            },
            error: function(result) {
                document.getElementById("warning").innerHTML = "Please write correct city name";
            }
        });
    }
}
