function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}Km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 1) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minutes}`;
}
function searchCity(city) {
  let myApiKey = "0o3e0962641a02f3333tabb947225bb2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${myApiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#item-search");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "0o3e0962641a02f3333tabb947225bb2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6 && index > 0) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-column">
            <div class="forecast-day">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="forecast-icon" />
            <div class="forecast-temperatures">
           <div class="forecast-temp"><strong>${Math.round(
             day.temperature.maximum
           )}° |</strong></div>
         <div class="forecast-temp">${Math.round(
           day.temperature.minimum
         )}°</div>
            </div>
          </div>`;
    }
  });

  let forecastELement = document.querySelector("#forecast");
  forecastELement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSearch);
searchCity("New York");
