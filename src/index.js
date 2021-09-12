import './sass/main.scss';

import debounce from 'lodash.debounce';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

let foundedEvent = '';

const refs = {
    input: document.querySelector('.eventInput'),
    container: // (путь к контейнеру)

};

refs.input.addEventListener('input', debounce(() => {
    onSearch();
}, 500));

function onSearch() {
    resetSearch();
    foundedEvent = refs.input.value;
    //вставить fetch fetchEvent(foundedEvent)
        .then(contentOutput)
        .catch(err => console.log(err));
}

function resetSearch() {
    refs.container.innerHTML = '';
}

// отрисовка контента

function contentOutput(events) {
    if (events.length === 1) {
        resetSearch();
        markupContries(//renderEvents, events);
    } else if (events.length > 1 && events.length <= 10) {
        resetSearch();
        markupContries(//renderEvents, events);
    } else if (events.length > 10) {
        resultMessage(
            error,
            'To many matches found. Please enter a more specific query!',
        );
    } else {
        resultMessage(info, 'No matches found!');
    }
};

function resultMessage(typeInfo, textInfo) {
    typeInfo({
        text: `${textInfo}`,
        delay: 1000,
        closerHover: true,
    });
}

function markupEvents(tpl, events) {
    refs.container.insertAdjacentHTML('beforeend', tpl(events));
}
