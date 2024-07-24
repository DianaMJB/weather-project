function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  console.log(temperatureElement);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let myApiKey = "0o3e0962641a02f3333tabb947225bb2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}
&key=${myApiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#item-search");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSearch);
searchCity("New York");
