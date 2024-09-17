let reportJokes = [];
let currentJoke = "";
let weather = "";
let newJoke = "";
let useFirstApi = true;
let currentIndex = 0;
let currentIndex2 = 0;

function captureJoke() {
  const url = useFirstApi
    ? "https://icanhazdadjoke.com/"
    : "https://api.chucknorris.io/jokes/random";

  const options = useFirstApi
    ? {
        headers: {
          Accept: "application/json",
        },
      }
    : {};

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (useFirstApi) {
        currentJoke = data.joke;
      } else {
        currentJoke = data.value;
      }
      printJoke(currentJoke);
      useFirstApi = !useFirstApi;
    })
    .catch((error) => printJoke("Error:" + error));
}

function printJoke(joke) {
  const print = document.getElementById("joke");
  print.textContent = joke;
}

captureJoke();

function keepReports(score) {
  if (!currentJoke) return;
  const existingReport = reportJokes.find((e) => e.joke === currentJoke);
  if (existingReport) {
    existingReport.score = score;
    existingReport.date = new Date().toISOString();
  } else {
    reportJokes.push({
      joke: currentJoke,
      score: score,
      date: new Date().toISOString(),
    });
  }
  console.log(reportJokes);
}

function captureWeather() {
  fetch("https://wttr.in/Barcelona?format=j1")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      weather = data.current_condition[0];
      printWeather(weather);
    })
    .catch((error) => printWeather("Error:" + error));
}

function printWeather(weather) {
  const temperature = weather.temp_C;
  const description = weather.weatherDesc[0].value;
  const printT = document.getElementById("weather");
  printT.textContent = `${temperature}ºC  /`;

  const weatherIcons = {
    "Partly cloudy": "images/clouds.png",
    "Cloudy": "images/clouds.png",
    "Overcast": "images/clouds.png",
    "Rain": "images/rain.png",
    "Showers": "images/rain.png",
    "Sunny": "images/sun.png",
    "Clear": "images/sun.png",
    "Snow": "images/snow.png",
    "Blizzard": "images/snow.png",
    "Sleet": "images/snow.png",
    "Thunderstorm": "images/storm.png",
    "Heavy rain": "images/storm.png",
    "Fog": "images/fog.png",
    "Mist": "images/fog.png",
    "Wind": "images/coldwind.png",
    "Windy": "images/coldwind.png",
  };

  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = weatherIcons[description];
}

captureWeather();

const backgrounds = [
  "images/blob_3.png",
  "images/blob_33.png",
  "images/blob_44.png",
];

const littleBackgrounds = [
  "images/blob_11.png",
  "images/blob_22.png",
  "images/blob_2.png",
  "images/blob_1.png",
];

function changeBackground() {
  currentIndex = (currentIndex + 1) % backgrounds.length;
  currentIndex2 = (currentIndex2 + 1) % littleBackgrounds.length;
  document.body.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
  document.querySelectorAll(".bottom-image, .top-image").forEach((div) => {
    div.style.backgroundImage = `url(${littleBackgrounds[currentIndex2]})`;
  });
}
