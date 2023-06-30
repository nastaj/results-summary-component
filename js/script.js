"use strict";

const tabsContainer = document.querySelector(".tabs");
const scoreEl = document.querySelector(".score__primary");

// Receive data from data.json
const getData = async function () {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Generate markup for each entry in data
const generateMarkup = async function () {
  try {
    const data = await getData();
    data.forEach((entry) => {
      const category = entry.category.toLowerCase();
      const markup = `
              <div class="tab tab-${category}">
                <div class="tab__type">
                  <img
                    src="${entry.icon}"
                    alt="${entry.category}"
                  />
                  <p class="tab__type__title--${category}">${entry.category}</p>
                </div>
                <p><span class="tab__type__score--current">${entry.score}</span> / 100</p>
              </div>
      `;
      tabsContainer.insertAdjacentHTML("beforebegin", markup);
    });
  } catch (err) {
    console.error(err);
  }
};
generateMarkup();

// Calculate and render the final score
const setFinalScore = async function () {
  try {
    const data = await getData();
    const scoreFinal = Math.trunc(
      data.reduce((acc, cur) => acc + cur.score, 0) / data.length
    );

    scoreEl.textContent = scoreFinal;
  } catch (err) {
    console.error(err);
  }
};
setFinalScore();
