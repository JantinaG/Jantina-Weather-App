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

    forecastBox.innerHTML += `
  <div class="col-sm-2 fiveDay">
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

// Riddles
let riddle = document.querySelector("#riddle");
let riddleAnswer = document.querySelector("#riddleAnswer");

if (hours === 1 || hours === 13) {
  riddle.innerHTML = `What can you hold in your right hand but not your left?`;
  riddleAnswer.innerHTML = `Answer: Your right elbow`;
}

if (hours === 2 || hours === 14) {
  riddle.innerHTML = `Which word in the dictionary is spelled incorrectly?`;
  riddleAnswer.innerHTML = `Answer: Incorrectly`;
}

if (hours === 3 || hours === 15) {
  riddle.innerHTML = `What two things can you never eat for breakfast?`;
  riddleAnswer.innerHTML = `Answer: Lunch and dinner`;
}

if (hours === 4 || hours === 16) {
  riddle.innerHTML = `How do you write cow with 13 letters?`;
  riddleAnswer.innerHTML = `Answer: SEE-O-DOUBLE-YOU`;
}

if (hours === 5 || hours === 17) {
  riddle.innerHTML = `What is black when it's clean and white when it's dirty?`;
  riddleAnswer.innerHTML = `Answer: A black chalkboard`;
}

if (hours === 6 || hours === 18) {
  riddle.innerHTML = `What has so many keys but can't open a door?`;
  riddleAnswer.innerHTML = `Answer: A piano`;
}

if (hours === 7 || hours === 19) {
  riddle.innerHTML = `What's the only room from which no one can enter or leave?`;
  riddleAnswer.innerHTML = `Answer: A mushroom`;
}

if (hours === 8 || hours === 20) {
  riddle.innerHTML = `What breaks when you say it`;
  riddleAnswer.innerHTML = `Answer: Silence`;
}

if (hours === 9 || hours === 21) {
  riddle.innerHTML = `What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?`;
  riddleAnswer.innerHTML = `Answer: A river`;
}

if (hours === 10 || hours === 22) {
  riddle.innerHTML = `What has 13 hearts, but no other organs?`;
  riddleAnswer.innerHTML = `Answer: A deck of cards`;
}

if (hours === 11 || hours === 23) {
  riddle.innerHTML = `When 5 machines in 5 minutes produce 5 toy cars. How long do 100 machines take to produce 100 toy cars?`;
  riddleAnswer.innerHTML = `Answer: 5 minutes`;
}

if (hours === 12 || hours === 0) {
  riddle.innerHTML = `What can you catch but not throw?`;
  riddleAnswer.innerHTML = `Answer: Your breath / An illness`;
}
