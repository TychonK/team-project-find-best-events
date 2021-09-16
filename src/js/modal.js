
const refs = {
    modalContainer: document.querySelector(".modal"),
    modalImg: document.querySelector('.modal__image'),
    modalOpenBtn: document.querySelector('.open-btn'),
    modalCloseBtn: document.querySelector('.modal__button'),
  modalOverlay: document.querySelector('.modal__overlay'),
  eventsGallery: document.querySelector('.events'),
  modalInfoList: document.querySelector('.modal-info__list'),
  modalInfoTopic: document.querySelector('.modal-info__topic')      
    };

let eventModalSrc = '';
let priceArr = '';

refs.eventsGallery.addEventListener('click', onEventOpenClick);

function onEventOpenClick(event) {
  event.preventDefault();
  if (!event.target.classList === 'event__list')
  {
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
      
      // return data._embedded.events,
      createGallery(data._embedded.events)
      //  console.log(data._embedded.events)
        // createElement(data._embedded.events);
    })
        .catch(err => {
            console.log(err);
            // error ({ text: 'No results' })
        })
    };

function createGallery(data) {
  const images = data.map(el => {
    // console.log(el);
    createElement(el),
      console.log(el);
  });
};







function createElement({ name, info, url, priceRanges }) {
  
  let priceArr = priceRanges.map(el => { createPriceEl(el)  });

  // return name
  // console.log(name, info, url);
    const galleryElement =
    `<li class="modal-info__item">
                <h3 class="modal-info__topic">INFO</h3>
                <p class="modal-info__text">${name}</p>
              </li>
    `
  refs.modalInfoList.insertAdjacentHTML('beforeend', galleryElement)
  // console.log(priceRanges);
  // console.log(priceArr);
  // createPriceEl(priceArr)
  
};


function createPriceEl({ type }) {

  const galleryElementPrice =
    `<li class="modal-info__item">
                <h3 class="modal-info__topic">PRICES</h3>
                  <p class="modal-info__text">${type}</p>
              </li>
    `
    refs.modalInfoList.insertAdjacentHTML('beforeend', galleryElementPrice)
  console.log(type);
}












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