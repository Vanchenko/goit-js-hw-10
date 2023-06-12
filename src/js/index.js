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
    const cl = data.filter(elem => (elem.name.official.toLowerCase()).slice(0, inpName.length).includes(inpName.toLowerCase()));
    console.log(data);
    console.log(cl);
    const quant = cl.length;
    if (quant > 101) {
        Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
    } else if (quant > 1 && quant <= 101) {
        const markUp = cl.map((elem) => `<li class="country-list">
            <img src="${elem.flags.svg}" alt="${elem.flags.alt}" width="25"/>
            ${elem.name.official}</li>`).join("");
        listEl.innerHTML = markUp;
    } else if (quant === 1) {
        divEl.innerHTML = `<div class="country-info" >
            <p style="font-size: 34px; font-weight: 500;"><img src="${cl[0].flags.svg}" alt="${cl[0].flags.alt}" width="50"/> ${cl[0].name.official}</p>
            <p style="font-weight: 700;">Capital: <span style="font-weight: 400;">${cl[0].capital}</span></p>
            <p style="font-weight: 700;">Population: <span style="font-weight: 400;">${cl[0].population}</span></p>
            <p style="font-weight: 700;">Languages: <span style="font-weight: 400;">${Object.values(cl[0].languages)}</span></p>
            </div>`;
    } else if (quant === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
    };
}
function searchCountryError(error) {
    console.dir(error);
    //if (error)
    Notiflix.Notify.failure('Oops, there is no country with that name.');
    listEl.innerHTML = "";
    divEl.innerHTML = "";

}


