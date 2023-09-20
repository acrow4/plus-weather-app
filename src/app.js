let apiKey = "6c63967610076fffc576a864a7af27d0";

function showData(response) {
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#current-temp");
  newTemp.innerHTML = `${temp}`;
  let newCity = document.querySelector("#city");
  newCity.innerHTML = response.data.name;
  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let newWindSpeed = document.querySelector("#wind-speed");
  newWindSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
}

function createUrl(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(weatherUrl).then(showData);
}

createUrl("New York");
