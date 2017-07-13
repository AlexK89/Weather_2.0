var lat;
var long;
var objData;
var date = new Date();
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (date.getDay()+2 > 6) {
    document.getElementById("dayThreeName").innerHTML = week[date.getDay() - 5];
} else {
    document.getElementById("dayThreeName").innerHTML = week[date.getDay()+2];
}

//==========================
// Put data into HTML
//==========================

function putData() {
    var curDegree = Math.round(objData.current.temp_c);
    if (document.getElementById("toggle").checked) {
        curDegree = Math.round(objData.current.temp_c * 9 / 5) + 32;
    }
    document.getElementById("city").innerHTML = objData.location.name;
    document.getElementById("currentImg").innerHTML = '<img src = "./img/' + objData.current.condition.code + '.png" id = "currentImg">';
    document.getElementById("currentImg").setAttribute("alt" , objData.current.condition.text);
    document.getElementById("currentTemp").innerHTML = curDegree;

    for (var i = 0; i < 3; i++) {
        var img = "day" + i + "Img";
        // var cond = "day" + i + "con";
        var temp = "day" + i + "Temp";
        var hum = "day" + i + "Hum";
        var pres = "day" + i + "Pres";
        var wind = "day" + i + "Wind";
        var cloud = "day" + i + "Cloud";
        var degree = Math.round(objData.forecast.forecastday[i].day.avgtemp_c);
        var altImg = "dayImg"+i;

        //==========================
        // Switch Celsius to Fahrenheit
        //==========================

        if (document.getElementById("toggle").checked) {
            degree = Math.round(objData.forecast.forecastday[i].day.avgtemp_c * 9 / 5) + 32;
        }
        // =========================

        document.getElementById(img).innerHTML = '<img src = "./img/' + objData.forecast.forecastday[i].day.condition.code + '.png" id="' + altImg +'">';
        document.getElementById(altImg).setAttribute("alt" , objData.forecast.forecastday[i].day.condition.text);
        // document.getElementById(cond).innerHTML = objData.forecast.forecastday[i].day.condition.text;
        document.getElementById(temp).innerHTML = degree;
        document.getElementById(hum).innerHTML = Math.round(objData.forecast.forecastday[i].day.avghumidity) + "%";
        document.getElementById(wind).innerHTML = Math.round(objData.forecast.forecastday[i].day.maxwind_kph * 1000/3600) + " m/s";
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
        url: "https://api.apixu.com/v1/forecast.json?key=32b5b567c77b4a20aa5161100170807&q=" + document.getElementById("input").value + "&days=3",
        success: function(result) {
            console.log(result);
            document.getElementById("warning").innerHTML = "";
            objData = result;
            putData();
        },
        error: function(result){
          document.getElementById("warning").innerHTML = "Please write correct city name";
        }
    });
  }
}
