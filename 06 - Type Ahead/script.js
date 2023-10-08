// const endpoint =
//   "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

import cities from "./cities.json" assert { type: "json" };

const cityData = [];
cityData.push(...cities);

function findMatches(wordToMatch, cityData) {
  return cityData.filter((place) => {
    // Here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.name.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cityData);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population"></span>
        </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
