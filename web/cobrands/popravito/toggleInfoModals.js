const toggleInfoModals = function(){
    const modalButton = document.getElementsByClassName('details-button')
        infoModals = document.getElementsByClassName('info-container')
        modalTriggers = Array.from(modalButton).entries();

    for (let [index, modal] of modalTriggers){
        modal.addEventListener("click", function(){
            infoModals[index].classList.toggle('show-info-modal')
            infoModals[index].classList.toggle('visually-hidden')
        });
    }
}()