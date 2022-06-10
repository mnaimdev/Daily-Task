// Select Elements
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const sunriseElement = document.querySelector(".sunrise");
const sunsetElement = document.querySelector(".sunset");
const windElement = document.querySelector(".wind");

// Default Set Some Data
const KELVIN = 273;

const weather = {};
weather.temperature = {
    unit : "celsius"
}

const key = "0f3c7dd0765a698d64e2b2ed7be75570";

// If User Set the Navigation 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, setError);

} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Something went wrong.</p>`
}

// Set User Position
function setPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Error Function
function setError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// Get Weather Data From API
function getWeather(latitude, longitude) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.sunrise = data.sys.sunrise;
        weather.sunset = data.sys.sunset;
        weather.wind = data.wind.speed;
    })
    .then(() => displayWeather());
};

// Display Weather to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="../images/icons/${weather.iconId}.png" />`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    sunriseElement.innerHTML = `<b>Sunrise : </b> ${epochToHumanDate(weather.sunrise)} GMT+6`;
    sunsetElement.innerHTML = `<b>Sunset : </b> ${epochToHumanDate(weather.sunset)} GMT+6`;
    windElement.innerHTML = `<b>Wind Speed : </b> ${weather.wind} KM`;
};

// C to F
// (0°C × 9/5) + 32 = 32°F


function celsiusToFahrenheit (temperature) {
    return (temperature * 9 / 5 )+ 32;
};

// When Click Celsius Then Occur an Event

tempElement.addEventListener("click", () => {
   if (weather.temperature.value === undefined) return;

   else if (weather.temperature.unit === "celsius") {
       let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
       fahrenheit = Math.floor(fahrenheit);
       tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
       weather.temperature.unit = "fahrenheit";
   } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
   }
});

// Convert Unix Epoch Time to Human Readable Time
function epochToHumanDate(time) {
   const timeStamp = time;
   const dateObject = new Date(timeStamp * 1000);
  const hour = dateObject.getUTCHours().toString().padStart(2, 0);
  const minute = dateObject.getUTCMinutes().toString().padStart(2, 0);
  const second = dateObject.getUTCSeconds().toString().padStart(2, 0);
  const result = `${hour} : ${minute} : ${second}`;
  return result;
}