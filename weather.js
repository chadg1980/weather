window.onload = function () {
  var output = document.getElementById("out");
  var lat = "";
  var lon = "";
  
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var lat  = position.coords.latitude;
    var lon = position.coords.longitude;
    getWeather(lat, lon);
    //output.innerHTML = '<p>Latitude is ' + lat + '° <br>Longitude is ' + lon + '°</p>';
};

  function error() {
    output.innerHTML = "no location, check your settings";
  };

  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
  
  //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=api.openweathermap.org/data/2.5/weather?lat=35&lon=139
  
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
  //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a
  var getWx1 = "http://api.openweathermap.org/data/2.5/weather?lat=";
  var getWx2 = "&lon=";
  var getWx3 = "&appid="
  var wxKey = "76e02e63bfdb884252e9010384e00aa1"
  var fullString = getWx1 + lat + getWx2 + lon + getWx3 + wxKey;
  function getWeather(lat, lon){
    var xhr = "h"
  }

  
}