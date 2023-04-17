const temp = document.getElementById("temp");
const date = document.getElementById("date-today");
const currentLocation = document.getElementById("city");
const condition = document.getElementById("description"),
mainIcon = document.getElementById("icon"),
uvIndex = document.querySelector(".uv-index"),
uvText = document.querySelector(".uv-text"),
windSpeed = document.querySelector(".wind-status"),
sunRise = document.querySelector(".sunrise"),
sunSet = document.querySelector(".sunset"),
humidity= document.querySelector(".humidity"),
humidityStatus = document.querySelector(".humidity-text"),
visibility = document.querySelector(".visibility"),
visibilityStatus = document.querySelector(".visibility-text"),
airQuality = document.querySelector(".air-quality"),
airQualityStatus = document.querySelector(".cuality-text");


let currentCity = "";


//Update date time 

function getDateTime() {
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday"
    ];

    //hour = hour % 12;
    if (hour < 10){
       hour = "0" + hour; 
    }
    if(minute < 10){
        minute = "0"+minute;
    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();
//update Time every second
setInterval(() => {
    date.innerText = getDateTime();
}, 1000);


//Function to get public ip with fetch
function getPublicIp(){
    fetch("https://geolocation-db.com/json/", {
            method:"GET",
    })
    .then((response) => response.json())
    .then((data) => {
         console.log(data);
        currentCity = data.currentCity;
        getWeatherData(data.city);
    });  
}

getPublicIp();

//function to get weather data 


function getWeatherData (city){
    const apiKey = "FHGF2CKEC95CALF5SXU4D4W28";
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
    {
       method: "GET",
    }
    )
    .then((response) => response.json())
    .then((data) => {
        let today = data.currentConditions;
        temp.innerText = today.temp;
        currentLocation.innerText = data.resolvedAddress;
        condition.innerText = today.conditions;
        uvIndex.innerText = today.uvindex;
        windSpeed.innerText = today.windspeed;
        humidity.innerText = today.humidity + "%";
        visibility.innerText = today.visibility;
        airQuality.innerText = today.winddir;
        measureUVIndex(today.uvindex);
        updateHumidityStatus(today.humidity);
        updateVisibilityStatus(today.visibility);
        updateAirQualityStatus(today.winddir);
    });
   

   
}

//function to measure uv index status
function measureUVIndex(uvIndex){
    if(uvIndex <= 2)
        uvText.innerText = "Low";
    else if(uvIndex <=5)
        uvText.innerText = "Moderate";
    else if(uvIndex <=7){
        uvText.innerText = "High";
    }
    else if(uvIndex <= 10)
    {
        uvText.innerText = "Very High";
    }
    else{
        uvText.innerText = "Extreme";
    }
}

//function to measure humidity and return status
function updateHumidityStatus(humidity){
    if(humidity <= 30){
        humidityStatus.innerText = "Low";
    }
    else if(humidity <= 60){
        humidityStatus.innerText = "Moderate";
    }
    else{
        humidityStatus.innerText = "High";
    }
}