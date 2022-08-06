"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/*
const getCountryData = function(country) {
    const request = new XMLHttpRequest();
    request.open(`GET`, `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener(`load`, function() {
        const [data] = JSON.parse(this.responseText);

        const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
}

getCountryData(`portugal`);
*/

const renderCountry = function(data, className = ``) {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} million</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
            </article>
        `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
}

const renderError = function(message) {
    countriesContainer.insertAdjacentText('beforeend',
    message);
}

/*
const getCountryAndNeighbour = function(country) {
    const request = new XMLHttpRequest();
    request.open(`GET`, `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener(`load`, function () {
      const [data] = JSON.parse(this.responseText);
      
      renderCountry(data);

    //Get neighbour country
    const [neighbour] = data.border?.[0];

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
      request2.open(`GET`, `https://restcountries.com/v2/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener(`load`, function() {
        const data2 = JSON.parse(this.responseText);

        renderCountry(data2, `neighbour`);
      })
    });
}

getCountryAndNeighbour(`portugal`);

const getCountryData = (country) => {
    fetch(`https://restcountries.com/rest/v2/name/${country}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error(`Country not found ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

    if(!neighbour) return;

    return fetch(`https://restcountries.com/rest/v2/name/${neighbour}`);
    })
    .then((response) => 
    if(!response.ok) {
            throw new Error(`Country not found ${response.status}`);
        }
        return response.json())
    .then((data) => {
        renderCountry(data,`neighbour`)
    })
    .catch((err) => {
        alert(err);
        renderError(`Something went wrong ${err.message}.Try again!`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
};
*/

const request = fetch(`https://restcountries.com/v2/name/portugal`);

const getJSON = async function(url, errorMessage = `Something went wrong`) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${errorMessage} ${response.status}`);
    }
    return await response.json();
};

const getCountryData = (country) => {
    getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

    if(!neighbour) throw new Error(`No neighbour found!`);

    return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, `Country not found`);
    })
    .then((data) => {
        renderCountry(data,`neighbour`)
    })
    .catch((err) => {
        alert(err);
        renderError(`Something went wrong ${err.message}.Try again!`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener(`click`,function() {
    getCountryData(`spain`);
})
