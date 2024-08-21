let reportJokes = [];
let currentJoke = "";
let weather = "";
let newJoke = "";
let useFirstApi = true;

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
  printT.textContent = `${temperature}ºC / ${description}`;
}

captureWeather();
