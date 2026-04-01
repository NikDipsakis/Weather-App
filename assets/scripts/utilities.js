const SUNRISE_WINDOW = 2;
const SUNSET_WINDOW = 1;

function getWeatherType(code) {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Clouds";
  if (code >= 61 && code <= 65) return "Rain";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 71 && code <= 75) return "Snow";
  return "Unknown";
}

function getTimeOfDay(userTime, sunrise, sunset) {

  const hour = new Date(userTime).getHours();

  if (hour >= sunrise && hour <= sunrise + SUNRISE_WINDOW) return "sunrise";
  if (hour > sunrise + SUNRISE_WINDOW && hour < sunset - SUNSET_WINDOW) return "day";
  if (hour >= sunset - SUNSET_WINDOW && hour <= sunset + SUNSET_WINDOW) return "sunset";
  return "night";
}

export { getWeatherType, getTimeOfDay };