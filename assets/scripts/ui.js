import { WEATHER_MAP, ICON_MAP, WEATHER_GRADIENTS } from "./maps.js";
import { getWeatherType, getTimeOfDay } from "./utilities.js";

function renderBackground(type, time, elements) {
  const gradientSet = WEATHER_GRADIENTS[type] || WEATHER_GRADIENTS["Clouds"];
  const gradient = gradientSet[time] || gradientSet["day"];

  elements.backgroundEl.style.background = gradient;
}

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
  return humidity;
}

function renderWeatherIcon(code, isDay) {
  const time = isDay ? "day" : "night";
  return ICON_MAP[time]?.[code] || "partly-cloudy-day.svg";
}

function renderFutureData(data, elements) {
  // καθαρίζουμε πριν κάνουμε render
  elements.bottomEl.innerHTML = "";

  const currentTime = new Date(data.current_weather.time).getHours();
  const hourlyTime = data.hourly.time;
  const hourlyTemp = data.hourly.temperature_2m;
  const hourlyCode = data.hourly.weathercode;

  //  βρίσκουμε start index
  let startIndex;

  for (let i = 0; i < hourlyTime.length; i++) {
    const hour = new Date(hourlyTime[i]).getHours();

    if (hour === currentTime) {
      startIndex = i;
      break;
    }
  }

  //  safety
  if (startIndex === undefined) return;

  //  loop για 12 ώρες (κάθε 2 ώρες)
  for (
    let i = startIndex;
    i < Math.min(startIndex + 12, hourlyTime.length);
    i += 2
  ) {
    const hour = new Date(hourlyTime[i]).getHours();
    const temp = hourlyTemp[i];
    const code = hourlyCode[i];

    // format ώρας
    const formattedHour = String(hour).padStart(2, "0") + ":00";

    // icon
    const icon = renderWeatherIcon(code, data.current_weather.is_day);

    // δημιουργία element
    const div = document.createElement("div");
    if (i === startIndex) {
      div.classList.add("active-hour");
    }
    div.classList.add("hour");

    div.innerHTML = `
      <p>${formattedHour}</p>
      <img src="assets/images/animated/${icon}" />
      <p>${Math.trunc(temp)}°</p>
    `;
    elements.bottomEl.append(div);
  }
}

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
  elements.iconImg.src = `assets/images/animated/${icon}`;
}

export { renderWeather };