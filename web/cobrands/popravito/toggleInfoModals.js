const toggleInfoModals = function(){
    const modalButton = document.querySelectorAll('.details-button')
        modalButtonArray = Array.from(modalButton).entries();
        infoModals = document.querySelectorAll('.info-modal')

    for (let [index, modal] of modalButtonArray){

        const toggleModal = () => {
            console.log(infoModals[index])
            infoModals[index].classList.toggle('show-info-modal')
        }

        modal.addEventListener("click", toggleModal);
    }
}()