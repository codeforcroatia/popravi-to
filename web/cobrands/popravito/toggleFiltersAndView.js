const toggleFiltersAndView = function(){
    let filterButton = document.getElementById('filterButton')
        listButton = document.getElementById('listViewButton')
        mapButton = document.getElementById('mapViewButton')
        saveCloseButton = document.querySelector('.save-and-close-button')

    const toggleFilter = () => {
        document.querySelector('#filterModal').classList.toggle('visually-hidden')
        listButton.classList.add('visually-hidden')
        mapButton.classList.add('visually-hidden')
    }

    const toggleListView = () => {
        document.getElementById('reportsContainer').classList.remove('visually-hidden')
        document.getElementById('mapContainer').classList.add('visually-hidden')
        listButton.classList.add('list-map-active')
        mapButton.classList.remove('list-map-active')
    }

    const toggleMapView = () => {
        document.getElementById('reportsContainer').classList.add('visually-hidden')
        document.getElementById('mapContainer').classList.remove('visually-hidden')
        mapButton.classList.add('list-map-active')
        listButton.classList.remove('list-map-active')
    }

    const toggleSaveAndCloseFilters = () => {
        setTimeout(function(){
            listButton.classList.remove('visually-hidden')
            mapButton.classList.remove('visually-hidden')
        }, 1700)
    }

    filterButton.addEventListener('click', toggleFilter)
    listButton.addEventListener('click', toggleListView)
    mapButton.addEventListener('click', toggleMapView)
    saveCloseButton.addEventListener('click', toggleSaveAndCloseFilters)   
}()

