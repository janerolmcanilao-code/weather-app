import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "a39fc0ed54fdf5ab3bd1d0a22977b6de"; // ✅ your key

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Weather App 🌤️</h1>

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={getWeather}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Get Weather
        </button>

        {/* Weather Info */}
        {weather && (
          <div className="mt-6 p-4 bg-blue-100 rounded-xl">
            <h2 className="text-xl font-semibold">{weather.name}</h2>
            <p className="text-3xl font-bold">{weather.main.temp}°C</p>

            {/* Weather Icon */}
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />

            <p className="capitalize text-lg">{weather.weather[0].description}</p>
            <p className="text-sm text-gray-600">Humidity: {weather.main.humidity}%</p>
            <p className="text-sm text-gray-600">Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
