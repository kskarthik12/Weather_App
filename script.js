// JavaScript logic for the weather page

// Function to fetch weather data and update page elements
function search() {
    let api_key = '4d58e9e1c12e812bab9d961f09a9052e';

    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
        return Promise.reject(new Error('City name is required'));
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(data => {
            const humidity = document.getElementsByClassName("humidity_percent");
            const wind = document.getElementsByClassName("wind_rate");
            const temperature = document.getElementsByClassName("weather_temp");
            const location = document.getElementsByClassName("weather_location");

            humidity[0].innerHTML = data.main.humidity;
            wind[0].innerHTML = data.wind.speed;
            temperature[0].innerHTML = data.main.temp;
            location[0].innerHTML = data.name;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display an error message to the user, e.g., alert('City not found or API error');
            return Promise.reject(error);
        });
}

// Example usage:
search()
    .then(() => console.log('Weather data fetched successfully'))
    .catch(error => console.error('Error:', error));
