import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import Header from "./components/Header";
import GoogleMap from "./components/GoogleMap";
import { getWeatherData } from "./rest-service/weatherData";

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chatGptData, setChatGptData] = useState(null); // Tilføjet en ny tilstand for chatGptData

    const handleWeatherData = (data) => {
        setWeatherData(data);
        console.log("Weather data fetched:", data);
        setLoading(false);
    };

    // Funktion til at håndtere data fra ChatGPT
    //@ts-expect-error - data mangler i handleChatGptData
    const handleChatGptData = (data) => {
        try {
            const parsedData = JSON.parse(data.answer);
            setChatGptData(parsedData);
            console.log("ChatGPT data parsed:", parsedData);
        } catch (error) {
            console.error("Error parsing ChatGPT data:", error);
        }
    };

    //@ts-expect-error - cityName mangler i fetchWeatherData
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
            <div>
                <InputField
                    fetchWeatherData={fetchWeatherData}
                    loading={loading}
                    onWeatherDataUpdate={handleWeatherData}
                />
            </div>
            <div>
                {/* Send vejrobservationerne, chatGptData og andre data til GoogleMap */}
                <GoogleMap weatherData={weatherData} chatGptData={chatGptData} />
            </div>
        </>
    );
}
