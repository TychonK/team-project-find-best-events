const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const KEY = 'PLEluArGwTZQl36ty5ijCNPhmvtWXv1M';
// backup key!
// const KEY = 'jhkkj2iyFlD2xYmqlTxa2m9jlL7PbZrp';

export default class EventsApiService {
    constructor() {
        this.foundedEvent = '';
        this.page = 1;
        this.country = '';
    }

    fetchEvents() {
        const url =
            `${BASE_URL}/events.json?keyword=${this.foundedEvent}&countryCode=${this.country}&size=24&page=${this.page}&apikey=${KEY}`;

        return fetch(url)
            .then(r => r.json())
            .then(data => {
                this.incrementPage(data.page.totalPages);
                console.log(data);
                if (data.hasOwnProperty("_embedded"))
                    return data._embedded.events;
            });
    }

    incrementPage(maxPages) {
        this.page < maxPages ? this.page += 1 : this.page = maxPages;
    }

    resetPage() {
        this.page = 1;
    }

    get event() {
        return this.foundedEvent;
    }

    set event(newEvent) {
        this.foundedEvent = newEvent;
    }
 
    set selectedCountry(newCountry) {
        this.country = newCountry;
    }
}