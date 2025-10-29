const API_KEY = "948d6acc64321df3fdc718b17b742546";
const weatherSection = document.querySelector(".weather-section");
const newsApikey = "pub_e89400b4b8974565a56f495469b51b5e";
// Match the container actually present in index.html
const newsSection = document.querySelector(".news-section");

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


async function getNews(interest) {
  if (!interest) {
    if (newsSection)
      newsSection.innerHTML = `<p>Please enter a search term.</p>`;
    return;
  }
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${newsApikey}&q=${interest}&language=en`
    );
    const data = await response.json();
    displayNews(data, interest);
  } catch (err) {
    console.error("Failed to fetch news", err);
    if (newsSection)
      newsSection.innerHTML = `<p>Error fetching news: ${err.message}</p>`;
  }
}

function displayNews(data, interest) {
  if (!newsSection) return;

  // Some APIs use `results` (plural); older code used `result` (singular).
  const results = data.results || data.result || [];

  if (!results || results.length === 0) {
    newsSection.innerHTML = `
      <h2>Latest News on ${interest}</h2>
      <p>No articles found.</p>
    `;
    return;
  }

  // Build up to 5 news cards safely
  const cardsHtml = results
    .slice(0, 5)
    .map((item) => {
      const title = item.title || "No title";
      const description = item.description || "";
      const link = item.link
        ? `<a href="${item.link}" target="_blank" rel="noopener">Read more</a>`
        : "";
      const image = item.image_url
        ? `<img src="${item.image_url}" alt="">`
        : "";
      return `
      <div class="news-card">
        <h3>${title}</h3>
        <p>${description}</p>
        ${image}
        ${link ? `<p class="read-more">${link}</p>` : ""}
      </div>
    `;
    })
    .join("");

  newsSection.innerHTML = `
    <h2>Latest News on ${interest.toUpperCase()}</h2>
    ${cardsHtml}
  `;
}

document.querySelector('.news-search-btn').addEventListener('click',()=>{
  const interest = document.querySelector(".news-search-bar").value;
  getNews(interest);
})
const search = document.querySelector('.search-btn')
search.addEventListener('click', ()=>{
  const city = document.querySelector(".search-bar").value;
  getWeather(city);
})