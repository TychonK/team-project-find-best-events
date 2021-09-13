
import './sass/main.scss';
import './filterByCountry.js';

import debounce from 'lodash.debounce';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import EventsApiService from './js/api-service';


// let foundedEvent = '';  // перенесла в файл api-service.js

const refs = {
    input: document.querySelector('.eventInput'),
    container: document.querySelector('.events-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')    // заменить!!!
};

const eventsApiService = new EventsApiService();

// --!!-- некорректно работает --!!--
// refs.input.addEventListener('input', debounce(() => {
//     onSearch();
// }, 500));

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);    // заменить!!!

function onSearch(ev) {
    ev.preventDefault(); // чтоб при сабмите стр не перезагружалась
    resetSearch();
    // foundedEvent = refs.input.value;
    eventsApiService.event = refs.input.value;  // запис.значение, которое получаем при помощи сетера
    eventsApiService.resetPage();       

    //вставить fetch fetchEvent(foundedEvent)
    eventsApiService.fetchEvents();
}

// для кнопки Show More
function onLoadMore() {
    eventsApiService.fetchEvents();
}

function resetSearch() {
    refs.container.innerHTML = '';
}


//Lena`s code
// // отрисовка контента

// function contentOutput(events) {
//     // if (events.length === 1) {
//     //     resetSearch();
//     //     markupContries(//renderEvents, events);
//     // } else if (events.length > 1 && events.length <= 10) {
//     //     resetSearch();
//     //     markupContries(//renderEvents, events);
//     // } else if (events.length > 10) {
//     //     resultMessage(
//     //         error,
//     //         'To many matches found. Please enter a more specific query!',
//     //     );
//     // } else {
//     //     resultMessage(info, 'No matches found!');
//     // }
// };

// function resultMessage(typeInfo, textInfo) {
//     typeInfo({
//         text: `${textInfo}`,
//         delay: 1000,
//         closerHover: true,
//     });
// }

// function markupEvents(tpl, events) {
//     refs.container.insertAdjacentHTML('beforeend', tpl(events));
// }

