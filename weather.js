
  
  //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=api.openweathermap.org/data/2.5/weather?lat=35&lon=139
  
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
  //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a
  /*
  var getWx1 = "http://api.openweathermap.org/data/2.5/weather?lat=";
  var getWx2 = "&lon=";
  var getWx3 = "&appid="
  var wxKey = "76e02e63bfdb884252e9010384e00aa1"
  var fullString = getWx1 + lat + getWx2 + lon + getWx3 + wxKey;
  function getWeather(lat, lon){
    var xhr = "h"
  }
  */

  $(document).ready(function(){
  $("#getZip").click(function(){
    
    let zip = $('#thisZip');
    if (zip[0].value === NaN || zip[0].value === null || zip[0].value === ""){
      $('#thisZip').css("border", "3px solid red");
      
    }else{
      $('#thisZip').css("border", "none");
      zip = zip[0].value;
      if (zip.length != 5){
        //console.log("zipcode in the US is 5 digits")
         $("#error").show();
          $("#success").hide();
        document.getElementById("error").innerHTML = "<p>zipcode in the US is 5 digits</p>";
      }else{
        $("#error").hide();
        getTheWeather(zip);
      }
    }
 
  });
});


function getTheWeather(zip){
  let xhttp = new XMLHttpRequest();
  let openWeather0 = "http://api.openweathermap.org/data/2.5/weather?zip=";
  let openWeather1 = "&units=imperial"
  let openWeather2 = "&appid="
  let wxKey = "76e02e63bfdb884252e9010384e00aa1"
  let fullURL = openWeather0 + zip + ",us" + openWeather1 +openWeather2 + wxKey;
  let status;
  let data;
  xhttp.open("Get", fullURL, true);
  xhttp.onreadystatechange = function(){
  
  if (xhttp.readyState ==4){
    status = xhttp.status;
    if (status == 200){
      data = JSON.parse(xhttp.responseText);
      //console.log("success");
      show(data);

    }else{
      document.getElementById("error").innerHTML = "error" + status;
      console.log("error" + console.log(status));
    }
  }
};
xhttp.send();

}



function show(wxObject){
  /*
  $.each(wxObject, function(key, val){
    console.log(key + " " + val);
  })*/
    
  document.getElementById("userLocal").innerHTML = wxObject.name;
  document.getElementById("userWeather").innerHTML = wxObject.weather[0].main;
  document.getElementById("temp").innerHTML =wxObject.main["temp"] + "&deg";
  
  
  
 $("#success").show();


}



/*
{"coord":
  {"lon":-122.2,
  "lat":47.98}
  ,
  "weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],
  "base":"cmc stations",
  "main":{"temp":299.4,"pressure":1019,"humidity":44,"temp_min":297.04,"temp_max":301.15},
  "wind":{"speed":5.1,"deg":300},
  "clouds":{"all":1},
  "dt":1469670605,
  "sys":{"type":1,"id":2920,"message":0.0143,"country":"US","sunrise":1469709653,"sunset":1469764132}
  ,"id":5793933,"name":"Everett","cod":200}
  */