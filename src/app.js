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
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  let newForecast = `<div class="row weather-forecast">`;
  let border = "border-right";

  days.forEach(function (day, key, days) {
    if (Object.is(0, key)) {
      border = "border-right first";
    } else {
      border = "border-right";
    }
    if (Object.is(days.length - 1, key)) {
      border = "";
    }

    console.log(days.length);
    console.log(key);

    newForecast =
      newForecast +
      `   
          <div class="col ${border}">
            <img
              src="https://openweathermap.org/img/wn/03d@2x.png"
              alt="clear"
              id="condition-icon"
              class="current-condition"
            />
            <div class="forecast-text">
              ${day}<br />
              <span class="high-temp">93°</span> / 87°
            </div>
          </div>`;
  });

  newForecast = newForecast + `</div>`;
  console.log(newForecast);
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
showForecast();
