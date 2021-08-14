const toggleInfoModals = function(){
    const modalButton = document.querySelectorAll('.details-button')
    const modalButtonArray = Array.from(modalButton).entries();

    const openInfoModal = () => {
       /* for (let [index, modal] of modalButton) {
            const toggleModal => () {
              modals[index].classList.toggle("show-modal");
            };
            trigger.addEventListener("click", toggleModal);
            closeButtons[index].addEventListener("click", toggleModal);
        }
       */
      console.log(modalButton)
    }

    modalButton.addEventListener('click', openInfoModal)
}()