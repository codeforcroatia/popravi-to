const toggleInfoModals = function(){
    const modalButton = document.getElementsByClassName('details-button')
        infoModals = document.getElementsByClassName('info-modal')

    for (let [index, modal] of modalButton){
        modal.addEventListener("click", function(){
            infoModals[index].classList.toggle('show-info-modal')
        });
    }
}()