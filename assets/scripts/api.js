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

async function getWeatherByCoords(lat, lng) {
    const fetchWeather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=sunrise,sunset&timezone=auto&hourly=relative_humidity_2m&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min`,
    );

    if (!fetchWeather.ok) throw new Error("Weather API failed");

    return await fetchWeather.json();
}

async function getWeatherData(location) {
    if (!location.trim()) throw new Error("You have to enter a valid City!");
    const name = encodeURIComponent(location);
    try {
        const fetchGeo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}`,
        );

        if (!fetchGeo.ok) throw new Error("Couldn't fetch city information!");

        const data = await fetchGeo.json();

        if (!data.results || data.results.length === 0)
            throw new Error(`Unable to find ${location}! Try another city`);

        const { latitude, longitude } = data.results[0];
        const weatherData = await getWeatherByCoords(latitude, longitude);

        return weatherData;
        
    } catch (error) {
        throw error;
    }
}

export { getUserPosition, getWeatherByCoords, getWeatherData };
