const countriesContainer = document.querySelector(".countries-container");
const filterDropDown = document.querySelector(".filter-drop-down");
const searchInput = document.querySelector(".search-bar input");
const darkMode = document.querySelector(".right-nav p");
const body = document.querySelector("body");
let allCountriesData;

fetch(`https://restcountries.com/v3.1/all
`)
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterDropDown.addEventListener("change", (e) =>
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}
        `)
    .then((res) => res.json())
    .then(renderCountries)
);

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `./country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
                <div class="img-container">
                    <img src= "${country.flags.svg}" alt="flag">
                </div>
                <div class="country-info-container">
                    <h2 class="country-name">${country.name.common}</h2>
                    <p class="population"><span>Population:</span> ${country.population.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p class="region"><span>Region:</span> ${country.region}</p>
                    <p class="capital"><span>Capital:</span> ${
                      country.capital
                    }</p>
                </div>`;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  let filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );

  renderCountries(filteredCountries);
});

let currentTheme = localStorage.getItem("theme") || "light";
body.classList.add(currentTheme);

let isDark = JSON.parse(localStorage.getItem("isDark")) || false;

darkMode.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("isDark", isDark);
  body.classList.toggle("dark");
  if (isDark) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
