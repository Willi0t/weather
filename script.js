// selecting elements from the DOM
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// Default city when the page loads
let cityInput = "London";
//Add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    //change from default city to the clicked one
    cityInput = e.target.innerHTML;
    //Function that fetches and displays all the data from the weather API
    fetchweatherData();
    //fade out the app
    app.style.opacity = "0";
  });
});

// add submit event to the from
form.addEventListener("submit", (e) => {
  if (search.value.length === 0) {
    alert("please type in a city name");
  } else {
    // change from default city to the one written in the input field
    cityInput = search.value;
    fetchweatherData();
    //remove all text from the inputfield
    search.value = "";
    app.style.opacity = "0";
  }

  //prevent default behaviour of the form
  e.preventDefault();
});

//date function
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}
console.log(dayOfTheWeek(30, 11, 2022));

//weather data fetch function
function fetchweatherData() {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=eac8c25f98e94790976144803223011&q=${cityInput}&aqi=no`
  )
    // takes the data in json format and coverts it to js object
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // adding temperature and weather condition
      temp.innerHTML = data.current.temp_c + "&#176";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      //new format : 17:53 - Friday 9, 10 2021
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = time;
      //name of the city to the page
      nameOutput.innerHTML = data.location.name;
      //get the icon url for the weather
      //set default time of day
      let timeOfDay = "day";
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      // loads icon from API
      icon.src = data.current.condition.icon;

      //weather details to the page
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      //get unique for each weather condidtion
      const code = data.current.condition.code;
      // change to night if it is night time in the city
      console.log(code);
      if (code === 1000) {
        console.log(timeOfDay);
        app.style.backgroundImage = `url(./content/backgroundImages/${timeOfDay}/Clear.jpg)`;
        // btn.style.background = "#e5ba92";
        if (timeOfDay === "night") {
          // btn.style.background = "#181e27";
        }
      } else if (
        code === 1003 ||
        code === 1006 ||
        code === 1009 ||
        code === 1030 ||
        code === 1069 ||
        code === 1087 ||
        code === 1135 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282
      ) {
        app.style.backgroundImage = `url(./content/backgroundImages/${timeOfDay}/Cloud.jpg)`;
        // btn.style.background = "#fa6d1b";
        if (timeOfDay === "night") {
          // btn.background = "#181e27";
        }
      } else if (
        code === 1063 ||
        code === 1069 ||
        code === 1072 ||
        code === 1150 ||
        code === 1153 ||
        code === 1180 ||
        code === 1183 ||
        code === 1186 ||
        code === 1189 ||
        code === 1192 ||
        code === 1195 ||
        code === 1204 ||
        code === 1207 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246 ||
        code === 1249 ||
        code === 1252
      ) {
        app.style.backgroundImage = `url(./content/backgroundImages/${timeOfDay}/Rain.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay === "night") {
          // btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./content/backgroundImages/${timeOfDay}/Snow.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay === "night") {
          // btn.style.background = "#1b1b1";
        }
      }
      app.style.opacity = 1;
    })
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = 1;
    });
}

fetchweatherData();
// app.style.opacity = 1;
