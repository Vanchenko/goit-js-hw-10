import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
Notiflix.Notify.init({
    width: '280px',
    position: 'center-top',
    distance: '100px',
    opacity: 1,
});
const listEl = document.querySelector('.country-list');
listEl.style.listStyle = "none";
const divEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
let inpName = "";

inputEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    inpName = event.target.value.trim();
    if (inpName === '') { return };
    fetchCountries(inpName)
        .then(renderCountries)
        .catch(searchCountryError);
}

function renderCountries(data) {
    divEl.innerHTML = "";
    listEl.innerHTML = "";
    const cl = data.filter(elem => (elem.name.common.toLowerCase()).slice(0, inpName.length).includes(inpName.toLowerCase()));
    const quant = cl.length;
    if (quant > 10) {
        Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
    } else if (quant > 1 && quant <= 10) {
        const markUp = cl.map((elem) => `<li class="country-list">
            <img src="${elem.flags.svg}" alt="${elem.flags.alt}" width="25"/>
            ${elem.name.common}</li>`).join("");
        listEl.innerHTML = markUp;
    } else if (quant === 1) {
        const markUp = cl.map((elem) => `<div class="country-info" >
            <p style="font-size: 34px; font-weight: 500;"><img src="${elem.flags.svg}" alt="${elem.flags.alt}" width="50"/>
            ${elem.name.common}</p>
            <p style="font-weight: 700;">Capital: <span style="font-weight: 400;">${elem.capital}</span></p>
            <p style="font-weight: 700;">Population: <span style="font-weight: 400;">${elem.population}</span></p>
            <p style="font-weight: 700;">Languages: <span style="font-weight: 400;">${Object.values(elem.languages)}</span></p>
            </div>`).join("");
        divEl.innerHTML = markUp;
    } else {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
    };
}
function searchCountryError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
}


