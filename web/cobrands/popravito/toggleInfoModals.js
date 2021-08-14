const toggleInfoModals = function(){
    const modalButton = document.querySelectorAll('.details-button')
        modalButtonArray = Array.from(modalButton).entries();
        infoModals = document.querySelectorAll('#report-a-problem-sidebar')

    for (let [index, modal] of modalButtonArray){

        const toggleModal = () => {
            infoModals[index].classList.toggle('show-info-modal')
        }

        modal.addEventListener("click", toggleModal);
    }
}()