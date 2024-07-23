function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#item-search");
  console.log(searchInput);
  let cityElement = document.querySelector("#city");
  let capitalizedCity = `${searchInput.value
    .charAt(0)
    .toUpperCase()}${searchInput.value.slice(1).toLowerCase()}`;
  cityElement.innerHTML = capitalizedCity;
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSearch);
