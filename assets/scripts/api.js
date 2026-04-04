/**
 * Weather API & Geolocation module
 * Handles:
 * - User location access (browser geolocation)
 * - Fetching weather data from Open-Meteo API
 * - Converting city names into coordinates
 */

// Requests user's current location using the browser Geolocation API
// Returns latitude and longitude or rejects if permission is denied
function getUserPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => reject("Location denied"),
        );
    });
}

// Fetches weather data based on geographic coordinates
// Includes current weather, hourly forecast, and daily data
async function getWeatherByCoords(lat, lng) {
    const fetchWeather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=sunrise,sunset&timezone=auto&hourly=relative_humidity_2m&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min`,
    );

    if (!fetchWeather.ok) throw new Error("Weather API failed");

    return await fetchWeather.json();
}

// Fetches weather data using a city name
// 1. Converts city → coordinates (geocoding)
// 2. Fetches weather using those coordinates
async function getWeatherData(location) {
    if (!location.trim()) throw new Error("You have to enter a valid City!");
    const name = encodeURIComponent(location);
    try {
        const fetchGeo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}`,
        );

        if (!fetchGeo.ok) throw new Error("Couldn't fetch city information!");

        const data = await fetchGeo.json();
        // Ensure at least one result exists
        if (!data.results || data.results.length === 0)
            throw new Error(`Unable to find ${location}! Try another city`);

        const { latitude, longitude } = data.results[0];
        const weatherData = await getWeatherByCoords(latitude, longitude);

        return weatherData;

    } catch (error) {
        // Re-throw error
        throw error;
    }
}

export { getUserPosition, getWeatherByCoords, getWeatherData };
