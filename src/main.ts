interface JokeReport {
  joke: string;
  score: number;
  date: string;
}
let reportJokes: JokeReport[] = [];
let currentJoke: string = "";
let weather: string = "";
let newJoke: string = "";
let useFirstApi: boolean = true;
let currentIndex: number = 0;
let currentIndex2: number = 0;

function captureJoke(): void {
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
    .then((res: Response) => {
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
    .catch((error: Error) => printJoke("Error:" + error));
}

function printJoke(joke: string): void {
  const print = document.getElementById("joke") as HTMLElement;
  print.textContent = joke;
}

captureJoke();

function keepReports(score: number): void {
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

interface WeatherCondition {
  temp_C: number;
  weatherDesc: { value: string }[];
}

interface WeatherRes {
  current_condition: WeatherCondition[];
}

const weatherIcons: { [key: string]: string }  = {
  "Partly cloudy": "images/clouds.png",
  "Cloudy": "images/clouds.png",
  "Overcast": "images/clouds.png",
  "Rain": "images/rain.png",
  "Showers": "images/rain.png",
  "Heavy rain shower": "images/rain.png",
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
}

function captureWeather(): void {
  fetch("https://wttr.in/Barcelona?format=j1")
    .then((res: Response) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data: WeatherRes) => {
      let weather = data.current_condition[0];
      printWeather(weather);
    })
    .catch((error: Error) => printWeather("Error:" + error));
}

function printWeather(weather: WeatherCondition | string): void {
  if (typeof weather === "string"){
    const printT = document.getElementById("weather") as HTMLElement;
    printT.textContent = weather;
    const weatherIcon = document.getElementById("weather-icon") as HTMLImageElement;
    weatherIcon.src = "images/error.png";
  } else {
    const temperature = weather.temp_C;
    const description = weather.weatherDesc[0].value;
    const printT = document.getElementById("weather") as HTMLElement;
    printT.textContent = `${temperature}ºC  / `;
  
    const weatherIcon = document.getElementById("weather-icon") as HTMLImageElement;
    weatherIcon.src = weatherIcons[description] || "images/error.png";
  }
}

captureWeather();

const backgrounds: string[] = [
  "images/blob_3.png",
  "images/blob_33.png",
  "images/blob_44.png",
];

const littleBackgrounds: string[] = [
  "images/blob_11.png",
  "images/blob_22.png",
  "images/blob_2.png",
  "images/blob_1.png",
];

function changeBackground(): void {
  currentIndex = (currentIndex + 1) % backgrounds.length;
  currentIndex2 = (currentIndex2 + 1) % littleBackgrounds.length;
  document.body.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
  document.querySelectorAll(".bottom-image, .top-image").forEach((div) => {
    (div as HTMLElement).style.backgroundImage = `url(${littleBackgrounds[currentIndex2]})`;
  });
}
