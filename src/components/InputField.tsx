import React, { useState } from "react";
import { getWeatherData } from "../rest-service/weatherData";

export default function InputField() {
    const [cityName, setCityName] = useState("");

    const handleChange = (event) => {
        setCityName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getWeatherData(cityName);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Input field</h2>
                <label htmlFor="cityName">Enter name of city:</label>
                <input type="text" id="cityName" value={cityName} onChange={handleChange} />
                <button type="submit">Hent vejrdata</button>
            </form>
        </div>
    );
}
