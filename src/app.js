let apiKey = "6c63967610076fffc576a864a7af27d0";

function displayTime() {
  let dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let updatedDate = document.querySelector("#updated-date");
  let now = new Date();
  let day = dayOfWeek[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let postfix = "am";
  if (hours < 1) {
    hours = 12;
  }
  if (hours > 12) {
    hours = hours - 12;
    postfix = "pm";
  }

  if (minutes < 10) {
    updatedDate.innerHTML = `Last Updated: ${day} ${hours}:0${minutes} ${postfix}`;
  } else {
    updatedDate.innerHTML = `Last Updated: ${day} ${hours}:${minutes} ${postfix}`;
  }
}

function showData(response) {
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#current-temp");
  let newCity = document.querySelector("#city");
  let newHumidity = document.querySelector("#humidity");
  let newWindSpeed = document.querySelector("#wind-speed");
  let newCondition = document.querySelector("#condition");
  let conditionIcon = document.querySelector("#condition-icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  newTemp.innerHTML = `${temp}`;
  newCity.innerHTML = response.data.name;
  newHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  newWindSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  newCondition.innerHTML = response.data.weather[0].description;
  conditionIcon.setAttribute("src", iconUrl);
  conditionIcon.setAttribute("alt", response.data.weather[0].description);
}

function createUrl(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(weatherUrl).then(showData);
}

function getCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");
  createUrl(userCity.value);
}

createUrl("New York");
displayTime();
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", getCity);
