// Let info
// Date related
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

// Selecting HTML elements
let date = document.querySelector("#date");
let weekday = document.querySelector("#weekday");
let time = document.querySelector("#time");
let temp = document.querySelector("#temp");
let cityName = document.querySelector("#cityName");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let todayIcon = document.querySelector("#todayIcon")

// API related
let searchedCity = "Doolin";
let apiKey = "3c57a9d63873260ca8362886141d8b51";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;

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

// API integration
function displayData(response) {
  temp.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  todayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  
}

axios.get(apiURL).then(displayData);
