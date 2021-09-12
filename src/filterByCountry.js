import template from '../templates/option.hbs';
export default {
  API_KEY: '???',
  language: 'en-US',
async getCountries() {
    const response = await fetch("https://app.ticketmaster.com/discovery/v2/json?country&apikey={apikey}");
     if (response.ok) {
      return await response.json();
    }


    let filters = document.querySelector('.filters');
    let select = document.querySelector('.select-js');

    async function getCountries() {
        const countries = await fetchApi.getCountries();
        return countries;
    }

    export async function generateOptions(language = 'en-US') {
  let emptyObj = new Object();
  if (language === 'en-US') {
    emptyObj = {
      name: 'Choose country',
      id: undefined,
    };
  } else {
    emptyObj = {
      name: 'Choose something...',
      id: undefined,
    };
    }
    const dataForGenerationOfOptions = await getCountries();
    const array = dataForGenerationOfOptions.countries.map(el => el);
    array.unshift(emptyObj);
   const markup = array.map(el => template({ el }));
   refs.select.innerHTML = '';
        refs.select.insertAdjacentHTML('beforeend', markup);
        
}

filters.addEventListener('change', onFilterChooseAndRenderPages);
async function onFilterChooseAndRenderPages(e) {

  if (e.target.value === 'Choose country')  {
    return;
  }

    }
    let main = document.querySelector('.main.js');
    main.dataset.page = 'filtering';
    // renderByCountriFilter(e.target.value, 1);

    export function onHomeClickHandler() {
  refs.divFilter.classList.remove('visually-hidden');
  status = 'home';
}
export function onMyLibraryClickHandler() {
    status = 'library';
    filters.classList.add('visually-hidden');
}

export {getCountries}