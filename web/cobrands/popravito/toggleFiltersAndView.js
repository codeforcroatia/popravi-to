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
        listButton.classList.add('list-map-active')
        mapButton.classList.remove('list-map-active')
    }

    const toggleMapView = () => {
        document.getElementById('reportsContainer').classList.add('visually-hidden')
        document.getElementById('mapContainer').classList.remove('visually-hidden')
        mapButton.classList.add('list-map-active')
        listButton.classList.remove('list-map-active')
    }

    filterButton.addEventListener('click', toggleFilter)
    listButton.addEventListener('click', toggleListView)
    mapButton.addEventListener('click', toggleMapView)
    
}()

