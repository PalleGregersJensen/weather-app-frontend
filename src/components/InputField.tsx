import React, { useState, useEffect } from "react";
import { getWeatherData } from "../rest-service/weatherData";

export default function InputField() {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        console.log(event.target.value);
        setCityName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        getWeatherData(cityName)
            .then((data) => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (cityName !== "") {
            handleSubmit();
        }
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Input field</h2>
                <label htmlFor="cityName">Enter name of city:</label>
                <input type="text" id="cityName" value={cityName} onChange={handleChange} />
                <button type="submit">Hent vejrdata</button>
            </form>
            {loading && <p>Loading...</p>}
            {weatherData && (
                <div>
                    <h2>Vejrdata for {cityName}:</h2>
                    {Object.entries(weatherData).map(([key, value]) => (
                        <p key={key}>
                            <strong>{key}:</strong> {value}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
