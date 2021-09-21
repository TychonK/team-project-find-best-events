import './sass/main.scss';
import './js/filter-by-countries.js';

import debounce from 'lodash.debounce';

import { info, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import getRefs from './js/refs';
import eventModalTpl from './templates/modal.hbs';

import EventsApiService from './js/api-service';

import eventsCardTpl from './templates/events-card.hbs';
/* Text animation and spinner */
import animate from "./js/textAnimation";
/* Gallery animation */
import animateGallery from "./js/gallery-animation";
/* Scroll to top */
import scrollToTop from './js/scrollToTop';
/* Code */

animate();
scrollToTop();

const refs = getRefs();

document.addEventListener('DOMContentLoaded', renderTrending);

function renderTrending() {
  //// render 1 page
  return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=&sort=random&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`)
    .then(response => response.json())
    .then(data => {
      return data._embedded.events
    })
    .then(data => eventsCardTpl(data))
    .then(el => {
      refs.container.innerHTML = ''
      refs.container.insertAdjacentHTML('beforeend', el)
      animateGallery();
    })
}

refs.input.addEventListener('input', debounce(onSearch, 700));
refs.countrySelect.addEventListener('input', onSelect);

let searchQuery;
let selectedCountry = '';

// paginator();

function onSelect(e) {
  e.preventDefault();
  selectedCountry = e.target.value.slice(-2);
  console.log(selectedCountry);
  refs.container.innerHTML = "";
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
    alert({ text: 'Please, specify you query', delay: 2000 });
    return;
  }
  paginator();
}


function paginator() {
  $('.paginator').pagination({
    dataSource: function (done) {
      $.ajax({
        type: 'GET',
        beforeSend: function () {
          document.querySelector(".searching").innerHTML = '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
        },
        url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&countryCode=${selectedCountry}&size=200&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`,
        success: function (response) {
          document.querySelector(".searching").innerHTML = "";
          if (response._embedded === undefined) {
            error({ text: "No events", delay: 2000 })
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

      if (document.querySelectorAll(".event__list").length === 1) {
        document.querySelector(".event__list").style.margin = 0;
      }
      animateGallery();
    },
  });
}

// function markupEvents(e) {
//   refs.container.insertAdjacentHTML('beforeend', eventsCardTpl(e));
// }

function resetSearch() {
  refs.container.innerHTML = '';
}


// ---/-------модалка------------------------------------------------
let eventModalSrc = '';
let eventModalAuthor = '';
let ur = '';
refs.eventsGallery.addEventListener('click', onEventOpenClick);

function onEventOpenClick(event) {
  event.preventDefault();
  console.log(event.target.classList.value)
  if (event.target.classList.value != 'event__list' && event.target.classList.value != 'event__square' && event.target.classList.value != 'event__image' && event.target.classList.value != 'event__content' && event.target.classList.value != 'event__title' && event.target.classList.value != 'event__date' && event.target.classList.value != 'event__place') {
    return;
  }

  eventModalSrc = event.target.dataset.src;
  eventModalAuthor = event.target.alt;
  ur = event.target.dataset.url;
  // console.log(event.target.dataset.url);

  onOpenModal();
  createModalContent(eventModalSrc);
  const onBuyTickets = document.querySelector('#buy-tickets');
  console.log(onBuyTickets);
  // onBuyTickets.addEventListener('click', onBuyTicketsBtnClick);
}

function onBuyTicketsBtnClick() {
  // console.log(ur);
  window.open(`${ur}`)
}


function createModalContent(eventModalSrc) {
  return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${eventModalSrc}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`)
    .then(response => response.json())
    .then(data => {
      return data._embedded.events
      // console.log(data._embedded.events)
    })
    .then(data => eventModalTpl(data))
    .then(el => refs.modalRenderContainer.insertAdjacentHTML('beforeend', el));
};


function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress)
  refs.modalContainer.classList.add("is-open")
  document.querySelector("body").classList.add("no-scroll")
};

refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modalContainer.classList.remove("is-open");
  clearModalContent()
  document.querySelector("body").classList.remove("no-scroll")
  // refs.container.innerHTML = ''
};

function clearModalContent() {
  refs.modalRenderContainer.innerHTML = '';
}

refs.modalOverlay.addEventListener('click', onOverlayClick);

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModal()
  }
};

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal()
  }
};


refs.modalMoreBtn.addEventListener('click', onModalMoreBtnClick);

function onModalMoreBtnClick(event) {
  event.preventDefault();
  onCloseModal()
  resetSearch()
  createModalMoreBtnContent(eventModalAuthor)
  //  console.log(eventModalAuthor);

}

function createModalMoreBtnContent(eventModalAuthor) {
  resetSearch()
  let array = eventModalAuthor.split(" ");
  let keyWord = array[0];
  console.log(keyWord);
  return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyWord}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data._embedded.events
      // console.log(eventModalAuthor);
      // console.log(data._embedded.events)
    })
    .then(data => eventsCardTpl(data))
    .then(el => {
      refs.container.innerHTML = ''
      // console.log(el)
      refs.container.insertAdjacentHTML('beforeend', el);
      animateGallery();
    })
  // refs.container.insertAdjacentHTML('beforeend', el));
  // 

};

