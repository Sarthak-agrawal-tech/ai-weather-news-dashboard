const API_KEY = "948d6acc64321df3fdc718b17b742546";
const weatherSection = document.querySelector(".weather-section");

async function getWeather(city){
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`);
  const data = await response.json();
  displayWeather(data);
};
function displayWeather(data){
  if(data.cod !== 200){
    weatherSection.innerHTML = `<h1>City not found</h1>`;
    return;
  }
  weatherSection.innerHTML = `
    <div class="weather-icon">
      <i class="fa-solid fa-cloud-sun"></i>
      </div>
      <div class="weather-temp">
        <p>${data.main.temp}&deg;C</p>
      </div>
      <div class="city-details">
        <p>${data.name}, ${data.sys.country}</p>
      </div>
      <div class="weather-details">
        <p><i class="fa-solid fa-wind"></i> ${data.wind.speed} wind speed</p>
        <p><i class="fa-solid fa-wind"></i> ${data.main.humidity} humidity</p>
      </div>
  `
}

const search = document.querySelector('.search-btn')
search.addEventListener('click', ()=>{
  const city = document.querySelector(".search-bar").value;
  getWeather(city);
})