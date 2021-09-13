export default class EventsApiService {
    constructor() {
        this.foundedEvent = '';
        this.page = 1;
    }

    fetchEvents() {
        console.log(this);
        const url =
            `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.foundedEvent}&size=12&page=${this.page}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`;

        fetch(url)
            .then(r => r.json())
            .then(data => {
                this.incrementPage();
            });
    }

    incrementPage() {
        this.page += 1;
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
}