import './sass/main.scss';
import './js/filter-by-countries.js';

import debounce from 'lodash.debounce';
import { PNotifyEmptyInput, PNotifyError, PNotifyForCountry } from './js/pnotify.js';

import getRefs from './js/refs';
import eventModalTpl from './templates/modal.hbs';

import EventsApiService from './js/api-service';

import eventsCardTpl from './templates/events-card.hbs';
/* Text animation and spinner */
import animate from './js/textAnimation';
/* Gallery animation */
import animateGallery from './js/gallery-animation';
/* Scroll to top */
import scrollToTop from './js/scrollToTop';
import galleryAnimation from './js/gallery-animation';


const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const KEY = 'PLEluArGwTZQl36ty5ijCNPhmvtWXv1M';
// backup key!
// const KEY = 'jhkkj2iyFlD2xYmqlTxa2m9jlL7PbZrp';

animate();
scrollToTop();

const refs = getRefs();

document.addEventListener('DOMContentLoaded', renderTrending);

function renderTrending() {
  //// render 1 page
  return fetch(
    `${BASE_URL}/events.json?keyword=&size=24&sort=random&apikey=${KEY}`,
  )
    .then(response => response.json())
    .then(data => {
      return data._embedded.events;
    })
    .then(data => eventsCardTpl(data))
    .then(el => {
      refs.container.innerHTML = '';
      refs.container.insertAdjacentHTML('beforeend', el);
      animateGallery();
    });
}

refs.input.addEventListener('input', debounce(onSearch, 700));
refs.countrySelect.addEventListener('input', onSelect);

let searchQuery;
let selectedCountry;
const api = new EventsApiService();

function onSelect(e) {
  e.preventDefault();
  selectedCountry = e.target.value.slice(-2);
  if (selectedCountry === '') {
    return;
  }
  if (selectedCountry === "ry") {
    selectedCountry = '';
  }
  refs.container.innerHTML = '';
  api.country = selectedCountry;
  api.fetchEvents().then(
     data => {
        if (data) markupEvents(data);
        else PNotifyForCountry();
      }
  )
}

function markupEvents(e) {
  refs.container.innerHTML = eventsCardTpl(e);
  animateGallery();
}

function onSearch(e) {
  e.preventDefault();
  resetSearch();
  searchQuery = encodeURIComponent(e.target.value);
  if (searchQuery === '') {
    api.foundedEvent = searchQuery
    return PNotifyEmptyInput();
  } else { 
  api.foundedEvent = searchQuery;
    api.fetchEvents().then(
      data => {
        console.log(data);
        if (data) markupEvents(data);
        else PNotifyError();
      })
    // .catch(error({ text: "We have a problem", delay: 3000 }))
}
}

function resetSearch() {
  refs.container.innerHTML = '';
}

window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
          api.incrementPage(1000)
    api.fetchEvents().then(function (data) {
      refs.container.insertAdjacentHTML("beforeend", eventsCardTpl(data))
      animateGallery();
    });
        }
    }, {
        passive: true
    });

// ---/-------модалка------------------------------------------------
let eventModalSrc = '';
let eventModalAuthor = '';
let ur = '';
let onBuyTickets = '';
let onBuyTicketsSecond = '';
let onBuyTicketsThird = '';

refs.eventsGallery.addEventListener('click', onEventOpenClick);

function onEventOpenClick(event) {
  event.preventDefault();
  // console.log(event.target.classList.value);
  if (
    event.target.classList.value != 'event__list' &&
    event.target.classList.value != 'event__square' &&
    event.target.classList.value != 'event__image' &&
    event.target.classList.value != 'event__content' &&
    event.target.classList.value != 'event__title' &&
    event.target.classList.value != 'event__date' &&
    event.target.classList.value != 'event__place'
  ) {
    return;
  }

  eventModalSrc = event.target.dataset.src;
  eventModalAuthor = event.target.alt;
  eventModalAuthor = event.target.dataset.alt;
  ur = event.target.dataset.url;
  // console.log(event.target.dataset.url);

  onOpenModal();
  createModalContent(eventModalSrc);
  // const onBuyTickets = document.querySelector('#buy-tickets');
  // console.log(onBuyTickets);
  // onBuyTickets.addEventListener('click', onBuyTicketsBtnClick);
}

function onBuyTicketsBtnClick() {
  // console.log(ur);
  window.open(`${ur}`);
}

function createModalContent(eventModalSrc) {
  return fetch(
    `${BASE_URL}/events.json?id=${eventModalSrc}&apikey=${KEY}`,
  )
    .then(response => response.json())
    .then(data => {
      return data._embedded.events;
      // console.log(data._embedded.events)
    })
    .then(data => eventModalTpl(data))

    .then(el => refs.modalRenderContainer.insertAdjacentHTML('beforeend', el))
    // .then(() => {
      
    //     onBuyTickets = document.querySelector('#buy-tickets');
    //   onBuyTicketsSecond = document.querySelector('#buy-tickets-second');
    //   onBuyTicketsThird = document.querySelector('#buy-tickets-third');
    //   console.log(onBuyTickets);
    //   onBuyTickets.addEventListener('click', onBuyTicketsBtnClick);
    //   onBuyTicketsSecond.addEventListener('click', onBuyTicketsBtnClick);
    //   onBuyTicketsThird.addEventListener('click', onBuyTicketsBtnClick);}
      
    // );
}

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modalContainer.classList.add('is-open');
  document.querySelector('body').classList.add('no-scroll');
}

refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modalContainer.classList.remove('is-open');
  clearModalContent();
  document.querySelector('body').classList.remove('no-scroll');
  // refs.container.innerHTML = ''
}

function clearModalContent() {
  refs.modalRenderContainer.innerHTML = '';
}

refs.modalOverlay.addEventListener('click', onOverlayClick);

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

refs.modalMoreBtn.addEventListener('click', onModalMoreBtnClick);

function onModalMoreBtnClick(event) {
  event.preventDefault();
  onCloseModal();
  resetSearch();
  createModalMoreBtnContent(eventModalAuthor);
  //  console.log(eventModalAuthor);
}

function createModalMoreBtnContent(eventModalAuthor) {
  resetSearch();
  console.log(eventModalAuthor)
  let array = eventModalAuthor.split(' ');
  let keyWord = array[0];
  console.log(keyWord);
  return fetch(
    `${BASE_URL}/events.json?keyword=${keyWord}&apikey=${KEY}`,
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data._embedded.events;
      // console.log(eventModalAuthor);
      // console.log(data._embedded.events)
    })
    .then(data => eventsCardTpl(data))
    .then(el => {
      refs.container.innerHTML = '';
      // console.log(el)
      refs.container.insertAdjacentHTML('beforeend', el);
      animateGallery();
    });
  // refs.container.insertAdjacentHTML('beforeend', el));
  //
}
