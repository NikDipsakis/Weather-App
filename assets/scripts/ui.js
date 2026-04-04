/**
 * UI rendering module
 * Handles current weather display, hourly forecast, and multi-day forecast 
 */

import { WEATHER_MAP, ICON_MAP, WEATHER_GRADIENTS } from "./maps.js";
import { getWeatherType, getTimeOfDay } from "./utilities.js";

// Updates background gradient based on weather type and time of day
function renderBackground(type, time, elements) {
  const gradientSet = WEATHER_GRADIENTS[type] || WEATHER_GRADIENTS["Clouds"];
  const gradient = gradientSet[time] || gradientSet["day"];

  elements.backgroundEl.style.background = gradient;
}

// Extracts humidity value matching the current hour from hourly data
function getHumidity(data) {
  const currentTime = new Date(data.current_weather.time).getHours();
  const hourlyTime = data.hourly.time;
  const humidityHourly = data.hourly.relative_humidity_2m;
  let humidity = "-";

  for (let i = 0; i < hourlyTime.length; i++) {
    const hour = new Date(hourlyTime[i]).getHours();

    if (hour === currentTime) {
      return humidityHourly[i];
    }
  }

  // Fallback if no matching hour is found
  return humidity;
}

// Returns correct weather icon based on weather code and time of day (from maps.js module)
function renderWeatherIcon(code, isDay) {
  const time = isDay ? "day" : "night";
  return ICON_MAP[time]?.[code] || ICON_MAP[time][1];
}

// Renders hourly forecast for the next 12 hours (every 2 hours)(Bottom section)
function renderFutureData(data, elements) {
  // Clear previous forecast
  elements.bottomEl.innerHTML = "";

  const currentTime = new Date(data.current_weather.time).getHours();
  const hourlyTime = data.hourly.time;
  const hourlyTemp = data.hourly.temperature_2m;
  const hourlyCode = data.hourly.weathercode;

  let startIndex;

  // Find index matching current hour
  for (let i = 0; i < hourlyTime.length; i++) {
    const hour = new Date(hourlyTime[i]).getHours();

    if (hour === currentTime) {
      startIndex = i;
      break;
    }
  }

  // Exit if no matching hour found
  if (startIndex === undefined) return;

  // Loop through next 12 hours (step = 2 hours)
  for (
    let i = startIndex;
    i < Math.min(startIndex + 12, hourlyTime.length);
    i += 2
  ) {
    const hour = new Date(hourlyTime[i]).getHours();
    const temp = hourlyTemp[i];
    const code = hourlyCode[i];

     // Format hour
    const formattedHour = String(hour).padStart(2, "0") + ":00";

    // icon
    const icon = renderWeatherIcon(code, data.current_weather.is_day);

    // Create element
    const div = document.createElement("div");
    if (i === startIndex) {
      div.classList.add("active-hour");
    }
    div.classList.add("hour");

    div.innerHTML = `
      <p>${formattedHour}</p>
      <img src="${icon}" />
      <p>${Math.trunc(temp)}°</p>
    `;
    elements.bottomEl.append(div);
  }

}

// Renders forecast for today and the next two days (Right section)
function renderNextTwoDays(data, elements) {
  const nextTwoDays = [];
  const daily = data.daily.time;
  const dailyHighTemp = data.daily.temperature_2m_max;
  const dailyLowTemp = data.daily.temperature_2m_min;
  elements.rightEl.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const tempHigh = Math.trunc(dailyHighTemp[i]);
    const tempLow = Math.trunc(dailyLowTemp[i]);
    let dayName = new Date(daily[i]).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const div = document.createElement("div");

    //Highlight Current day (Today)
    div.classList.add("day");
    if (i === 0) {
      div.classList.add("active");
      dayName = "Today";
    }

    div.innerHTML = `
    <p>${dayName}</p>
    <p>H:${tempHigh}°</p>
    <span>L:${tempLow}°</span> 
    `;
    elements.rightEl.append(div);
    nextTwoDays.push({
      day: dayName,
      tempH: tempHigh,
      tempL: tempLow,
    });
  }
  return nextTwoDays;
}

//Main render function handler responsible for updating the entire UI with weather data 
function renderWeather(data, elements) {
  const weatherTemp = data.current_weather.temperature;
  const weatherWind = data.current_weather.windspeed;
  const weatherCode = data.current_weather.weathercode;
  const userWeatherDate = data.current_weather.time;
  const isDay = data.current_weather.is_day;

  const sunRise = new Date(data.daily.sunrise[0]).getHours();
  const sunSet = new Date(data.daily.sunset[0]).getHours();

  const weatherType = getWeatherType(weatherCode);
  const timeOfDay = getTimeOfDay(userWeatherDate, sunRise, sunSet);
  const humidity = getHumidity(data);
  const icon = renderWeatherIcon(weatherCode, isDay);
  renderBackground(weatherType, timeOfDay, elements);
  renderFutureData(data, elements);
  renderNextTwoDays(data, elements);

  elements.tempEl.textContent = `${Math.trunc(weatherTemp)}°`;
  elements.statusEl.textContent = WEATHER_MAP[weatherCode];
  elements.windEl.textContent = `Wind: ${weatherWind} km/h`;
  elements.humidityEl.textContent = `Humidity: ${humidity}%`;
  elements.iconImg.src = icon;
  // console.log(data);
}

export { renderWeather };