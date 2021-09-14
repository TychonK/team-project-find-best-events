import { refs } from './index.js';
// import EventsApiService from './js/api-service';
// import template from './templates/option.hbs';


let countriesArr = ['United States Of America', 'Andorra', 'Anguilla', 'Argentina', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Barbados', 'Belgium', 'Bermuda', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Estonia', 'Faroe Islands', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Great Britain', 'Greece', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Korea', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg', 'Malaysia', 'Malta', 'Mexico', 'Monaco', 'Montenegro', 'Morocco', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Northern Ireland', 'Norway', 'Peru', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'Saint Lucia', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Trinidad and Tobago', 'Turkey', 'Ukraine', 'United Arab Emirates', 'Uruguay', 'Venezuela']

   

let sel = document.getElementById('input-country');
let fragment = document.createDocumentFragment();
countriesArr.forEach(function(countrie, index) {
    let opt = document.createElement('option');
    opt.innerHTML = countrie;
    opt.value = countrie;
    fragment.appendChild(opt);
});
sel.appendChild(fragment);
console.log(sel);


export default {
  
  language: 'en-US',
  async getCountries() {
    const response = await countriesArr;
    if (response.ok) {
      return await response.json();
    }
  console.log(getCountries())

  },
  async sortByCountry(country, page = 1) {
    const response = await countriesArr;
    if (response.ok) {
      return await response.json();
    }
  }
  
}


// //     // let filters = document.querySelector('.filters');
// //     // let select = document.querySelector('.select-js');

//      async function getCountries() {
//         const countries = countriesArr;
//         return countries;
//     }

//     export async function generateOptions(language = 'en-US') {
//   let emptyObj = new Object();
//   if (language === 'en-US') {
//     emptyObj = {
//       name: 'Choose country',
//       id: undefined,
//     };
//   } else {
//     emptyObj = {
//       name: 'Choose something...',
//       id: undefined,
//     };
//     }
//     const dataForGenerationOfOptions = await getCountries();
//     const array = dataForGenerationOfOptions.countries.map(el => el);
//     array.unshift(emptyObj);
//    const markup = array.map(el => template({ el }));
//    refs.select.innerHTML = '';
//   refs.select.insertAdjacentHTML('beforeend', markup);
        
// }

// refs.filters.addEventListener('change', onFilterChooseAndRenderPages);
// async function onFilterChooseAndRenderPages(e) {

//   if (e.target.value === 'Choose country')  {
//     return;
//   }

//     }
    
//     refs.container.dataset.page = 'filtering';
//     renderByCountriFilter(e.target.value, 1);
// async function renderByCountriFilter(country, page) {
//      try {
//     if (page === 1) {
//       refs.container.innerHTML = ''; //change tefs?
//        }
//        const array = await getCountries();
//        const countryId = array.countries.find(el => el.name === country).id;
//        const results = await EventsApiService.sortByCountry(countryId, page);
//        if (page > results.total_pages) {
//       refs.spiner.removeSpinner(); // change or ad function spinner
//       return;
//     }
//     render(results.results); // link for render
//   } catch (e) {
//     console.log('this is error:', e);
//   }
// }
  
// let status = 'home';
//    export function onHomeClickHandler() {
//   filters.classList.remove('visually-hidden');
//   status = 'home';
// }
//  export function onMyLibraryClickHandler() {
//     status = 'library';
//     filters.classList.add('visually-hidden');
// }

// export { getCountries };