/**
 * Utility functions for determining weather type and time of day
 * Used for UI styling (background gradients), not for display text
 */

// Time windows (in hours) to smooth transitions between day phases
const SUNRISE_WINDOW = 2;
const SUNSET_WINDOW = 1;

// Determines simplified weather category based on weather code
// Used to set background gradient (not UI text)
function getWeatherType(code) {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Clouds";
  if (code >= 61 && code <= 65) return "Rain";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 71 && code <= 75) return "Snow";
  return "Unknown";
}

// Determines time of day based on current time and sunrise/sunset
function getTimeOfDay(userTime, sunrise, sunset) {

  const hour = new Date(userTime).getHours();
  // Early morning transition period
  if (hour >= sunrise && hour <= sunrise + SUNRISE_WINDOW) return "sunrise";
   // Main daylight period
  if (hour > sunrise + SUNRISE_WINDOW && hour < sunset - SUNSET_WINDOW) return "day";
   // Evening transition period
  if (hour >= sunset - SUNSET_WINDOW && hour <= sunset + (SUNSET_WINDOW / 2)) return "sunset";
  //Main nightime period
  return "night";
}

export { getWeatherType, getTimeOfDay };