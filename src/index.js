
import './sass/main.scss';
import './filterByCountry.js';

import debounce from 'lodash.debounce';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import EventsApiService from './js/api-service';
import eventsCardTpl from './templates/events-card.hbs';

// let foundedEvent = '';  // перенесла в файл api-service.js

const refs = {
    input: document.querySelector('.eventInput'),
    container: document.querySelector('.events-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    filters: document.querySelector('.filters-js'),
    select: document.querySelector('.select-js')
        // заменить!!!
};

const eventsApiService = new EventsApiService();

// --!!-- некорректно работает --!!--
// refs.input.addEventListener('input', debounce(() => {
//     onSearch();
// }, 500));

refs.input.addEventListener("input", debounce(onSearch, 500));
//refs.loadMoreBtn.addEventListener('click', onLoadMore);    // заменить!!!

let searchQuery;
let selectedCountry;

function onSearch(e) {
    e.preventDefault(); // чтоб при сабмите стр не перезагружалась
    resetSearch();
    searchQuery = e.target.value;
    console.log(searchQuery)
    if (searchQuery === "") {
        document.querySelector(".paginator").innerHTML = "";
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
                url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&size=200&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`,
                success: function (response) {
                    done(response._embedded.events);
                }
            });
        },
        pageSize: 24,
        locator: ".events",
        totalNumberLocator: function (response) {
            return response._embedded.events.length;
        },
        
        prevText: "<",
        nextText: ">",
        callback: function (data, pagination) {
            // template method of yourself
            console.log(pagination)
            refs.container.innerHTML = "";
            refs.container.insertAdjacentHTML('beforeend', eventsCardTpl(data))
        }
    })
}

function markupEvents(e) {
    refs.container.insertAdjacentHTML('beforeend', eventsCardTpl(e));
}

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





