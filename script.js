const apiKey = '';
const cityName = document.getElementById('city-name');
const weatherState = document.getElementById('weather-state');
const temperatrue = document.getElementById('temperature');
const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('button');
const forecastContainer = document.getElementById('forecast-container')
const currentLocation = 'Los Angeles'




//create forecast elements to be injected by the live server.

const addListener = (element,listenEvent) => {
    element.addEventListener(listenEvent, (event) => {
        event.preventDefault();
    });
    
}
async function getWeather() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${currentLocation}&aqi=no
    `);
    const data = await response.json();
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

const getSearch = async () => {
    // e.preventDefault();
    const searchData = searchInput.value;
    return searchData

    
}


async function getForecast() {
    const searchData = await getSearch();
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchData}&days=5`)
    const data= await response.json()
    return data
}


const appendForecastDate = async (dayNumber) => {
    const forecastDay = document.createElement('div');
    const data = await getForecast();
    forecastContainer.appendChild(forecastDay)
    forecastDay.id = 'forecastDay' + dayNumber;
    const dateDiv = document.createElement('div')
    forecastDay.appendChild(dateDiv)
    dateDiv.id = 'date' + dayNumber;
    const date = data.forecast.forecastday[dayNumber].date;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    })
    dateDiv.textContent = formattedDate
}

const appendTemeperature = async (dayNumber) => {
    const data = await getForecast();
    const temperatureDiv = document.createElement('div');
    const dateDiv = document.getElementById(`date` + dayNumber)
    dateDiv.appendChild(temperatureDiv);
    temperatureDiv.textContent = `${data.forecast.forecastday[dayNumber].day.avgtemp_f} F`





    

}

const updateForecast5Day = async () => {
    appendForecastDate(0);
    appendTemeperature(0);
    appendForecastDate(1);
    appendTemeperature(1);
    appendForecastDate(2);
    appendTemeperature(2);
    appendForecastDate(3);
    appendTemeperature(3);
    appendForecastDate(4);
    appendTemeperature(4);

}

submitBtn.addEventListener('click', async (e) => {
    const searchData = await getSearch()
    const forecast = await getForecast();
    const updateForecast = updateForecast5Day();
});
updateCity();
updateState();
updateTemperature();
