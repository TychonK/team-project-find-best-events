import getRefs from './refs';
// import { default as EventsApiService } from './api-service.js';
// import * from './index.js';
const refs = getRefs();

export const countriesArr = [
  'Choose country...',
  'United States Of America US',
  'Andorra AD',
  'Anguilla AI',
  'Argentina AR',
  'Australia AU',
  'Austria AT',
  'Azerbaijan AZ',
  'Bahamas BS',
  'Bahrain BH',
  'Barbados BB',
  'Belgium BE',
  'Bermuda BM',
  'Brazil BR',
  'Bulgaria BG',
  'Canada CA',
  'Chile CL',
  'China CN',
  'Colombia CO',
  'Costa Rica CR',
  'Croatia HR',
  'Cyprus CY',
  'Czech Republic CZ',
  'Denmark DK',
  'Dominican Republic DO',
  'Ecuador EC',
  'Estonia EE',
  'Faroe Islands FO',
  'Finland FI',
  'France FR',
  'Georgia GE',
  'Germany DE',
  'Ghana GH',
  'Gibraltar GI',
  'Great Britain GB',
  'Greece GR',
  'Hong Kong HK',
  'Hungary HU',
  'Iceland IS',
  'India IN',
  'Ireland IE',
  'Israel IL',
  'Italy IT',
  'Jamaica JM',
  'Japan JP',
  'Korea KR',
  'Latvia LV',
  'Lebanon LB',
  'Lithuania LT',
  'Luxembourg LU',
  'Malaysia MY',
  'Malta MT',
  'Mexico MX',
  'Monaco MC',
  'Montenegro ME',
  'Morocco MA',
  'Netherlands NL',
  'Netherlands Antilles AN',
  'New Zealand NZ',
  'Northern Ireland ND',
  'Norway NO',
  'Peru PE',
  'Poland PL',
  'Portugal PT',
  'Romania RO',
  'Russian Federation RU',
  'Saint Lucia LC',
  'Saudi Arabia SA',
  'Serbia RS',
  'Singapore SG',
  'Slovakia SK',
  'Slovenia SI',
  'South Africa ZA',
  'Spain ES',
  'Sweden SE',
  'Switzerland CH',
  'Taiwan TW',
  'Thailand TH',
  'Trinidad and Tobago TT',
  'Turkey TR',
  'Ukraine UA',
  'United Arab Emirates AE',
  'Uruguay UY',
  'Venezuela VE',
];

 export const fragment = document.createDocumentFragment();
countriesArr.forEach(function (countrie, index) {
  let opt = document.createElement('option');
  opt.innerHTML = countrie;
  opt.value = countrie;
  fragment.appendChild(opt);
});
refs.countrySelect.appendChild(fragment);



// const refs = {
//     input: document.querySelector('.eventInput'),
//     container: document.querySelector('.events-container'),
//     loadMoreBtn: document.querySelector('[data-action="load-more"]'),    // заменить!!!
//     filters: document.querySelector('.filters'),
//     select: document.querySelector('.select-js')
// };


// export default {
//   API_KEY: 'PLEluArGwTZQl36ty5ijCNPhmvtWXv1M',
//   language: 'en-US',
//   async getCountries() {
//     const response = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?country&apikey={apikey}");
//     if (response.ok) {
//       return await response.json();
//     }
//   },
//   async sortByCountry(country, page = 1) {
//     const response = await fetch('`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.foundedEvent}&size=12&page=${this.page}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M');
//     if (response.ok) {
//       return await response.json();
//     }
//   }

// }


//     // let filters = document.querySelector('.filters');
//     // let select = document.querySelector('.select-js');

//      async function getCountries() {
//         const countries = await EventsApiService.getCountries();
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

// refs.filters.addEventListener('change', onFilterChooseAndRenderPages());
// async function onFilterChooseAndRenderPages(e) {

//   if (e.target.value === 'Choose country')  {
//     return;
//   }

// }

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
///
// export { getCountries };