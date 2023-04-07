import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";

const elem = document.querySelector('link');
console.log(elem);
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    const inpName = event.target.value.trim();
    if (inpName === '') { return };
    fetchCountries(inpName);
}




