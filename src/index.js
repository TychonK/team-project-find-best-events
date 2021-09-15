
import './sass/main.scss';
import './filterByCountry.js';

import debounce from 'lodash.debounce';

import { info, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import EventsApiService from './js/api-service';

import './js/modal';

import eventsCardTpl from './templates/events-card.hbs';


// let foundedEvent = '';  // перенесла в файл api-service.js

const refs = {
    input: document.querySelector('#input-event'),
    countrySelect: document.getElementById('input-country'),
    container: document.querySelector('.events-container'),


    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    filters: document.querySelector('.filters-js'),
    select: document.querySelector('.select-js')
        // заменить!!!

};

const countriesArr = ['Choose country...', 'United States Of America US', 'Andorra AD', 'Anguilla AI', 'Argentina AR', 'Australia AU', 'Austria AT', 'Azerbaijan AZ', 'Bahamas BS', 'Bahrain BH', 'Barbados BB', 'Belgium BE', 'Bermuda BM', 'Brazil BR', 'Bulgaria BG', 'Canada CA', 'Chile CL', 'China CN', 'Colombia CO', 'Costa Rica CR', 'Croatia HR', 'Cyprus CY', 'Czech Republic CZ', 'Denmark DK', 'Dominican Republic DO', 'Ecuador EC', 'Estonia EE', 'Faroe Islands FO', 'Finland FI', 'France FR', 'Georgia GE', 'Germany DE', 'Ghana GH', 'Gibraltar GI', 'Great Britain GB', 'Greece GR', 'Hong Kong HK', 'Hungary HU', 'Iceland IS', 'India IN', 'Ireland IE', 'Israel IL', 'Italy IT', 'Jamaica JM', 'Japan JP', 'Korea KR', 'Latvia LV', 'Lebanon LB', 'Lithuania LT', 'Luxembourg LU', 'Malaysia MY', 'Malta MT', 'Mexico MX', 'Monaco MC', 'Montenegro ME', 'Morocco MA', 'Netherlands NL', 'Netherlands Antilles AN', 'New Zealand NZ', 'Northern Ireland ND', 'Norway NO', 'Peru PE', 'Poland PL', 'Portugal PT', 'Romania RO', 'Russian Federation RU', 'Saint Lucia LC', 'Saudi Arabia SA', 'Serbia RS', 'Singapore SG', 'Slovakia SK', 'Slovenia SI', 'South Africa ZA', 'Spain ES', 'Sweden SE', 'Switzerland CH', 'Taiwan TW', 'Thailand TH', 'Trinidad and Tobago TT', 'Turkey TR', 'Ukraine UA', 'United Arab Emirates AE', 'Uruguay UY', 'Venezuela VE']
 
const fragment = document.createDocumentFragment();
countriesArr.forEach(function(countrie, index) {
    let opt = document.createElement('option');
    opt.innerHTML = countrie;
    opt.value = countrie;
    fragment.appendChild(opt);
});
refs.countrySelect.appendChild(fragment);

const eventsApiService = new EventsApiService();

// --!!-- некорректно работает --!!--
// refs.input.addEventListener('input', debounce(() => {
//     onSearch();
// }, 500));

refs.input.addEventListener("input", debounce(onSearch, 500));
refs.countrySelect.addEventListener("input", onSelect)
//refs.loadMoreBtn.addEventListener('click', onLoadMore);    // заменить!!!

//let search = "&keyword=";
let searchQuery;
let selectedCountry;

function onSelect(e) {
    e.preventDefault();
    selectedCountry = e.target.value.slice(-2);
    console.log(selectedCountry)
    paginator();
}

function onSearch(e) {
    e.preventDefault(); // чтоб при сабмите стр не перезагружалась
    resetSearch();
    searchQuery = e.target.value;
    searchQuery;
    console.log(searchQuery)
    if (searchQuery === "") {
        document.querySelector(".paginator").innerHTML = "";
        alert({text: "Please, specify you query"})
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
                    document.querySelector(".searching").innerHTML = "<div class='while-searching_text'>Searching events...</div>";
                },
                url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&countryCode=${selectedCountry}&size=200&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`,
                success: function (response) {
                    document.querySelector(".searching").innerHTML = "";
                    if (response._embedded === undefined) {
                        error({text: "No events"})
                        throw new Error();
                        
                    }
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





