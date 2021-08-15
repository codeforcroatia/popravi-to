const toggleInfoModals = function(){
    const modalButton = document.getElementsByClassName('details-button')
        infoModals = document.getElementsByClassName('info-container')
        modalTriggers = Array.from(modalButton).entries();
        closeModalButton = document.getElementsByClassName('close-info-modal')
        closeTriggers = Array.from(closeModalButton).entries()

    for (let [index, modal] of modalTriggers){
        modal.addEventListener('click', function(){
            infoModals[index].classList.toggle('show-info-modal')
            infoModals[index].classList.toggle('visually-hidden')
        });
    }

    for (let [index, button] of closeTriggers){
        button.addEventListener('click', function(){
            button.parentNode.parentNode.classList.toggle('show-info-modal')
            button.parentNode.parentNode.classList.toggle('visually-hidden')
        })
    }
}()