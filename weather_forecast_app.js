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
    humidity = document.querySelector(".humidity"),
    humidityStatus = document.querySelector(".humidity-text"),
    visibility = document.querySelector(".visibility"),
    visibilityStatus = document.querySelector(".visibility-text"),
    airQuality = document.querySelector(".air-quality"),
    airQualityStatus = document.querySelector(".quality-text"),
    weatherCards = document.querySelector("#weather-card"),
    hourBtn = document.querySelector(".hourly");
weekBtn = document.querySelector(".week");


let currentCity = "";
let hourlyorWeek = "week";


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
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
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
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            currentCity = data.currentCity;
           //getWeatherData(data.city, hourlyorWeek);
        });
}

getPublicIp();

//function to get weather data 


function getWeatherData(city) {
    const apiKey = "USNFBZ3G26K6LX3UZHYK9EHTN";
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
            updateBackground(today.icon);
            sunRise.innerText = formatTime(today.sunrise);
            sunSet.innerText = formatTime(today.sunset);
            mainIcon.src = getIcon(today.icon);
            
            if (hourlyorWeek == "hourly")
                updateForecastWeek(data.days[0].hours, "day");
            else
                updateForecastWeek(data.days, "week");
            
        })
        // .catch((err) => {
        //     alert("City not found");
        // })
}

//function to measure uv index status
function measureUVIndex(uvIndex) {
    if (uvIndex <= 2)
        uvText.innerText = "Low";
    else if (uvIndex <= 5)
        uvText.innerText = "Moderate";
    else if (uvIndex <= 7) {
        uvText.innerText = "High";
    }
    else if (uvIndex <= 10) {
        uvText.innerText = "Very High";
    }
    else {
        uvText.innerText = "Extreme";
    }
}

//function to measure humidity and return status
function updateHumidityStatus(humidity) {
    if (humidity <= 30) {
        humidityStatus.innerText = "Low";
    }
    else if (humidity <= 60) {
        humidityStatus.innerText = "Moderate";
    }
    else {
        humidityStatus.innerText = "High";
    }
};

//function to measure visibility and return status
function updateVisibilityStatus(visibility) {
    if (visibility <= 0.3) {
        visibilityStatus.innerText = "Dense fog";
    }
    else if (visibility <= 0.16) {
        visibilityStatus.innerText = "Moderate Fog";
    }
    else if (visibility <= 0.35) {
        visibilityStatus.innerText = "Light Fog";
    }
    else if (visibility <= 1.13) {
        visibilityStatus.innerText = "Very Light Fog";
    }
    else if (visibility <= 2.16) {
        visibilityStatus.innerText = "Light Mist";
    }
    else if (visibility <= 5.4) {
        visibilityStatus.innerText = "Very Light Mist";
    }
    else if (visibility <= 10.8) {
        visibilityStatus.innerText = "Clear Air";
    }
    else {
        visibilityStatus.innerText = "Very Clear Air";
    }
}

//function to update air quality status
function updateAirQualityStatus(airQuality) {
    if (airQuality <= 50) {
        airQualityStatus.innerText = "Good";
    }
    else if (airQuality <= 100) {
        airQualityStatus.innerText = "Moderate";
    }
    else if (airQuality <= 150) {
        airQualityStatus.innerText = "Unhealthy for sensitive people";
    }
    else if (airQuality <= 200) {
        airQualityStatus.innerText = "Unhealthy";
    }
    else if (airQuality <= 250) {
        airQualityStatus.innerText = "Hazardous";
    }
}

//function to format time
function formatTime(time) {
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    let newTime = hour + ":" + minute;
    return newTime;
}

//Function to update icon based on weather data
function getIcon(condition) {
    if (condition == "partly-cloudy-day") {
        return "photos/sun_clouds.png";
    }
    else if (condition == "partly-cloudy-night") {
        return "photos/coudy_night.png";
    }
    else if (condition == "rain") {
        return "photos/rainy2.png";
    }
    else if (condition == "clear-day") {
        return "photos/sunny.png";
    }
    else if (condition == "clear-night") {
        return "photos/moon.png";
    }
    else if (condition == "cloudy") {
        return "photos/cloudy.png";
    }
    else if (condition == "snow") {
        return "photos/snowy.png";
    }
    else if (condition == "wind") {
        return "photos/windy.png";
    }
    else if (condition == "fog") {
        return "photos/cloudy2.png";
    }
    else if (condition == "thunder-rain") {
        return "photos/thunderstorm.png";
    }
    else
        return "photos/cloudy.png";
}

//function to upgrade page background based on weather condition
function updateBackground(condition){
    //const body = document.querySelector("body");
    let bckd = "";
    const body = document.querySelector("body");
    if (condition === "partly-cloudy-day") {
       bckd = "background/sunny_cloud.jpg";
    }
    else if (condition === "partly-cloudy-night") {
        bckd = "background/cloudy_night.jpg";
    }
    else if (condition === "rain") {
        bckd = "background/rain.jpg";
    }
    else if (condition === "clear-day") {
        bckd = "background/clear_day.jpg";
    }
    else if (condition === "clear-night") {
        bckd = "background/clear_night.jpg";
    }
    else if (condition === "cloudy") {
        bckd = "background/cloudy_night.jpg";
    }
    else if (condition === "snow") {
        bckd = "background/snow.jpg";
    }
    else
        bckd ="background/clear_day.jpg";

    body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bckd})`;
    
}
//Function to get name of a day
function getDayName(date) {
    let day = new Date(date);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday"
    ];
    return days[day.getDay()];
}

//Function to convert hour to 12 hour time 
function getHour(time) {
    let hour = Number(time.split(":")[0]); // Convert hour to a number for comparison
    let min = time.split(":")[1];

    if (hour < 12) {
        if (hour === 0) {
            hour = 12; // Convert 0 to 12 for AM
        }
        return `${hour} AM`;
    } else {
        if (hour > 12) {
            hour = hour - 12; // Convert 24-hour format to 12-hour format for PM
        }
        return `${hour} PM`;
    }
}


//function to update forecast for hours and weeks
function updateForecastWeek(data, type) {
    weatherCards.innerHTML = "";

    let day = 0;
    let numCards = 0;
    if (type == "day") { numCards = 24; }
    else { numCards = 7; }

    for (let i = 0; i < numCards; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        dayName = getHour(data[day].datetime);
        if (type == "week") {
            dayName = getDayName(data[day].datetime);

            let dayTemp = data[day].temp;
            let iconCondition = data[day].icon;
            let iconSrc = getIcon(iconCondition);

            card.innerHTML = `
        <h2 class="day-name">${dayName}</h2>
        <div class="card-icon">
            <img src="${iconSrc}" alt="weather image">
        </div>
        <div class="day-temp">
            <h2 class="temp">${dayTemp}</h2>
            <span class="temp-unit">°C</span>
        </div>
        `;
            weatherCards.appendChild(card);
            day++;
        }
        if (type == "day") {
            let dayName1 = getHour(data[day].datetime);
            let dayTemp1 = data[day].temp;
            let iconCondition1 = data[day].icon;
            let iconSrc1 = getIcon(iconCondition1);

            let dayName2 = getHour(data[day + 3].datetime);
            let dayTemp2 = data[day + 3].temp;
            let iconCondition2 = data[day + 3].icon;
            let iconSrc2 = getIcon(iconCondition2);

            card.innerHTML = `
                <h2 class="day-name">${dayName1} - ${dayName2}</h2>
                <div class="card-icon">
                    <img src="${iconSrc1}" alt="weather image">
                </div>
                <div class="day-temp">
                    <h2 class="temp">${dayTemp1}°C - ${dayTemp2}°C</h2>
                </div>
                `;
            card.style.height = "120px";
            card.style.width = "100px";
            weatherCards.appendChild(card);
            day += 4;
        }
    }
}

//Button event listeners for toggle
hourBtn.addEventListener("click", () => {
    changeTimeSpan("hourly");
});

weekBtn.addEventListener("click", () => {
    changeTimeSpan("week");
});

//Toggle function 
function changeTimeSpan(unit){
    if(hourlyorWeek != unit){
        hourlyorWeek = unit;
        if(unit == "hourly"){
           hourBtn.classList.add("active"); 
           weekBtn.classList.remove("active");
        }
        else{
            weekBtn.classList.add("active"); 
            hourBtn.classList.remove("active");
        }
        getWeatherData(currentCity,hourlyorWeek);

    }
}