require('dotenv').config()

const apiKey = process.env.API_KEY;
const cityName = document.getElementById('city-name');
const weatherState = document.getElementById('weather-state');
const temperatrue = document.getElementById('temperature');
const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('button');
const forecastContainer = document.getElementById('forecast-container')
const currentLocation = navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    return(latitude, longitude);
});




const addListener = (element,listenEvent) => {
    element.addEventListener(listenEvent, (event) => {
        event.preventDefault();
    });
    
}

async function getWeather() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${currentLocation}&aqi=no
    `);
    const data = await response.json();
    console.log(data)
    return data;
}

const updateCity = async () => {
    const data = await getWeather();
    const city = data.location.name;
    cityName.textContent = city;
}

const updateState = async () => {
    const data = await getWeather();
    const state = data.location.region;
    weatherState.textContent = state; 
}

const updateTemperature = async () => {
    const data = await getWeather();
    const temp = data.current.temp_f;
    temperatrue.textContent = temp;

}

const getSearch = async (event) => {
    event.preventDefault();
    const searchData = searchInput.value;

    await getForecast(searchData);
    return searchData
}


async function getForecast(searchData) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchData}`)
    const data = await response.json()
    console.log(data)
}

submitBtn.addEventListener('click', getSearch);
updateCity();
updateState();
updateTemperature();


