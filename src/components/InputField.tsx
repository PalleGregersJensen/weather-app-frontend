import { useState, useEffect } from "react";
import { getWeatherData } from "../rest-service/weatherData";

interface WeatherData {
    location: string;
    temperature: string;
    descriptionOfWeather: string;
    weatherConditions: string;
    position: {
        lat: number;
        lng: number;
    };
}

export default function InputField({ onWeatherDataUpdate }) {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setCityName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        getWeatherData(cityName)
            .then((data: WeatherData) => {
                setWeatherData(data);
                console.log("Weather data fetched:", typeof data);
                onWeatherDataUpdate(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (cityName !== "") {
            handleSubmit(event);
        }
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Find weather data for cities around the world</h2>
                <label htmlFor="cityName">Enter name of city:</label>
                <input type="text" id="cityName" value={cityName} onChange={handleChange} />
                <button type="submit">Get weather data</button>
            </form>
            {loading && <p>Loading...</p>}
            {weatherData && (
                <div>
                    <h2>Weather data for {cityName}:</h2>
                    <div key={weatherData.location}>
                        <p>
                            <strong>Location:</strong> {weatherData.location}
                        </p>
                        <p>
                            <strong>Temperature:</strong> {weatherData.temperature}
                        </p>
                        <p>
                            <strong>Description of weather:</strong> {weatherData.descriptionOfWeather}
                        </p>
                        <p>
                            <strong>Weather conditions:</strong> {weatherData.weatherConditions}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
