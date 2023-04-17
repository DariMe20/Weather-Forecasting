const temp = document.getElementById("temp");
const date = document.getElementById("date-today");


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
    return `${dayString},${hour}:${minute}`;
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

    });
   

   
}