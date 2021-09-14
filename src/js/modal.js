
// добавить, когда будет разметка
// function onImageOpenClick(event) {
//   event.preventDefault();
//   if(!event.target.classList.contains('gallery__image')){
// return
//   }
  
//   onOpenModal();

// const modalImgLink = event.target.dataset.source;
// const modalImgAlt = event.target.alt;

// modalImg.alt = modalImgAlt;
// modalImg.src = modalImgLink;
// }


const refs = {
    modalContainer: document.querySelector(".modal"),
    modalImg: document.querySelector('.modal__image'),
    modalOpenBtn: document.querySelector('.open-btn'),
    modalCloseBtn: document.querySelector('.modal__button'),
    modalOverlay: document.querySelector('.modal__overlay')
};

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