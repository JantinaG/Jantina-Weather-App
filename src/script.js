// Selecting HTML elements for date and time
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = document.querySelector("#date");
let weekday = document.querySelector("#weekday");
let time = document.querySelector("#time");

// Display current time
let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();

function displayTime() {
  date.innerHTML = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  weekday.innerHTML = `${days[now.getDay()]}, `;
  time.innerHTML = `${hours}:${minutes}`;
}
displayTime();

// Selecting HTML elements for API intergration
let temp = document.querySelector("#temp");
let cityName = document.querySelector("#cityName");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let todayIcon = document.querySelector("#todayIcon");
let forecastBox = document.querySelector("#forecastBox");

// API integration
function displayData(response) {
  celsiusTemp = response.data.main.temp;
  temp.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Forecast related
function forecastHours(timestamp) {
  let now = new Date(timestamp);
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = null;
  forecastBox.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    let forecastIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
    let tempMax = Math.round(forecast.main.temp_max);
    let tempMin = Math.round(forecast.main.temp_min);
    console.log(forecast);
    forecastBox.innerHTML += `
  <div class="col-sm-2">
    <h6>
      ${forecastHours(forecast.dt * 1000)}
    </h6>
    <img
      src="${forecastIcon}">
    <p class="text-muted">
      <strong>${tempMax}*C</strong>/${tempMin}*C
    </p>
  </div>`;
  }
}
// API info
let apiKey = "3c57a9d63873260ca8362886141d8b51";

// Search and API integration
function search(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayData);

  let apiURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURLForecast).then(displayForecast);
}

// Search
function process(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searchedCity");
  search(searchedCity.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", process);

// Unit conversion
let celsiusTemp = null;

function convertFC(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(celsiusTemp);
  celsius.classList.remove("inactive");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertFC);

function convertCF(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
  fahrenheit.classList.remove("inactive");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  celsius.classList.add("inactive");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertCF);

// Current location
function displayLocation(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let urlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;

  axios.get(urlLocation).then(displayData);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(displayLocation);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getLocation);
