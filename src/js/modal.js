
// const refs = {
//     modalContainer: document.querySelector(".modal"),
//     modalImg: document.querySelector('.modal__image'),
//     modalOpenBtn: document.querySelector('.open-btn'),
//     modalCloseBtn: document.querySelector('.modal__button'),
//   modalOverlay: document.querySelector('.modal__overlay'),
//   eventsGallery: document.querySelector('.events'),
//   modalInfoList: document.querySelector('.modal-info__list'),
//   modalInfoTopic: document.querySelector('.modal-info__topic')      
//     };

// let eventModalSrc = '';
// let priceArr = '';
//  let arr = ''
// refs.eventsGallery.addEventListener('click', onEventOpenClick);

// function onEventOpenClick(event) {
//   event.preventDefault();
//   if (!event.target.classList === 'event__list')
//   {
//     console.log('мимо');
// return
//   }
//   eventModalSrc = event.target.dataset.src;

//   onOpenModal();
//   createModalContent(eventModalSrc)

// }
// function createModalContent(eventModalSrc) {
     
//   return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${eventModalSrc}&apikey=PLEluArGwTZQl36ty5ijCNPhmvtWXv1M`)
//     .then(response => response.json())
//     // .then(data => console.log(data))
//     .then(data => {
  
//       createGallery(data._embedded.events)

//     })
//         .catch(err => {
//             console.log(err);
     
//         })
//     };


// function createGallery(data) {
//   const images = data.map(el => {
//     // console.log(el);
//     createElement(el),
//       console.log(el);
//   });
// };



// function createElement({ name, info, url, priceRanges }) {
  
//   let priceArr = priceRanges.map(el => { createPriceEl(el)  });
// ;
//     const galleryElement =
//     `<li class="modal-info__item">
//                 <h3 class="modal-info__topic">INFO</h3>
//                 <p class="modal-info__text">${name}</p>
//               </li>
//     `
//   refs.modalInfoList.insertAdjacentHTML('beforeend', galleryElement)

// };


// function createPriceEl({ type }) {

//   const galleryElementPrice =
//     `<li class="modal-info__item">
//                 <h3 class="modal-info__topic">PRICES</h3>
//                   <p class="modal-info__text">${type}</p>
//               </li>
//     `
//     refs.modalInfoList.insertAdjacentHTML('beforeend', galleryElementPrice)
//   console.log(type);
// }



// refs.modalOpenBtn.addEventListener('click', onOpenModal);

// function onOpenModal() {
//   window.addEventListener('keydown', onEscKeyPress)
//   refs.modalContainer.classList.add("is-open")
// };

// refs.modalCloseBtn.addEventListener('click', onCloseModal);

// function onCloseModal(){
//  refs.modalContainer.classList.remove("is-open");
//  refs.modalImg.src = "";
// };

// refs.modalOverlay.addEventListener('click', onOverlayClick);

// function onOverlayClick(e){
//  if(e.target === e.currentTarget){
//   onCloseModal()
// }
// };

// function onEscKeyPress(e){
//   if(e.code === 'Escape'){
//     onCloseModal()
//   }
// };


