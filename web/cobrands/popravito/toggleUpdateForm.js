const toggleUpdateForm = function(){
    const toggleUpdateButton = document.getElementById('updateReportButton')
        updateForm = document.querySelector('#update_form')
    
    const openUpdateForm = () => {
        const problemHeader = document.getElementById('problemHeader')
        const updatesContainer = document.getElementById('updatesContent')
        const rssContainer = document.querySelector('.shadow-wrap')

        problemHeader.classList.add('visually-hidden')
        updatesContainer.classList.add('visually-hidden')
        rssContainer.classList.add('visually-hidden')
        
        updateForm.classList.remove('visually-hidden')
    }

    toggleUpdateButton.addEventListener('click', openUpdateForm)
}()