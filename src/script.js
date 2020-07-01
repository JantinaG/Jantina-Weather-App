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
function displayTime() {
  let now = new Date();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  date.innerHTML = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  weekday.innerHTML = `${days[now.getDay()]}`;
  time.innerHTML = `${now.getHours()}:${minutes}`;
}
displayTime();

// Selecting HTML elements for API intergration
let temp = document.querySelector("#temp");
let cityName = document.querySelector("#cityName");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let todayIcon = document.querySelector("#todayIcon");

// API integration
function displayData(response) {
  temp.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Search and API integration
function search(city) {
  let apiKey = "3c57a9d63873260ca8362886141d8b51";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayData);
}

// Search
function process(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searchedCity");
  search(searchedCity.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", process);
