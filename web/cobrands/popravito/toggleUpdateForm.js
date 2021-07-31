const toggleUpdateForm = function(){
    const toggleUpdateButton = document.getElementById('updateReportButton')
        updateForm = document.querySelector('#update_form')
        mqlMobile = window.matchMedia("(max-width: 768px)")
        mapContainer = document.querySelector('#map_box')
    
    const openUpdateForm = () => {
        if (mqlMobile.matches){
            mapContainer.classList.add('visually-hidden')
        }

        const problemHeader = document.querySelector('.problem-header')
        const updatesContainer = document.querySelector('.updates-content')
        const rssContainer = document.querySelector('.shadow-wrap')

        problemHeader.classList.add('visually-hidden')
        updatesContainer.classList.add('visually-hidden')
        rssContainer.classList.add('visually-hidden')
        
        updateForm.classList.remove('visually-hidden')
        toggleUpdateButton.classList.add('visually-hidden')

    }

    toggleUpdateButton.addEventListener('click', openUpdateForm)
    mqlMobile.addEventListener('change', openUpdateForm)
}()