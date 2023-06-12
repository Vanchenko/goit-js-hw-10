export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies,population,languages,flags`)
        .then(response => {
            console.log(response.ok, response.status);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
};