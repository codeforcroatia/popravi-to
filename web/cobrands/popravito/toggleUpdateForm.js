const toggleUpdateForm = function(){
    const toggleUpdateButton = document.getElementById('updateReportButton')
        updateForm = document.querySelector('#update_form')
        mqlMobile = window.matchMedia("(max-width: 768px)")
        mapContainer = document.querySelector('#map_box')
        submitForm = document.querySelector('#submitUpdate')
        problemHeader = document.querySelector('.problem-header')
        updatesContainer = document.querySelector('.updates-content')
        rssContainer = document.querySelector('.shadow-wrap')
    
    const openUpdateForm = () => {
        if (mqlMobile.matches){
            mapContainer.classList.add('visually-hidden')
        }

        problemHeader.classList.add('visually-hidden')
        updatesContainer.classList.add('visually-hidden')
        rssContainer.classList.add('visually-hidden')
        
        updateForm.classList.remove('visually-hidden')
        toggleUpdateButton.classList.add('visually-hidden')

    }

    const closeUpdateForm = () => {
        problemHeader.classList.remove('visually-hidden')
        updatesContainer.classList.remove('visually-hidden')
        rssContainer.classList.remove('visually-hidden')

        updateForm.classList.add('visually-hidden')
        toggleUpdateButton.classList.remove('visually-hidden')
    }

    toggleUpdateButton.addEventListener('click', openUpdateForm)
    mqlMobile.addEventListener('change', openUpdateForm)
    submitForm.addEventListener('click', closeUpdateForm)
}()