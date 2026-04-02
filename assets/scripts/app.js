import { getUserPosition, getWeatherByCoords, getWeatherData } from "./api.js";
import { renderWeather } from "./ui.js";

const loadingScreen = document.querySelector(".loading-screen");
const backgroundEl = document.querySelector(".background");
const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const statusEl = document.querySelector(".status");
const windEl = document.querySelector(".wind-speed");
const humidityEl = document.querySelector(".humidity");
const iconImg = document.querySelector(".main-icon");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const bottomEl = document.querySelector(".bottom");
const rightEl = document.querySelector(".right");
const loaderIcons = document.querySelectorAll(".loader-icon");

const elements = {
  backgroundEl,
  tempEl,
  statusEl,
  windEl,
  humidityEl,
  iconImg,
  bottomEl,
  rightEl
};

let loaderInterval;

async function searchCity() {
  startAnimationLoader();
  try {
    const city = searchInput.value;

    if (!city.trim()) throw new Error("Please enter a city");

    const formattedCity = city
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const weatherData = await getWeatherData(city);

    if (!weatherData) throw new Error("No weather data");

    cityEl.textContent = formattedCity;
    renderWeather(weatherData, elements);

    searchInput.value = "";
  } catch (error) {
    console.error(error);
    cityEl.textContent = "City not found";
    searchInput.value = ""; // καθαρίζει input
    searchInput.focus(); // 🔥 ξαναγράφει κατευθείαν
  } finally {
    stopAnimationLoader();
  }
}

function startAnimationLoader() {
  loadingScreen.classList.remove("hidden");

  if (!loaderIcons.length) return;

  let index = 0;

  // καθαρίζουμε προηγούμενο interval (important)
  if (loaderInterval) clearInterval(loaderInterval);

  // reset icons
  loaderIcons.forEach((icon) => icon.classList.remove("active"));
  loaderIcons[index].classList.add("active");

  loaderInterval = setInterval(() => {
    loaderIcons[index].classList.remove("active");

    index = (index + 1) % loaderIcons.length;

    loaderIcons[index].classList.add("active");
  }, 1300);
}

function stopAnimationLoader() {

  if (loaderInterval) {
    clearInterval(loaderInterval);
    loaderInterval = null;
  }
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 200);
}

async function init() {
  try {
    // setloading(true);

    const { lat, lng } = await getUserPosition();
    const weather = await getWeatherByCoords(lat, lng);

    renderWeather(weather, elements);
    cityEl.textContent = `Your Location`;

    // setloading(false);
  } catch (error) {
    const weather = await getWeatherData("London");
    renderWeather(weather, elements);
    cityEl.textContent = "London";
    console.error("Geolocation failed:", error);
  }
}


startAnimationLoader();

await init();

setTimeout(() => {
  stopAnimationLoader();
}, 3000);

searchBtn.addEventListener("click", searchCity);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchCity();
});

