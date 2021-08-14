const toggleInfoModals = function(){
    const modalButton = document.querySelectorAll('.details-button')
        modalButtonArray = Array.from(modalButton).entries();
        infoModals = document.querySelectorAll('#report-a-problem-sidebar')

    for (let [index, modal] of modalButtonArray){

        const toggleModal = () => {
            infoModals[index].style.display = 'block'
        }

        modal.addEventListener("click", toggleModal);
    }
}()