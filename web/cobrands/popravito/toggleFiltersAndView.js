const toggleFiltersAndView = function(){
    let filterButton = document.getElementById('filterButton')
        listButton = document.getElementById('listViewButton')
        mapButton = document.getElementById('mapViewButton')

    const toggleFilter = () => {
        document.querySelector('#filterModal').classList.toggle('visually-hidden')
    }

    const toggleListView = () => {
        document.getElementById('reportsContainer').classList.remove('visually-hidden')
        document.getElementById('mapContainer').classList.add('visually-hidden')
    }

    const toggleMapView = () => {
        document.getElementById('reportsContainer').classList.add('visually-hidden')
        document.getElementById('mapContainer').classList.remove('visually-hidden')
    }

    filterButton.addEventListener('click', toggleFilter)
    listButton.addEventListener('click', toggleListView)
    mapButton.addEventListener('click', toggleMapView)
    
}()

