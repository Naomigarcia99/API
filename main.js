let reportJokes = [];
let currentJoke = "";
let weather = "";

function captureJoke() {
  fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      currentJoke = data.joke;
      printJoke(data.joke);
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
