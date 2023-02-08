import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const box = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSerchCountry, DEBOUNCE_DELAY));

function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  fetch(url)
    .then(response => response.json())
    .then(data => onCreateEl(data));
}

function onSerchCountry(e) {
  e.preventDefault();
  const name = e.target.value;
  if (name === '') {
    return;
  }

  fetchCountries(name.trim());
}

function onCreateEl(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if ((data.length >= 2) & (data.length <= 10)) {
    const murcup = data
      .map(
        ({ name, flags }) =>
          `<li class="list-item">
              <img src="${flags.svg}" alt="#" width="25" />
              <p class="list-text">${name}</p>
            </li>`
      )
      .join('');
    list.innerHTML = murcup;
    return;
  }
  console.log(data);
}
