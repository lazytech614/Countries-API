const countryName = new URLSearchParams(window.location.search).get("name");

const img = document.querySelector(".img-container img");
const countryNameH1 = document.querySelector(".country-name");
const capital = document.querySelector(".capital");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const backBtn = document.querySelector(".back-btn");
const body = document.querySelector("body");
const darkMode = document.querySelector(".right-nav p");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    img.src = `${country.flags.svg}`;
    img.alt = `${country.name.common}`;
    countryNameH1.innerText = `${country.name.common}`;

    if (country.capital) {
      capital.innerText = `${country.capital.join(", ")}`;
    } else {
      capital.innerText = "no capital";
    }

    if (country.name.nativeName) {
      nativeName.innerText = `${
        Object.values(country.name.nativeName)[0].common
      }`;
    } else {
      nativeName.innerText = `${country.name.common}`;
    }

    population.innerText = `${country.population.toLocaleString("en-IN")}`;
    region.innerText = `${country.region}`;
    subRegion.innerText = `${country.subregion}`;

    if (country.tld) {
      topLevelDomain.innerText = `${country.tld.join(", ")}`;
    } else {
      topLevelDomain.innerText = "";
    }

    if (country.currencies) {
      currencies.innerText = `${Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ")}`;
    } else {
      currencies.innerText = "";
    }

    if (country.languages) {
      languages.innerText = `${Object.values(country.languages).join(", ")}`;
    } else {
      languages.innerText = "";
    }

    if (country.borders) {
      Object.values(country.borders).forEach((borderCountry) =>
        fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
          .then((res) => res.json())
          .then(([borderCountryData]) => {
            // console.log(borderCountryData.name.common);
            const borderCountryContainer = document.createElement("div");
            borderCountryContainer.classList.add("border-country-container");
            const borderCountryAnchor = document.createElement("a");
            borderCountryAnchor.innerText = `${borderCountryData.name.common}`;
            borderCountryAnchor.href = `./country.html?name=${borderCountryData.name.common}`;
            borderCountryContainer.append(borderCountryAnchor);
            borderCountries.append(borderCountryContainer);
          })
      );
    } else {
      borderCountries.style = "display: none";
    }
  });

backBtn.addEventListener("click", () => history.back());

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
