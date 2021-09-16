import './sass/main.scss';
import './js/filter-by-countries.js';

import debounce from 'lodash.debounce';

import { info, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import getRefs from './js/refs';

// import EventsApiService from './js/api-service';

import './js/modal';

import eventsCardTpl from './templates/events-card.hbs';

/* Text animation and spinner */
import animate from "./js/textAnimation";

animate();

// const refs = {
//     input: document.querySelector('#input-event'),
//     countrySelect: document.getElementById('input-country'),
//     container: document.querySelector('.events-container'),


//     loadMoreBtn: document.querySelector('[data-action="load-more"]'),
//     filters: document.querySelector('.filters-js'),
//     select: document.querySelector('.select-js')
// };

=======
const refs = getRefs();

// const eventsApiService = new EventsApiService();

refs.input.addEventListener('input', debounce(onSearch, 700));
refs.countrySelect.addEventListener('input', onSelect);

let searchQuery;
let selectedCountry = '';

paginator();

function onSelect(e) {
  e.preventDefault();
  selectedCountry = e.target.value.slice(-2);
  console.log(selectedCountry);
  if (selectedCountry === '') {
    return;
  }
  paginator();
}

function onSearch(e) {
  e.preventDefault();
  resetSearch();
  searchQuery = e.target.value;
  searchQuery;
  //console.log(searchQuery)
  if (searchQuery === '') {
    document.querySelector('.paginator').innerHTML = '';
    paginator();
    alert({ text: 'Please, specify you query' });
    return;
  }
  paginator();

  // eventsApiService.event = refs.input.value;  // запис.значение, которое получаем при помощи сетера
  // eventsApiService.resetPage();

  // //вставить fetch fetchEvent(foundedEvent)
  // eventsApiService.fetchEvents()
  //     .then(markupEvents);
}

// для кнопки Show More
// function onLoadMore() {
//     eventsApiService.fetchEvents()
//         .then(markupEvents);
// }

function paginator() {
    $('.paginator').pagination({
        dataSource: function (done) {
            $.ajax({
                type: 'GET',
                beforeSend: function() {
                    document.querySelector(".searching").innerHTML = '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
                },
                url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&countryCode=${selectedCountry}&size=200&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`,
                success: function (response) {
                    document.querySelector(".searching").innerHTML = "";
                    if (response._embedded === undefined) {
                        error({ text: "No events" })
                        refs.container.innerHTML = "";
                        throw new Error();  
                    }
                    done(response._embedded.events);
                }
            });
    },
    pageSize: 24,
    locator: '.events',
    totalNumberLocator: function (response) {
      return response._embedded.events.length;
    },

    prevText: '<',
    nextText: '>',
    callback: function (data, pagination) {
      // template method of yourself
      console.log(pagination);
      refs.container.innerHTML = '';
      refs.container.insertAdjacentHTML('beforeend', eventsCardTpl(data));
    },
  });
}

// function markupEvents(e) {
//   refs.container.insertAdjacentHTML('beforeend', eventsCardTpl(e));
// }

function resetSearch() {
  refs.container.innerHTML = '';
}

// // отрисовка контента

// function contentOutput(events) {
// if (events.length === 1) {
//     resetSearch();
//     markupContries(//renderEvents, events);
// } else if (events.length > 1 && events.length <= 10) {
//     resetSearch();
//     markupContries(//renderEvents, events);
// } else if (events.length > 10) {
//     resultMessage(
//         error,
//         'To many matches found. Please enter a more specific query!',
//     );
// } else {
//     resultMessage(info, 'No matches found!');
// }
// };

// function resultMessage(typeInfo, textInfo) {
//     typeInfo({
//         text: `${textInfo}`,
//         delay: 1000,
//         closerHover: true,
//     });
// }
