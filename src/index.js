import './sass/main.scss';
import './js/filter-by-countries.js';

import debounce from 'lodash.debounce';

import { info, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import getRefs from './js/refs';

// import EventsApiService from './js/api-service';

// import './js/modal';

import eventsCardTpl from './templates/events-card.hbs';
import eventModalTpl from './templates/modal.hbs';
const refs = getRefs();

// const eventsApiService = new EventsApiService();

refs.input.addEventListener('input', debounce(onSearch, 700));
refs.countrySelect.addEventListener('input', onSelect);

let searchQuery;
let selectedCountry = '';

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
        beforeSend: function () {
          document.querySelector('.searching').innerHTML =
            "<div class='while-searching_text'>Searching events...</div>";
        },
        url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&countryCode=${selectedCountry}&size=200&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`,
        success: function (response) {
          document.querySelector('.searching').innerHTML = '';
          if (response._embedded === undefined) {
            error({ text: 'No events' });
            refs.container.innerHTML = '';
            throw new Error();
          }
          done(response._embedded.events);
        },
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



// async fetchApiEvent() {
//     const url = `${BASE_URL}/events?keyword=${this.searchQuery}&apikey=${KEY}&countryCode=${this.country}&page=${this.page}&source=universe`;
//     // &page=${this.page}
//     // console.log(this);
//     const response = await fetch(url);
//     const data = await response.json();
//     // console.log(data); //Нам приходит массив объектов из _embedded
//     const { _embedded } = data;
//     // console.log(_embedded.events);
//     return _embedded.events;
//   }

// searchService
//   .fetchApiEvent()
//   .then(data => eventCardsTpl(data))
//     .then(markup => refs.cardsList.insertAdjacentHTML('beforeend', markup));
  

// ---/-------модалка------------------------------------------------
let eventModalSrc = '';

refs.eventsGallery.addEventListener('click', onEventOpenClick);

function onEventOpenClick(event) {
  event.preventDefault();
  if (!event.target.classList === 'event__list')
  {console.log('мимо');
return}
  eventModalSrc = event.target.dataset.src;

  onOpenModal();
  createModalContent(eventModalSrc)

}

 function createModalContent(eventModalSrc) {
  return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${eventModalSrc}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`)
    .then(response => response.json())
    .then(data => {
      return data._embedded.events
      // console.log(data._embedded.events)
     })
    .then(data => eventModalTpl(data))
    .then(el => refs.modalInfoList.insertAdjacentHTML('beforeend', el));
    };
    
// const menuMarkup = createMenuMarkup(menu);

// function createMenuMarkup(menu){
//     return menu.map(menuCardTpl).join('');
// };


refs.modalOpenBtn.addEventListener('click', onOpenModal);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress)
  refs.modalContainer.classList.add("is-open")
};

refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal(){
 refs.modalContainer.classList.remove("is-open");
 clearModalContent()
};

function clearModalContent() {
  refs.modalInfoList.innerHTML = '';
}

refs.modalOverlay.addEventListener('click', onOverlayClick);

function onOverlayClick(e){
 if(e.target === e.currentTarget){
  onCloseModal()
}
};

function onEscKeyPress(e){
  if(e.code === 'Escape'){
    onCloseModal()
  }
};