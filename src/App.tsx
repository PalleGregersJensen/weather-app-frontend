import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import Header from "./components/Header";
import GoogleMap from "./components/GoogleMap";
import { getWeatherData } from "./rest-service/weatherData";
import Footer from "./components/Footer";

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleWeatherData = (data) => {
        setWeatherData(data);
        console.log("Weather data fetched:", data);
        setLoading(false);
    };

    const fetchWeatherData = (cityName) => {
        setLoading(true);
        console.log("Fetching weather data for", cityName);
        getWeatherData(cityName)
            .then(handleWeatherData)
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="header-weather-app">
                <Header />
            </div>
            <div className="inputfield">
                <InputField
                    fetchWeatherData={fetchWeatherData}
                    loading={loading}
                    onWeatherDataUpdate={handleWeatherData}
                />
            </div>
            <div className="google-map">
                <GoogleMap weatherData={weatherData} /> {/* Pass weatherData to GoogleMap component */}
            </div>
            <div className="footer">
                <Footer /> 
            </div>
        </>
    );
}
