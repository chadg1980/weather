  $(document).ready(function(){
    let lat = lon = "";
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position){
    
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    
    getTheWeather(lat, lon);
  }
    function error(){
      console.log()
    $("#zipCode").show();
  $("#getZip").click(function(){
    let zip = $('#thisZip');
    if (zip[0].value === NaN || zip[0].value === null || zip[0].value === ""){
      $('#thisZip').css("border", "3px solid red");
    }
    else{
      $('#thisZip').css("border", "none");
      zip = zip[0].value;
      if (zip.length != 5){
        
        $("#zipError").show();
        $("#success").hide();
        $("#error").html("<p>zipcode in the US is 5 digits</p>");
      }else{
        $("#zipError").hide();
        getTheWeather(zip);
      }
    }
 
  });
  }
  
});



function getTheWeather(location, long){
  
  
  let status;
  let data;
  let allData;
  let newURL = "";

  if(arguments.length ===1){
     newURL = buildString(location);
  }
  else{
    newURL = buildString(location, long);
  }


 $.ajax(newURL, {
  success: function(response){
    if(response.cod != 404)
      show(response);
    else{
     showError("404 Not Found");
     throw new Error("404 Open Weather API Not Found");
    }
  },
  error : function(textStatus, errorThrown){
    showError(textStatus, errorThrown);
  }
 });
   

 return; 
 
}

function buildString(location, lon){
   let openWeatherUnits = "&units=imperial"
   let openWeatherAppID = "&appid=76e02e63bfdb884252e9010384e00aa1"
   
   let fullURL = "";

  if (arguments.length == 1){
    let openWeatherzip = "http://api.openweathermap.org/data/2.5/weather?zip=";
    fullURL = openWeatherzip + 98290 + ",us" + openWeatherUnits +openWeatherAppID;
   
  }
  else{
   
    let openWeatherlat = "http://api.openweathermap.org/data/2.5/weather?lat=";
    let openWeatherlon = "&lon="
    fullURL = openWeatherlat + location + openWeatherlon + lon   +  openWeatherUnits + openWeatherAppID;
    
  }
  return fullURL;
}

function showError(e){
  $("#error").show();
  document.getElementById("error").innerHTML = "An error occured " + status;
  console.log("error: " + console.log(e));
}

function show(wxObject){
  var thisIcon =  "http://openweathermap.org/img/w/" +wxObject.weather[0].icon + ".png";

  $("#userLocal").html("The weather for " +  wxObject.name + "  is ");
  $("#userWeather").html(wxObject.weather[0].main +"<img src="+ thisIcon +">" );
  
  $("#temp").html("The temperature is  " + wxObject.main["temp"] + String.fromCharCode(176));
  backgroundPicker(wxObject.main["temp"]);
  
  $("#success").show();

}
//The background image is chosend based on the temperature
//tempF is temperature in fareinheit
function backgroundPicker(tempF){

  //cold  Anything below freezing
  if (tempF <= 32){
    $(".wrapper").css( "background-image", "url('https://upload.wikimedia.org/wikipedia/commons/7/71/Sea_ice_terrain.jpg')");
    $(".wrapper").css("background-size", "100%");
    console.log(tempF);
    return;
  }
  //mild/cool temperatures
  else if(tempF >32 && tempF <= 60){
    $(".wrapper").css("background-image", "url('http://cdn.onlyinyourstate.com/wp-content/uploads/2016/04/barn-3-stone-ridge-road-ripley-700x463.jpg')");
    $(".wrapper").css("background-size", "100%");
     console.log(tempF);
     return;
  }
  //mild warm temperatures
  else if(tempF >60 && tempF <= 80){
     $(".wrapper").css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/8/88/View_on_Sotsji_from_black_sea.jpg')");
    $(".wrapper").css("background-size", "100%");
     console.log(tempF);
     return;
  }
  //hot temperatures
  else if(tempF >80 && tempF <= 99){
      $(".wrapper").css("background-image", "url('http://www.publicdomainpictures.net/pictures/150000/nahled/dog-on-the-beach-145520851094d.jpg')");
      $(".wrapper").css("background-size", "100%");
       return
     }
  //way too hot!
  else if (tempF >100){
    $(".wrapper").css("background-image", "url('https://wallpaperscraft.com/image/tree_dead_desert_branches_textures_stones_bushes_sand_61639_3840x2400.jpg')");
    $(".wrapper").css("background-size", "100%");
    return;
  }
  //if nothing else is chosen
  else{
    $(".wrapper").css("background-color", "blue");
    console.log(tempF + " else?");
     return;
  }
  return;
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
  /*
  {
  "coord" : {"lon":-122.12,"lat":47.95},
  "weather":[
     {  "id"          :  500,
        "main"        : "Rain",
        "description" : "light rain",
        "icon"        : "10d"
      },
      { "id"          : 701,
        "main"        : "Mist",
        "description" : "mist",
        "icon"        :"50d"
        }],
        "base" : "cmc stations",
        "main" :
        {
          "temp"     : 63.45,
          "pressure" : 1016,
          "humidity" : 67,
          "temp_min" : 61.34,
          "temp_max" : 66.2
        },
          "wind" :{
          "speed" : 5.82,
          "deg":180
          },
          "rain" :{
            "1h" : 0.38
          },
          "clouds" : {
            "all" : 90
          },
            "dt" : 1472675397,
            "sys": {
              "type"   : 1,
              "id"     : 2920,
              "message": 0.0106,
              "country":"US",
              "sunrise":1472650033,
              "sunset":1472698105
            },
            "id"   : 5794675,
            "name" : "Fobes Hill",
            "cod"  : 200}*/