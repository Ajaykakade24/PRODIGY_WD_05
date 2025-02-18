const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// OpenWeatherMap API key
const apiKey = 'e5e0cd792c26ba0afda0157d9c469f5d'; // Replace this with your actual API key

// Function to fetch weather data by city name
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod === 404) {
            alert('City not found!');
            return;
        }

        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Function to fetch weather data based on the user's geolocation
async function fetchWeatherByLocation(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Function to display the weather data
function displayWeatherData(data) {
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.style.display = 'block'; // Show weather information
}

// Function to handle button click
getWeatherBtn.addEventListener('click', () => {
    const city = locationInput.value.trim();
    
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name!');
    }
});

// Get user's location if no city input is given
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByLocation(lat, lon);
        }, function(error) {
            alert("Unable to retrieve your location. Please enter a city.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};
