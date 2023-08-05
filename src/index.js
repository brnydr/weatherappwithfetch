import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service';

// Business Logic

async function getAPIData(city) {
  try {
    const weatherResponse = await WeatherService.getWeather(city);
    if (weatherResponse instanceof Error) {
      const errorMessage = `there was a problem accessing the weather data from OpenWeather API for ${city}: 
      ${weatherResponse.message}`;
      throw new Error(errorMessage);
    }

    const description = weatherResponse.weather[0].description;
    printWeather(description, city);

    const giphyResponse = await GiphyService.getGif(description);
    if (giphyResponse instanceof Error) {
      const errorMessage = `there was a problem accessing the gif data from Giphy API: 
      ${giphyResponse.message}.`;
      throw new Error(errorMessage);
    }
    
    displayGif(giphyResponse, city);

  } catch(error) {
    printError(error);
  }
}


// UI Logic

function printWeather(description, city) {
  document.querySelector('#weather-description').innerText = `The weather in ${city} is ${description}.`;
}

function printError(error) {
  document.querySelector("#error").innerText = error;
}

function displayGif(response,city) {
  const url = response.data[0].images.downsized.url;
  const img = document.createElement("img");
  img.src = url;
  img.alt = `${city} weather`;
  document.querySelector("#gif").append(img);
}

function clearResults() {
  document.querySelector("#gif").innerText = null;
  document.querySelector("#error").innerText = null;
  document.querySelector("#weather-description").innerText = null;
}

function handleFormSubmission(event) {
  event.preventDefault();
  clearResults();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getAPIData(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});



// fetch(url)
// .then(response => response.json())
// .then(data => printElements(data))
// .catch(err => console.log(err))