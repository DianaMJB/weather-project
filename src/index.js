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
  cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}Km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  fUnit.celsius = response.data.temperature.current;

  getForecast(response.data.city);
  displayBG(response.data);
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
  let main = document.querySelector("#main");

  setTimeout(() => {
    main.setAttribute("style", `max-height:500px`);
  }, 400);

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

function displayBG(data) {
  let BGVideo = document.querySelector("#BGVideo");

  let condition = data.condition.icon;
  console.log(data.condition.icon);
  switch (condition) {
    case "clear-sky-day":
      BGVideo.src = "src/videos/clear-sky-day.mp4";
      break;

    case "clear-sky-night":
      BGVideo.src = "src/videos/clear-sky-night.mp4";
      break;

    case "few-clouds-day":
      BGVideo.src = "src/videos/few-clouds-day.mp4";
      break;

    case "few-clouds-night":
      BGVideo.src = "src/videos/few-clouds-night.mp4";
      break;

    case "scattered-clouds-day":
      BGVideo.src = "src/videos/scattered-clouds-day.mp4";
      break;

    case "scattered-clouds-night":
      BGVideo.src = "src/videos/scattered-clouds-night.mp4";
      break;

    case "broken-clouds-day":
      BGVideo.src = "src/videos/broken-clouds-day.mp4";
      break;

    case "broken-clouds-night":
      BGVideo.src = "src/videos/broken-clouds-night.mp4";
      break;

    case "shower-rain-day":
      BGVideo.src = "src/videos/shower-rain-day.mp4";
      break;

    case "shower-rain-night":
      BGVideo.src = "src/videos/shower-rain-night.mp4";
      break;

    case "rain-day":
      BGVideo.src = "src/videos/rain-day.mp4";
      break;

    case "rain-night":
      BGVideo.src = "src/videos/rain-night.mp4";
      break;

    case "thunderstorm-day":
      BGVideo.src = "src/videos/thunderstorm-day.mp4";
      break;

    case "thunderstorm-night":
      BGVideo.src = "src/videos/thunderstorm-night.mp4";
      break;

    case "snow-day":
      BGVideo.src = "src/videos/snow-day.mp4";
      break;

    case "snow-night":
      BGVideo.src = "src/videos/snow-night.mp4";
      break;

    case "mist-day":
      BGVideo.src = "src/videos/mist-day.mp4";
      break;

    case "mist-night":
      BGVideo.src = "src/videos/mist-night.mp4";
      break;

    default:
      BGVideo.src = "src/videos/default.mp4";
      break;
  }
}

function convertUnit(event) {
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheit = document.querySelector(".f-temp-unit");
  let celsius = document.querySelector(".c-temp-unit");
  if (unit == "C") {
    currentTemp.innerHTML = Math.round(celsiusToFahrenheit(fUnit.celsius));
    celsius.classList.remove("strong");
    fahrenheit.classList.add("strong");
    unit = "F";
  } else {
    currentTemp.innerHTML = Math.round(
      fahrenheitToCelsius(currentTemp.innerHTML)
    );
    fahrenheit.classList.remove("strong");
    celsius.classList.add("strong");
    unit = "C";
  }
}

function celsiusToFahrenheit(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}
function fahrenheitToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) / 1.8;
  return celsius;
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSearch);

let fUnit = document.querySelector(".f-temp-unit");
fUnit.addEventListener("click", convertUnit);

let cUnit = document.querySelector(".c-temp-unit");
cUnit.addEventListener("click", convertUnit);
let unit = "C";
