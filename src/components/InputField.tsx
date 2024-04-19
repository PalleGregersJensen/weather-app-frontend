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
//@ts-expect-error type error
export default function InputField({ onWeatherDataUpdate }) {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const data = await getWeatherData(cityName);
            //@ts-expect-error type error
            setWeatherData(data);
            onWeatherDataUpdate(data);
            // setError(null); // Reset error state
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // setError("An error occurred while fetching weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cityName !== "") {
            //@ts-expect-error type error
            handleSubmit(event); // Trigger form submission when cityName changes
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
            {/* {error && <p>{error}</p>} */}
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
