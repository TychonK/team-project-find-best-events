export default class EventsApiService {
    constructor() {
        this.foundedEvent = '';
        this.page = 1;
        this.country = '';
    }

    fetchEvents() {
        const url =
            `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.foundedEvent}&countryCode=${this.country}&size=24&page=${this.page}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`;

        return fetch(url)
            .then(r => r.json())
            .then(data => {
                this.incrementPage(data.page.totalPages);
                // console.log(data);

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