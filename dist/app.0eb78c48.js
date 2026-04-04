// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/scripts/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserPosition = getUserPosition;
exports.getWeatherByCoords = getWeatherByCoords;
exports.getWeatherData = getWeatherData;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, function () {
      return reject("Location denied");
    });
  });
}

// Fetches weather data based on geographic coordinates
// Includes current weather, hourly forecast, and daily data
function getWeatherByCoords(_x, _x2) {
  return _getWeatherByCoords.apply(this, arguments);
} // Fetches weather data using a city name
// 1. Converts city → coordinates (geocoding)
// 2. Fetches weather using those coordinates
function _getWeatherByCoords() {
  _getWeatherByCoords = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(lat, lng) {
    var fetchWeather;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return fetch("https://api.open-meteo.com/v1/forecast?latitude=".concat(lat, "&longitude=").concat(lng, "&current_weather=true&daily=sunrise,sunset&timezone=auto&hourly=relative_humidity_2m&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min"));
        case 1:
          fetchWeather = _context.v;
          if (fetchWeather.ok) {
            _context.n = 2;
            break;
          }
          throw new Error("Weather API failed");
        case 2:
          _context.n = 3;
          return fetchWeather.json();
        case 3:
          return _context.a(2, _context.v);
      }
    }, _callee);
  }));
  return _getWeatherByCoords.apply(this, arguments);
}
function getWeatherData(_x3) {
  return _getWeatherData.apply(this, arguments);
}
function _getWeatherData() {
  _getWeatherData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(location) {
    var name, fetchGeo, data, _data$results$, latitude, longitude, weatherData, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (location.trim()) {
            _context2.n = 1;
            break;
          }
          throw new Error("You have to enter a valid City!");
        case 1:
          name = encodeURIComponent(location);
          _context2.p = 2;
          _context2.n = 3;
          return fetch("https://geocoding-api.open-meteo.com/v1/search?name=".concat(name));
        case 3:
          fetchGeo = _context2.v;
          if (fetchGeo.ok) {
            _context2.n = 4;
            break;
          }
          throw new Error("Couldn't fetch city information!");
        case 4:
          _context2.n = 5;
          return fetchGeo.json();
        case 5:
          data = _context2.v;
          if (!(!data.results || data.results.length === 0)) {
            _context2.n = 6;
            break;
          }
          throw new Error("Unable to find ".concat(location, "! Try another city"));
        case 6:
          _data$results$ = data.results[0], latitude = _data$results$.latitude, longitude = _data$results$.longitude;
          _context2.n = 7;
          return getWeatherByCoords(latitude, longitude);
        case 7:
          weatherData = _context2.v;
          return _context2.a(2, weatherData);
        case 8:
          _context2.p = 8;
          _t = _context2.v;
          throw _t;
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 8]]);
  }));
  return _getWeatherData.apply(this, arguments);
}
},{}],"assets/images/animated/clear-day.svg":[function(require,module,exports) {
module.exports = "/clear-day.368b89f3.svg";
},{}],"assets/images/animated/partly-cloudy-day.svg":[function(require,module,exports) {
module.exports = "/partly-cloudy-day.773258ed.svg";
},{}],"assets/images/animated/overcast-day.svg":[function(require,module,exports) {
module.exports = "/overcast-day.9ee59136.svg";
},{}],"assets/images/animated/cloudy.svg":[function(require,module,exports) {
module.exports = "/cloudy.99b3e539.svg";
},{}],"assets/images/animated/fog-day.svg":[function(require,module,exports) {
module.exports = "/fog-day.6068c8f1.svg";
},{}],"assets/images/animated/fog.svg":[function(require,module,exports) {
module.exports = "/fog.8da748b6.svg";
},{}],"assets/images/animated/partly-cloudy-day-drizzle.svg":[function(require,module,exports) {
module.exports = "/partly-cloudy-day-drizzle.99d14455.svg";
},{}],"assets/images/animated/drizzle.svg":[function(require,module,exports) {
module.exports = "/drizzle.aa775df6.svg";
},{}],"assets/images/animated/partly-cloudy-day-rain.svg":[function(require,module,exports) {
module.exports = "/partly-cloudy-day-rain.bca8b674.svg";
},{}],"assets/images/animated/rain.svg":[function(require,module,exports) {
module.exports = "/rain.fa1d2f8f.svg";
},{}],"assets/images/animated/hail.svg":[function(require,module,exports) {
module.exports = "/hail.a8b7d16e.svg";
},{}],"assets/images/animated/snow.svg":[function(require,module,exports) {
module.exports = "/snow.10d9ec38.svg";
},{}],"assets/images/animated/thunderstorms.svg":[function(require,module,exports) {
module.exports = "/thunderstorms.c9659362.svg";
},{}],"assets/images/animated/thunderstorms-day-rain.svg":[function(require,module,exports) {
module.exports = "/thunderstorms-day-rain.1cbb8854.svg";
},{}],"assets/images/animated/thunderstorms-rain.svg":[function(require,module,exports) {
module.exports = "/thunderstorms-rain.b5f9888a.svg";
},{}],"assets/images/animated/clear-night.svg":[function(require,module,exports) {
module.exports = "/clear-night.df135d40.svg";
},{}],"assets/images/animated/partly-cloudy-night.svg":[function(require,module,exports) {
module.exports = "/partly-cloudy-night.a3ae3325.svg";
},{}],"assets/images/animated/overcast-night.svg":[function(require,module,exports) {
module.exports = "/overcast-night.62d4c532.svg";
},{}],"assets/images/animated/fog-night.svg":[function(require,module,exports) {
module.exports = "/fog-night.d37632f9.svg";
},{}],"assets/images/animated/partly-cloudy-night-drizzle.svg":[function(require,module,exports) {
module.exports = "/partly-cloudy-night-drizzle.42097c9c.svg";
},{}],"assets/images/animated/partly-cloudy-night-rain.svg":[function(require,module,exports) {
module.exports = "/partly-cloudy-night-rain.6edf32a1.svg";
},{}],"assets/images/animated/thunderstorms-night-rain.svg":[function(require,module,exports) {
module.exports = "/thunderstorms-night-rain.11043f8a.svg";
},{}],"assets/scripts/maps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEATHER_MAP = exports.WEATHER_GRADIENTS = exports.ICON_MAP = void 0;
var _clearDay = _interopRequireDefault(require("../images/animated/clear-day.svg"));
var _partlyCloudyDay = _interopRequireDefault(require("../images/animated/partly-cloudy-day.svg"));
var _overcastDay = _interopRequireDefault(require("../images/animated/overcast-day.svg"));
var _cloudy = _interopRequireDefault(require("../images/animated/cloudy.svg"));
var _fogDay = _interopRequireDefault(require("../images/animated/fog-day.svg"));
var _fog = _interopRequireDefault(require("../images/animated/fog.svg"));
var _partlyCloudyDayDrizzle = _interopRequireDefault(require("../images/animated/partly-cloudy-day-drizzle.svg"));
var _drizzle = _interopRequireDefault(require("../images/animated/drizzle.svg"));
var _partlyCloudyDayRain = _interopRequireDefault(require("../images/animated/partly-cloudy-day-rain.svg"));
var _rain = _interopRequireDefault(require("../images/animated/rain.svg"));
var _hail = _interopRequireDefault(require("../images/animated/hail.svg"));
var _snow = _interopRequireDefault(require("../images/animated/snow.svg"));
var _thunderstorms = _interopRequireDefault(require("../images/animated/thunderstorms.svg"));
var _thunderstormsDayRain = _interopRequireDefault(require("../images/animated/thunderstorms-day-rain.svg"));
var _thunderstormsRain = _interopRequireDefault(require("../images/animated/thunderstorms-rain.svg"));
var _clearNight = _interopRequireDefault(require("../images/animated/clear-night.svg"));
var _partlyCloudyNight = _interopRequireDefault(require("../images/animated/partly-cloudy-night.svg"));
var _overcastNight = _interopRequireDefault(require("../images/animated/overcast-night.svg"));
var _fogNight = _interopRequireDefault(require("../images/animated/fog-night.svg"));
var _partlyCloudyNightDrizzle = _interopRequireDefault(require("../images/animated/partly-cloudy-night-drizzle.svg"));
var _partlyCloudyNightRain = _interopRequireDefault(require("../images/animated/partly-cloudy-night-rain.svg"));
var _thunderstormsNightRain = _interopRequireDefault(require("../images/animated/thunderstorms-night-rain.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Weather configuration module
 * Contains icon mappings, weather descriptions, and UI background styles
 */

// Static imports ensure Parcel includes all icons in the production build
// Icons are separated by time of day for accurate UI representation
// DAY icons

// NIGHT icons

// Maps weather codes to corresponding icons for day and night
// Using Object.freeze to prevent accidental mutations
var ICON_MAP = exports.ICON_MAP = Object.freeze({
  day: {
    0: _clearDay.default,
    1: _partlyCloudyDay.default,
    2: _overcastDay.default,
    3: _cloudy.default,
    45: _fogDay.default,
    48: _fog.default,
    51: _partlyCloudyDayDrizzle.default,
    53: _partlyCloudyDayDrizzle.default,
    55: _drizzle.default,
    61: _partlyCloudyDayRain.default,
    63: _rain.default,
    65: _rain.default,
    71: _hail.default,
    73: _snow.default,
    75: _snow.default,
    80: _rain.default,
    95: _thunderstorms.default,
    96: _thunderstormsDayRain.default,
    99: _thunderstormsRain.default
  },
  night: {
    0: _clearNight.default,
    1: _partlyCloudyNight.default,
    2: _overcastNight.default,
    3: _cloudy.default,
    45: _fogNight.default,
    48: _fog.default,
    51: _partlyCloudyNightDrizzle.default,
    53: _partlyCloudyNightDrizzle.default,
    55: _drizzle.default,
    61: _partlyCloudyNightRain.default,
    63: _rain.default,
    65: _rain.default,
    71: _hail.default,
    73: _snow.default,
    75: _snow.default,
    80: _rain.default,
    95: _thunderstorms.default,
    96: _thunderstormsNightRain.default,
    99: _thunderstormsRain.default
  }
});

// Maps weather codes to human-readable descriptions
var WEATHER_MAP = exports.WEATHER_MAP = Object.freeze({
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
  99: "Thunderstorm heavy hail"
});

// Defines background gradients based on weather condition and time of day
var WEATHER_GRADIENTS = exports.WEATHER_GRADIENTS = Object.freeze({
  Clear: {
    sunrise: "linear-gradient(135deg, #ff9a9e, #ffcfa2)",
    day: "linear-gradient(135deg, #4facfe, #00befe)",
    sunset: "linear-gradient(135deg, #f6d365, #ff5829)",
    night: "linear-gradient(135deg, #0d1446, #040022, #000322)"
  },
  Rain: {
    sunrise: "linear-gradient(135deg, #d6c8d6, #383b3f)",
    day: "linear-gradient(135deg, #8dadff, #3d4c54)",
    sunset: "linear-gradient(135deg, #5b4949, #784024)",
    night: "linear-gradient(135deg, #2f325b, #141425)"
  },
  Clouds: {
    sunrise: "linear-gradient(135deg, #d7d2cc, #304352)",
    day: "linear-gradient(135deg, #87b1cd, #2c3e50)",
    sunset: "linear-gradient(135deg, #af8b72, #b7c9ec)",
    night: "linear-gradient(135deg, #2d2c50, #252228)"
  },
  Fog: {
    sunrise: "linear-gradient(135deg, #d7d2cc, #304352)",
    day: "linear-gradient(135deg, #cfd9df, #e2ebf0)",
    sunset: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
    night: "linear-gradient(135deg, #2c3e50, #4b6cb7)"
  },
  Snow: {
    sunrise: "linear-gradient(135deg, #e6dada, #274046)",
    day: "linear-gradient(135deg, #e0eafc, #cfdef3)",
    sunset: "linear-gradient(135deg, #d9a7c7, #fffcdc)",
    night: "linear-gradient(135deg, #1c2a45, #040b19)"
  }
});
},{"../images/animated/clear-day.svg":"assets/images/animated/clear-day.svg","../images/animated/partly-cloudy-day.svg":"assets/images/animated/partly-cloudy-day.svg","../images/animated/overcast-day.svg":"assets/images/animated/overcast-day.svg","../images/animated/cloudy.svg":"assets/images/animated/cloudy.svg","../images/animated/fog-day.svg":"assets/images/animated/fog-day.svg","../images/animated/fog.svg":"assets/images/animated/fog.svg","../images/animated/partly-cloudy-day-drizzle.svg":"assets/images/animated/partly-cloudy-day-drizzle.svg","../images/animated/drizzle.svg":"assets/images/animated/drizzle.svg","../images/animated/partly-cloudy-day-rain.svg":"assets/images/animated/partly-cloudy-day-rain.svg","../images/animated/rain.svg":"assets/images/animated/rain.svg","../images/animated/hail.svg":"assets/images/animated/hail.svg","../images/animated/snow.svg":"assets/images/animated/snow.svg","../images/animated/thunderstorms.svg":"assets/images/animated/thunderstorms.svg","../images/animated/thunderstorms-day-rain.svg":"assets/images/animated/thunderstorms-day-rain.svg","../images/animated/thunderstorms-rain.svg":"assets/images/animated/thunderstorms-rain.svg","../images/animated/clear-night.svg":"assets/images/animated/clear-night.svg","../images/animated/partly-cloudy-night.svg":"assets/images/animated/partly-cloudy-night.svg","../images/animated/overcast-night.svg":"assets/images/animated/overcast-night.svg","../images/animated/fog-night.svg":"assets/images/animated/fog-night.svg","../images/animated/partly-cloudy-night-drizzle.svg":"assets/images/animated/partly-cloudy-night-drizzle.svg","../images/animated/partly-cloudy-night-rain.svg":"assets/images/animated/partly-cloudy-night-rain.svg","../images/animated/thunderstorms-night-rain.svg":"assets/images/animated/thunderstorms-night-rain.svg"}],"assets/scripts/utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeOfDay = getTimeOfDay;
exports.getWeatherType = getWeatherType;
/**
 * Utility functions for determining weather type and time of day
 * Used for UI styling (background gradients), not for display text
 */

// Time windows (in hours) to smooth transitions between day phases
var SUNRISE_WINDOW = 2;
var SUNSET_WINDOW = 1;

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
  var hour = new Date(userTime).getHours();
  // Early morning transition period
  if (hour >= sunrise && hour <= sunrise + SUNRISE_WINDOW) return "sunrise";
  // Main daylight period
  if (hour > sunrise + SUNRISE_WINDOW && hour < sunset - SUNSET_WINDOW) return "day";
  // Evening transition period
  if (hour >= sunset - SUNSET_WINDOW && hour <= sunset + SUNSET_WINDOW / 2) return "sunset";
  //Main nightime period
  return "night";
}
},{}],"assets/scripts/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWeather = renderWeather;
var _maps = require("./maps.js");
var _utilities = require("./utilities.js");
/**
 * UI rendering module
 * Handles current weather display, hourly forecast, and multi-day forecast 
 */

// Updates background gradient based on weather type and time of day
function renderBackground(type, time, elements) {
  var gradientSet = _maps.WEATHER_GRADIENTS[type] || _maps.WEATHER_GRADIENTS["Clouds"];
  var gradient = gradientSet[time] || gradientSet["day"];
  elements.backgroundEl.style.background = gradient;
}

// Extracts humidity value matching the current hour from hourly data
function getHumidity(data) {
  var currentTime = new Date(data.current_weather.time).getHours();
  var hourlyTime = data.hourly.time;
  var humidityHourly = data.hourly.relative_humidity_2m;
  var humidity = "-";
  for (var i = 0; i < hourlyTime.length; i++) {
    var hour = new Date(hourlyTime[i]).getHours();
    if (hour === currentTime) {
      return humidityHourly[i];
    }
  }

  // Fallback if no matching hour is found
  return humidity;
}

// Returns correct weather icon based on weather code and time of day (from maps.js module)
function renderWeatherIcon(code, isDay) {
  var _ICON_MAP$time;
  var time = isDay ? "day" : "night";
  return ((_ICON_MAP$time = _maps.ICON_MAP[time]) === null || _ICON_MAP$time === void 0 ? void 0 : _ICON_MAP$time[code]) || _maps.ICON_MAP[time][1];
}

// Renders hourly forecast for the next 12 hours (every 2 hours)(Bottom section)
function renderFutureData(data, elements) {
  // Clear previous forecast
  elements.bottomEl.innerHTML = "";
  var currentTime = new Date(data.current_weather.time).getHours();
  var hourlyTime = data.hourly.time;
  var hourlyTemp = data.hourly.temperature_2m;
  var hourlyCode = data.hourly.weathercode;
  var startIndex;

  // Find index matching current hour
  for (var i = 0; i < hourlyTime.length; i++) {
    var hour = new Date(hourlyTime[i]).getHours();
    if (hour === currentTime) {
      startIndex = i;
      break;
    }
  }

  // Exit if no matching hour found
  if (startIndex === undefined) return;

  // Loop through next 12 hours (step = 2 hours)
  for (var _i = startIndex; _i < Math.min(startIndex + 12, hourlyTime.length); _i += 2) {
    var _hour = new Date(hourlyTime[_i]).getHours();
    var temp = hourlyTemp[_i];
    var code = hourlyCode[_i];

    // Format hour
    var formattedHour = String(_hour).padStart(2, "0") + ":00";

    // icon
    var icon = renderWeatherIcon(code, data.current_weather.is_day);

    // Create element
    var div = document.createElement("div");
    if (_i === startIndex) {
      div.classList.add("active-hour");
    }
    div.classList.add("hour");
    div.innerHTML = "\n      <p>".concat(formattedHour, "</p>\n      <img src=\"").concat(icon, "\" />\n      <p>").concat(Math.trunc(temp), "\xB0</p>\n    ");
    elements.bottomEl.append(div);
  }
}

// Renders forecast for today and the next two days (Right section)
function renderNextTwoDays(data, elements) {
  var nextTwoDays = [];
  var daily = data.daily.time;
  var dailyHighTemp = data.daily.temperature_2m_max;
  var dailyLowTemp = data.daily.temperature_2m_min;
  elements.rightEl.innerHTML = "";
  for (var i = 0; i < 3; i++) {
    var tempHigh = Math.trunc(dailyHighTemp[i]);
    var tempLow = Math.trunc(dailyLowTemp[i]);
    var dayName = new Date(daily[i]).toLocaleDateString("en-US", {
      weekday: "long"
    });
    var div = document.createElement("div");

    //Highlight Current day (Today)
    div.classList.add("day");
    if (i === 0) {
      div.classList.add("active");
      dayName = "Today";
    }
    div.innerHTML = "\n    <p>".concat(dayName, "</p>\n    <p>H:").concat(tempHigh, "\xB0</p>\n    <span>L:").concat(tempLow, "\xB0</span> \n    ");
    elements.rightEl.append(div);
    nextTwoDays.push({
      day: dayName,
      tempH: tempHigh,
      tempL: tempLow
    });
  }
  return nextTwoDays;
}

//Main render function handler responsible for updating the entire UI with weather data 
function renderWeather(data, elements) {
  var weatherTemp = data.current_weather.temperature;
  var weatherWind = data.current_weather.windspeed;
  var weatherCode = data.current_weather.weathercode;
  var userWeatherDate = data.current_weather.time;
  var isDay = data.current_weather.is_day;
  var sunRise = new Date(data.daily.sunrise[0]).getHours();
  var sunSet = new Date(data.daily.sunset[0]).getHours();
  var weatherType = (0, _utilities.getWeatherType)(weatherCode);
  var timeOfDay = (0, _utilities.getTimeOfDay)(userWeatherDate, sunRise, sunSet);
  var humidity = getHumidity(data);
  var icon = renderWeatherIcon(weatherCode, isDay);
  renderBackground(weatherType, timeOfDay, elements);
  renderFutureData(data, elements);
  renderNextTwoDays(data, elements);
  elements.tempEl.textContent = "".concat(Math.trunc(weatherTemp), "\xB0");
  elements.statusEl.textContent = _maps.WEATHER_MAP[weatherCode];
  elements.windEl.textContent = "Wind: ".concat(weatherWind, " km/h");
  elements.humidityEl.textContent = "Humidity: ".concat(humidity, "%");
  elements.iconImg.src = icon;
  // console.log(data);
}
},{"./maps.js":"assets/scripts/maps.js","./utilities.js":"assets/scripts/utilities.js"}],"assets/scripts/app.js":[function(require,module,exports) {
"use strict";

var _api = require("./api.js");
var _ui = require("./ui.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * Main application controller
 * Handles:
 * - User interactions (search, input)
 * - Initial app loading
 * - Loader animation
 * - Connecting API layer with UI rendering
 */
// DOM elements
var loadingScreen = document.querySelector(".loading-screen");
var backgroundEl = document.querySelector(".background");
var cityEl = document.querySelector(".city");
var tempEl = document.querySelector(".temp");
var statusEl = document.querySelector(".status");
var windEl = document.querySelector(".wind-speed");
var humidityEl = document.querySelector(".humidity");
var iconImg = document.querySelector(".main-icon");
var searchBtn = document.querySelector(".search-btn");
var searchInput = document.querySelector(".search-input");
var bottomEl = document.querySelector(".bottom");
var rightEl = document.querySelector(".right");
var loaderIcons = document.querySelectorAll(".loader-icon");

// Group UI elements for easier passing between modules
var elements = {
  backgroundEl: backgroundEl,
  tempEl: tempEl,
  statusEl: statusEl,
  windEl: windEl,
  humidityEl: humidityEl,
  iconImg: iconImg,
  bottomEl: bottomEl,
  rightEl: rightEl
};
var loaderInterval;

// Handles user search input and updates UI with fetched weather data
function searchCity() {
  return _searchCity.apply(this, arguments);
} // Starts animated loader by cycling through icons
function _searchCity() {
  _searchCity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var city, formattedCity, weatherData, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          startAnimationLoader();
          _context.p = 1;
          city = searchInput.value;
          if (city.trim()) {
            _context.n = 2;
            break;
          }
          throw new Error("Please enter a city");
        case 2:
          // Format city name for display (capitalize each word)
          formattedCity = city.toLowerCase().split(" ").map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }).join(" ");
          _context.n = 3;
          return (0, _api.getWeatherData)(city);
        case 3:
          weatherData = _context.v;
          if (weatherData) {
            _context.n = 4;
            break;
          }
          throw new Error("No weather data");
        case 4:
          cityEl.textContent = formattedCity;
          (0, _ui.renderWeather)(weatherData, elements);
          searchInput.value = "";
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error(_t);

          // Fallback UI state when search fails
          cityEl.textContent = "City not found";
          searchInput.value = "";
          searchInput.focus();
        case 6:
          _context.p = 6;
          stopAnimationLoader();
          return _context.f(6);
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[1, 5, 6, 7]]);
  }));
  return _searchCity.apply(this, arguments);
}
function startAnimationLoader() {
  loadingScreen.classList.remove("hidden");
  if (!loaderIcons.length) return;
  var index = 0;

  // Clear any existing interval (prevents duplicates)
  if (loaderInterval) clearInterval(loaderInterval);

  // reset icons
  loaderIcons.forEach(function (icon) {
    return icon.classList.remove("active");
  });
  loaderIcons[index].classList.add("active");
  loaderInterval = setInterval(function () {
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
  setTimeout(function () {
    loadingScreen.classList.add("hidden");
  }, 200);
}

// Initializes app with user's location or fallback city
function initApp() {
  return _initApp.apply(this, arguments);
}
function _initApp() {
  _initApp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _yield$getUserPositio, lat, lng, weather, _weather, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return (0, _api.getUserPosition)();
        case 1:
          _yield$getUserPositio = _context2.v;
          lat = _yield$getUserPositio.lat;
          lng = _yield$getUserPositio.lng;
          _context2.n = 2;
          return (0, _api.getWeatherByCoords)(lat, lng);
        case 2:
          weather = _context2.v;
          (0, _ui.renderWeather)(weather, elements);
          cityEl.textContent = "Your Location";
          _context2.n = 5;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          _context2.n = 4;
          return (0, _api.getWeatherData)("London");
        case 4:
          _weather = _context2.v;
          (0, _ui.renderWeather)(_weather, elements);
          cityEl.textContent = "London";
          console.error("Geolocation failed:", _t2);
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return _initApp.apply(this, arguments);
}
function init() {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          // Fallback if geolocation fails
          startAnimationLoader();
          //init App
          _context3.n = 1;
          return initApp();
        case 1:
          // stopAnimationLoader();
          // Safety fallback to stop loader after delay
          // Giving extra time on the first loading screen to see animation clearly
          // For regural execution of loading screen ---> stopAnimationLoader();
          setTimeout(function () {
            stopAnimationLoader();
          }, 3000);
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _init.apply(this, arguments);
}
init();

// Event listeners (Using enter key besides click to Search)
searchBtn.addEventListener("click", searchCity);
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchCity();
});
},{"./api.js":"assets/scripts/api.js","./ui.js":"assets/scripts/ui.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60672" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/scripts/app.js"], null)
//# sourceMappingURL=/app.0eb78c48.js.map