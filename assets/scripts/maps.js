/**
 * Weather configuration module
 * Contains icon mappings, weather descriptions, and UI background styles
 */

// Static imports ensure Parcel includes all icons in the production build
// Icons are separated by time of day for accurate UI representation
// DAY icons
import clearDay from "../images/animated/clear-day.svg";
import partlyCloudyDay from "../images/animated/partly-cloudy-day.svg";
import overcastDay from "../images/animated/overcast-day.svg";
import cloudy from "../images/animated/cloudy.svg";
import fogDay from "../images/animated/fog-day.svg";
import fog from "../images/animated/fog.svg";
import partlyCloudyDayDrizzle from "../images/animated/partly-cloudy-day-drizzle.svg";
import drizzle from "../images/animated/drizzle.svg";
import partlyCloudyDayRain from "../images/animated/partly-cloudy-day-rain.svg";
import rain from "../images/animated/rain.svg";
import hail from "../images/animated/hail.svg";
import snow from "../images/animated/snow.svg"; 
import thunderstorms from "../images/animated/thunderstorms.svg";
import thunderstormsDayRain from "../images/animated/thunderstorms-day-rain.svg";
import thunderstormsRain from "../images/animated/thunderstorms-rain.svg";

// NIGHT icons
import clearNight from "../images/animated/clear-night.svg";
import partlyCloudyNight from "../images/animated/partly-cloudy-night.svg";
import overcastNight from "../images/animated/overcast-night.svg";
import fogNight from "../images/animated/fog-night.svg";
import partlyCloudyNightDrizzle from "../images/animated/partly-cloudy-night-drizzle.svg";
import partlyCloudyNightRain from "../images/animated/partly-cloudy-night-rain.svg";
import thunderstormsNightRain from "../images/animated/thunderstorms-night-rain.svg";


// Maps weather codes to corresponding icons for day and night
// Using Object.freeze to prevent accidental mutations
const ICON_MAP = Object.freeze({
    day: {
        0: clearDay,
        1: partlyCloudyDay,
        2: overcastDay,
        3: cloudy,
        45: fogDay,
        48: fog,
        51: partlyCloudyDayDrizzle,
        53: partlyCloudyDayDrizzle,
        55: drizzle,
        61: partlyCloudyDayRain,
        63: rain,
        65: rain,
        71: hail,
        73: snow,
        75: snow,
        80: rain,
        95: thunderstorms,
        96: thunderstormsDayRain,
        99: thunderstormsRain,
    },

    night: {
        0: clearNight,
        1: partlyCloudyNight,
        2: overcastNight,
        3: cloudy,
        45: fogNight,
        48: fog,
        51: partlyCloudyNightDrizzle,
        53: partlyCloudyNightDrizzle,
        55: drizzle,
        61: partlyCloudyNightRain,
        63: rain,
        65: rain,
        71: hail,
        73: snow,
        75: snow,
        80: rain,
        95: thunderstorms,
        96: thunderstormsNightRain,
        99: thunderstormsRain,
    },
});

// Maps weather codes to human-readable descriptions
const WEATHER_MAP = Object.freeze({
    0: "Clear Sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Rain",
    63: "Rain (medium)",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight Rain Shower",
    95: "Thunderstorm",
    96: "Thunderstorm hail",
    99: "Thunderstorm heavy hail",
});

// Defines background gradients based on weather condition and time of day
const WEATHER_GRADIENTS = Object.freeze({
    Clear: {
        sunrise: "linear-gradient(135deg, #ff9a9e, #ffcfa2)",
        day: "linear-gradient(135deg, #4facfe, #00befe)",
        sunset: "linear-gradient(135deg, #f6d365, #ff5829)",
        night: "linear-gradient(135deg, #0d1446, #040022, #000322)",
    },
    Rain: {
        sunrise: "linear-gradient(135deg, #d6c8d6, #383b3f)",
        day: "linear-gradient(135deg, #8dadff, #3d4c54)",
        sunset: "linear-gradient(135deg, #5b4949, #784024)",
        night: "linear-gradient(135deg, #2f325b, #141425)",
    },
    Clouds: {
        sunrise: "linear-gradient(135deg, #d7d2cc, #304352)",
        day: "linear-gradient(135deg, #87b1cd, #2c3e50)",
        sunset: "linear-gradient(135deg, #af8b72, #b7c9ec)",
        night: "linear-gradient(135deg, #2d2c50, #252228)",
    },
    Fog: {
        sunrise: "linear-gradient(135deg, #d7d2cc, #304352)",
        day: "linear-gradient(135deg, #cfd9df, #e2ebf0)",
        sunset: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
        night: "linear-gradient(135deg, #2c3e50, #4b6cb7)",
    },
    Snow: {
        sunrise: "linear-gradient(135deg, #e6dada, #274046)",
        day: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        sunset: "linear-gradient(135deg, #d9a7c7, #fffcdc)",
        night: "linear-gradient(135deg, #1c2a45, #040b19)",
    },
});

export { WEATHER_MAP, ICON_MAP, WEATHER_GRADIENTS };