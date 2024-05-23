const apiKey = "ec186e4c0b4c8b2af95c19350f04d14f";
const weatherDataEl = document.getElementById("weather-data");
const cityNameEl = document.getElementById("cityName");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityNameEl.value;
    console.log(cityValue);
    getWeatherData(cityValue);
})
async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new error("Network response was not ok!");
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const detail = [
            `FeelsLike:${Math.round(data.main.feels_like)}°C`,
            `Humadity:${data.main.humidity}%`,
            `WindSpeed:${Math.round(data.wind.speed)}m/s`
        ]
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="sun image">`;
        weatherDataEl.querySelector(".temp").innerText = `${temperature}°C`;
        weatherDataEl.querySelector(".description").innerText = `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = detail.map((detail) => `<div>${detail}</div>`).join(" ");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temp").innerText = "";
        weatherDataEl.querySelector(".description").innerText = "Please check your City Name";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}


