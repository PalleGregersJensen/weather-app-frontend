async function getWeatherData(cityName) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/joke?about=${cityName}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("An error occurred while fetching weather data:", error);
    }
}

export { getWeatherData };
