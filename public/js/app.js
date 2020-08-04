const weatherInfo = document.querySelector(".weather-info");
const weatherFetch = (location = "") => {
  weatherInfo.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (weatherInfo.textContent = data.error);
        }

        weatherInfo.textContent = `${data.forecast} ${data.location}`;
        search.value = "";
      });
    }
  );
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  weatherFetch(location);
});
