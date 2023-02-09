import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const box = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSerchCountry, DEBOUNCE_DELAY));

function onSerchCountry(e) {
  e.preventDefault();
  const name = e.target.value.trim();
  if (name === '') {
    list.innerHTML = '';
    box.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(onCreateEl)
    .catch(error => Notiflix.Notify.failure(`${error}`));
}

function onCreateEl(data) {
  if (data.length > 10) {
    onSearchError();
  } else if (data.length >= 2 && data.length <= 10) {
    onCreateListEl(data);
  } else if (data.length === 1) {
    onCreateBoxEl(data);
  }
}
function onSearchError() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
  return;
}

function onCreateListEl(data) {
  const murcup = data
    .map(
      ({ name, flags }) =>
        `<li class="county-list__item">
              <img src="${flags.svg}" alt="${flags.alt}" width="25" class="county-list__image" />
              <p class="county-list__text">${name.official}</p>
            </li>`
    )
    .join('');
  box.innerHTML = '';
  list.innerHTML = murcup;
}

function onCreateBoxEl(data) {
  const marcup = data
    .map(
      ({ name, flags, population, languages, capital }) => `
      <div class="country-info__box">
        <img src="${flags.svg}" alt="${
        flags.alt
      }"  width="80" class="country-info__image"/>
        <h2 class="country-info__title">${name.official}</h2>
        <p class="country-info__text">Capital: ${capital}</p>
        <p class="country-info__text">Population: ${population}</p>
        <p class="country-info__text">Leanguages: ${Object.values(
          languages
        ).join(', ')}</p>
      </div>`
    )
    .join('');
  list.innerHTML = '';
  box.innerHTML = marcup;
}
