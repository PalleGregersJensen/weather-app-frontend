import React, { useState, useEffect } from "react";
import { getWeatherData } from "../rest-service/weatherData";

//@ts-expect-error - event mangler i InputField
export default function InputField({ onWeatherDataUpdate }) {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    //@ts-expect-error - event mangler i useEffect
    const handleChange = (event) => {
        console.log(event.target.value);
        setCityName(event.target.value);
    };
    //@ts-expect-error - event mangler i useEffect
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        getWeatherData(cityName)
            .then((data) => {
                setWeatherData(data);
                console.log("Weather data fetched:", typeof data);
                onWeatherDataUpdate(data); // Kalder funktionen med de opdaterede vejrdata
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
                        <div key={key}>
                            {key === "position" ? (
                                <div>
                                    <p>
                                        <strong>Position:</strong>
                                    </p>
                                    <p>
                                        <strong>Lat:</strong> {(value as { lat: number; lng: number }).lat}, <strong>Lng:</strong> {(value as { lat: number; lng: number }).lng}
                                    </p>
                                </div>
                            ) : (
                                <p>
                                    <strong>{key}:</strong> {value}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}