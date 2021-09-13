import template from '../src/templates/option.hbs';
export default {
  API_KEY: 'PLEluArGwTZQl36ty5ijCNPhmvtWXv1M',
  language: 'en-US',
  async getCountries() {
    const response = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?country&apikey={apikey}");
    if (response.ok) {
      return await response.json();
    }
  },
  async sortByCountry(country, page = 1) {
    const response = await fetch('');
    if (response.ok) {
      return await response.json();
    }
  }
  
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
   select.innerHTML = '';
  select.insertAdjacentHTML('beforeend', markup);
        
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
async function renderByCountriFilter(country, page) {
     try {
    if (page === 1) {
      refs.galleryList.innerHTML = '';
    }
  }

   export function onHomeClickHandler() {
  filters.classList.remove('visually-hidden');
  status = 'home';
}
 export function onMyLibraryClickHandler() {
    status = 'library';
    filters.classList.add('visually-hidden');
}

export { getCountries };