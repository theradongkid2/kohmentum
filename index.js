const clock = document.getElementById("clock");
const searchbar = document.getElementById("searchbar");
const greetingText = document.getElementById("greetingText");
var Name = localStorage.getItem("Name");
if(!Name) Name = "";
var WeatherLoc = localStorage.getItem("WeatherLoc");
if(!WeatherLoc) WeatherLoc = "Sydney"

function clockStartTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = clockCheckTime(m);
    clock.innerHTML = h + ":" + m;
    var t = setTimeout(clockStartTime, 500);
}

function clockCheckTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}; 

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    function rng(num){
      return Math.floor (Math.random() * (num - 1 + 1)) + 1;
    };
    const rng1 = rng(1643);
    document.getElementById("quote").innerHTML = `${data[rng1].text}`;
  });

  //Greeting
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greet;
  if (hrs < 12)
      greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
  else if (hrs >= 18 && hrs <= 24)
      greet = 'Good Evening';

  document.getElementById('greetingText').innerHTML = greet + " "+ Name;
  if(Name) document.getElementById('greetingText').innerHTML = greet + ", "+ Name;

//Fetch API from OpenWeather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${WeatherLoc}&units=metric&APPID=277e4ead61d59f325b8ecfd98dd8963b`).then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
    try{
        var currentTemp = Math.round(data.main.temp);
        var imageLogo = data.weather[0].icon;
    } catch(e){
        var currentTemp = "";
    }

    var link = `https://openweathermap.org/img/wn/${imageLogo}@2x.png`;
    if(currentTemp){ 
        document.getElementById("temperature").innerHTML = `${currentTemp}°`;
        document.getElementById("weatherImg").src = link;
    } else {
        document.getElementById("temperature").innerHTML = `Weather Location Invalid`
    }
});

function changeName(){
    console.log("Clicked!");
    Name = "";
    document.getElementById('greetingText').innerHTML = greet + ", "+ Name + "|";
    document.onkeypress = function (e) {
        e = e || window.event;
        if(e.key === "Enter"){
            document.getElementById('greetingText').innerHTML = greet + ", "+ Name;
            localStorage.setItem("Name", Name);
            location.reload();
        } else{
            Name = Name + e.key;
            document.getElementById('greetingText').innerHTML = greet + ", "+ Name + "|";
        }
    };
    return;
};

function searchFunc(){
    document.onkeypress = function (e) {
        if(e.key === "Enter"){
            var Name = document.getElementById("searchbar").value;
            if(!Name) return;
            window.location.href = `https://www.google.com/search?q=${Name}`;
        };
    };
};


document.getElementById("weatherLocation").innerHTML = `${WeatherLoc}`
function changeWeatherLoc(){
    WeatherLoc = "";
    document.getElementById('weatherLocation').innerHTML = WeatherLoc + "|";
    document.onkeypress = function (e) {
        e = e || window.event;
        if(e.key === "Enter"){
            document.getElementById('weatherLocation').innerHTML = WeatherLoc;
            localStorage.setItem("WeatherLoc", WeatherLoc);
            location.reload();
        } else{
            WeatherLoc = WeatherLoc + e.key;
            document.getElementById('weatherLocation').innerHTML = WeatherLoc + "|";
        }
    };
    return;
};