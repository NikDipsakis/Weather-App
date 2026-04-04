/**
 * Main application controller
 * Handles:
 * - User interactions (search, input)
 * - Initial app loading
 * - Loader animation
 * - Connecting API layer with UI rendering
 */

import { getUserPosition, getWeatherByCoords, getWeatherData } from "./api.js";
import { renderWeather } from "./ui.js";

// DOM elements
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

// Group UI elements for easier passing between modules
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

// Handles user search input and updates UI with fetched weather data
async function searchCity() {
  startAnimationLoader();
  try {
    const city = searchInput.value;

    if (!city.trim()) throw new Error("Please enter a city");

    // Format city name for display (capitalize each word)
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

    // Fallback UI state when search fails
    cityEl.textContent = "City not found";
    searchInput.value = "";
    searchInput.focus();
  } finally {
    stopAnimationLoader();
  }
}

// Starts animated loader by cycling through icons
function startAnimationLoader() {
  loadingScreen.classList.remove("hidden");

  if (!loaderIcons.length) return;

  let index = 0;

  // Clear any existing interval (prevents duplicates)
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

// Stops loader animation and hides loading screen
function stopAnimationLoader() {
  if (loaderInterval) {
    clearInterval(loaderInterval);
    loaderInterval = null;
  }
  // Small delay for smoother UI transition
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 200);
}

// Initializes app with user's location or fallback city
async function initApp() {
  try {
    const { lat, lng } = await getUserPosition();
    const weather = await getWeatherByCoords(lat, lng);

    renderWeather(weather, elements);
    cityEl.textContent = `Your Location`;

  } catch (error) {
    // Fallback if geolocation fails (Chosen "london" but up to you)
    const weather = await getWeatherData("London");
    renderWeather(weather, elements);
    cityEl.textContent = "London";
    console.error("Geolocation failed:", error);
  }
}


async function init() {
  // Fallback if geolocation fails
  startAnimationLoader();
  //init App
  await initApp();
 
  // stopAnimationLoader();
  // Safety fallback to stop loader after delay
  // Giving extra time on the first loading screen to see animation clearly
  // For regural execution of loading screen ---> stopAnimationLoader();
  setTimeout(() => {
    stopAnimationLoader();
  }, 3000);
}


init();




// Event listeners (Using enter key besides click to Search)
searchBtn.addEventListener("click", searchCity);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchCity();
});

