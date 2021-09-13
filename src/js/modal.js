// const galleryListRef = document.querySelector('.gallery');

// const galleryMarkup = createGalleryElement (galleryItems);
// galleryListRef.insertAdjacentHTML('beforeend', galleryMarkup);

// galleryListRef.addEventListener('click', onImageOpenClick);

// function createGalleryElement(galleryItems){
// return galleryItems.map(({preview, original, description}) => {
//  return `
//  <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"
//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>
//  `;
// }).join('')
// };


const modalContainer = document.querySelector(".modal");
const modalImg = document.querySelector('.modal__image')


function onImageOpenClick(event) {
  event.preventDefault();
  if(!event.target.classList.contains('gallery__image')){
return
  }
  
  onOpenModal();

const modalImgLink = event.target.dataset.source;
const modalImgAlt = event.target.alt;

modalImg.alt = modalImgAlt;
modalImg.src = modalImgLink;
}


const modalOpenBtn = document.querySelector('.open-btn');
modalOpenBtn.addEventListener('click', onOpenModal )

function onOpenModal(){
  window.addEventListener('keydown', onEscKeyPress)
  modalContainer.classList.add("is-open")
};

const modalCloseBtn = document.querySelector('.modal__button');
modalCloseBtn.addEventListener('click', onCloseModal);


function onCloseModal(){
 modalContainer.classList.remove("is-open");
 modalImg.src = "";
};


const overlay = document.querySelector('.modal__overlay');
overlay.addEventListener('click', onOverlayClick);

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