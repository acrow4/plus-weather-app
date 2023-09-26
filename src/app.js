let apiKey = "667d9f573c8af4c33457be5d561a9148";

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let dayOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return dayOfWeek[day];
}

function showData(response) {
  let temp = Math.round(response.data.main.temp);
  fahrenheitTemp = temp;
  let newTemp = document.querySelector("#current-temp");
  let newCity = document.querySelector("#city");
  let newHumidity = document.querySelector("#humidity");
  let newWindSpeed = document.querySelector("#wind-speed");
  let newCondition = document.querySelector("#condition");
  let conditionIcon = document.querySelector("#condition-icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  let activeLink = document.querySelector("#f-link");
  let inactiveLink = document.querySelector("#c-link");
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=imperial`;
  activeLink.setAttribute("class", "active");
  inactiveLink.removeAttribute("class");
  newTemp.innerHTML = `${temp}`;
  newCity.innerHTML = response.data.name;
  newHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  newWindSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  newCondition.innerHTML = response.data.weather[0].description;
  conditionIcon.setAttribute("src", iconUrl);
  conditionIcon.setAttribute("alt", response.data.weather[0].description);
  axios.get(forecastUrl).then(showForecast);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let newForecast = `<div class="row weather-forecast">`;
  let border = "border-right";
  let days = response.data.daily;
  let day = null;

  days.forEach(function (day, key, days) {
    let forecastIcon = response.data.daily[key].weather[0].icon;
    if (Object.is(0, key)) {
      border = "border-right first";
    } else {
      border = "border-right";
    }
    if (key > 3) {
      border = "";
    }

    day = formatDay(response.data.daily[key].dt);
    if (key < 5) {
      newForecast =
        newForecast +
        `   
          <div class="col ${border}">
            <img
              src="https://openweathermap.org/img/wn/${forecastIcon}.png"
              alt="clear"
              id="condition-icon"
              class="current-condition"
            />
            <div class="forecast-text">
              ${day}<br />
              <span class="high-temp">${Math.round(
                response.data.daily[key].temp.max
              )}°</span> / ${Math.round(response.data.daily[key].temp.min)}°
            </div>
          </div>`;
    }
  });

  newForecast = newForecast + `</div>`;
  forecastElement.innerHTML = newForecast;
}

function createUrl(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(weatherUrl).then(showData);
}

function getCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");
  createUrl(userCity.value);
  userCity.value = "";
}

function convertToC(event) {
  event.preventDefault();
  let activeLink = document.querySelector("#c-link");
  let inactiveLink = document.querySelector("#f-link");
  activeLink.setAttribute("class", "active");
  inactiveLink.removeAttribute("class");
  let newTemp = document.querySelector("#current-temp");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  newTemp.innerHTML = `${Math.round(celciusTemp)}`;
}

function convertToF(event) {
  event.preventDefault();
  let activeLink = document.querySelector("#f-link");
  let inactiveLink = document.querySelector("#c-link");
  activeLink.setAttribute("class", "active");
  inactiveLink.removeAttribute("class");
  let newTemp = document.querySelector("#current-temp");
  newTemp.innerHTML = `${fahrenheitTemp}`;
}

let fahrenheitTemp = null;
displayTime();
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", getCity);
let convertLink = document.querySelector("#c-link");
convertLink.addEventListener("click", convertToC);
convertLink = document.querySelector("#f-link");
convertLink.addEventListener("click", convertToF);
createUrl("New York");
//showForecast();
