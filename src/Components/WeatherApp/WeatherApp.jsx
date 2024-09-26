import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const api_key = process.env.REACT_APP__KEY;

  const [wicon, setWicon] = useState(cloud_icon);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For empty input feedback

  const search = async () => {
    try {
      setLoading(true);
      const element = document.getElementsByClassName("cityInput");

      if (element[0].value === "") {
        setError("Please enter a city name.");
        setLoading(false);
        return;
      }

      setError(""); // Clear any previous errors
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);
      if (!response.ok) {
        alert("Data not available for this location");
        setLoading(false);
        return;
      }

      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = data.wind.speed + " km/hr";
      temprature[0].innerHTML = data.main.temp + " °C";
      location[0].innerHTML = data.name;

      // Update weather icon based on weather condition
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }

      element[0].value = ""; // Clear input field after successful search
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Add functionality for pressing Enter key to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <div className="div">
          <input
            type="text"
            className="cityInput"
            placeholder="Search"
            onKeyPress={handleKeyPress} // Listen for Enter key press
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Show error message */}
      </div>

      {loading ? ( // Show loading state
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">
            24<sup>o</sup>C
          </div>
          <div className="weather-location">London</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="text">Humidity</div>
                <div className="humidity-percent">64%</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="text">Wind_Speed</div>
                <div className="wind-rate">18 km/hr</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
