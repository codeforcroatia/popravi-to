const toggleUpdateForm = function(){
    const toggleUpdateButton = document.getElementById('updateReportButton')
          updateForm = document.getElementById('update_form')
    
    const openUpdateForm = () => {
        //const problemHeader = document.getElementsByClassName('problem-header')
        const updatesContainer = document.getElementsByClassName('updates-content')
        const rssContainer = document.getElementsByClassName('shadow-wrap')

        //problemHeader.classList.add('visually-hidden')
        updatesContainer.classList.add('visually-hidden')
        rssContainer.classList.add('visually-hidden')
        
        updateForm.classList.remove('visually-hidden')
    }

    toggleUpdateButton.addEventListener('click', openUpdateForm)
}()