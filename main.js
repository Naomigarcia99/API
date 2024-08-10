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
    .then((data) => printJoke(data.joke))
    .catch((error) => printJoke("Error:" + error));
}

function printJoke(joke) {
  const print = document.getElementById("joke");
  print.textContent = joke;
}

captureJoke();
