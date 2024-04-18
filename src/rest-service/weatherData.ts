async function getWeatherData(cityName: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/joke?about=${cityName}`);
        const data = await response.json();
        console.log("Data fetched:", data);

        const { answer } = data;
        const { location, temperature, weatherConditions, descriptionOfWeather, position } = JSON.parse(answer);
        const { lat, lng } = position;

        console.log("Location:", location);
        console.log("Temperature:", temperature);
        console.log("Description:", descriptionOfWeather);
        console.log("Weatherconditions:", weatherConditions);
        console.log("Position.lat:", lat);
        console.log("Position.lng:", lng);

        return { location, temperature, descriptionOfWeather, weatherConditions, position: { lat, lng } };
    } catch (error) {
        console.error("An error occurred while fetching weather data:", error);
    }
}

export { getWeatherData };
