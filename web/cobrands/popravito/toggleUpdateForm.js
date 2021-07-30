const toggleUpdateForm = function(){
    const toggleUpdateButton = document.getElementById('updateReportButton')
          updateForm = document.getElementById('update_form')
    
    const openUpdateForm = () => {
        const containersToBeHidden = [document.getElementsByClassName('problem-header'), document.getElementsByClassName('updates-content'), document.getElementsByClassName('shadow-wrap')]
        
        containersToBeHidden.forEach(container => {
            container.classList.add('visually-hidden')
        });

        updateForm.classList.remove('visually-hidden')
    }

    toggleUpdateButton.addEventListener('click', openUpdateForm)
}