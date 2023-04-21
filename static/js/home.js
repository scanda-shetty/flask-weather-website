// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
const weatherApi = {
    key: "41927bb3c3cfb23a70b10b3a51a94a65",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`${weatherApi.baseUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApi.key}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                const temperature = data.main.temp;
                const city = data.name;
                const country = data.sys.country;
                document.getElementById('city').textContent = `${city}, ${country}`;
                document.getElementById('temp').innerHTML = `${Math.round(temperature)}&deg;C`;
                let date = document.getElementById('date');
                let todayDate = new Date();
                date.innerText = dateManage(todayDate);
                document.getElementById('weather').innerHTML = `${data.weather[0].main}`;
                let min = document.getElementById('max');
                min.innerHTML = `${Math.round(data.main.temp_min)}&deg;C`;
                let max = document.getElementById('min');
                max.innerHTML = `${Math.round(data.main.temp_max)}&deg;C`;
                let humidity = document.getElementById('humidity');
                humidity.innerHTML = `${(data.main.humidity)}%`;
                let wind = document.getElementById('wind');
                wind.innerText = `${(data.wind.speed)} m/s`;
            })
            .catch((error) => console.log(error));
    });
} else {
    console.log('Geolocation is not supported by your browser');
}

const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        searchInputBox.value = '';
    }
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

function showWeatherReport(weather) {
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    let min = document.getElementById('max');
    min.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C`;
    let max = document.getElementById('min');
    max.innerHTML = `${Math.round(weather.main.temp_max)}&deg;C`;
    let humidity = document.getElementById('humidity');
    humidity.innerHTML = `${(weather.main.humidity)}%`;
    let wind = document.getElementById('wind');
    wind.innerHTML = `${(weather.wind.speed)} m/s`;
}

function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}


