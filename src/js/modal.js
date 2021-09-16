
const refs = {
    modalContainer: document.querySelector(".modal"),
    modalImg: document.querySelector('.modal__image'),
    modalOpenBtn: document.querySelector('.open-btn'),
    modalCloseBtn: document.querySelector('.modal__button'),
  modalOverlay: document.querySelector('.modal__overlay'),
    eventsGallery: document.querySelector('.events')
};

let eventModalSrc = '';


refs.eventsGallery.addEventListener('click', onEventOpenClick);
function onEventOpenClick(event) {
  event.preventDefault();
  if (!event.target.classList === 'gallery__image'
  ) {
    console.log('мимо');
return
  }
  eventModalSrc = event.target.dataset.src;
  // console.log(event.target.dataset.src);
  // console.log(eventModalSrc);
  onOpenModal();
  createModalContent(eventModalSrc)
  // console.log(event);
  // console.log(event.target.dataset.src);
 
 
  // console.log(event.dataset);
  // console.log(event.target);
  // console.log(event.target.data-src.value);
  // console.log(event.target.src);

// const modalImgLink = event.target.dataset.source;
// const modalImgAlt = event.target.alt;

// modalImg.alt = modalImgAlt;
// modalImg.src = modalImgLink;
}

function createModalContent(eventModalSrc) {
     
  return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${eventModalSrc}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      return data._embedded.events,
    console.log(data._embedded.events); })
        .catch(err => {
            console.log(err);
            // error ({ text: 'No results' })
        })
    };




// _embedded { } events {info}

refs.modalOpenBtn.addEventListener('click', onOpenModal);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress)
  refs.modalContainer.classList.add("is-open")
};

refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal(){
 refs.modalContainer.classList.remove("is-open");
 refs.modalImg.src = "";
};

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