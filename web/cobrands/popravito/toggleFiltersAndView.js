const toggleFiltersAndView = function(){
    let filterButton = document.getElementById('filterButton')
        listButton = document.getElementById('listViewButton')
        mapButton = document.getElementById('mapViewButton')

    const toggleFilter = () => {
        document.querySelector('#filterModal').classList.toggle('visually-hidden')
    }

    const toggleListView = () => {
        alert('clicked')
    }

    const toggleMapView = () => {
        alert('clicked')
    }

    filterButton.addEventListener('click', toggleFilter)
    listButton.addEventListener('click', toggleListView)
    mapButton.addEventListener('click', toggleMapView)
    
}()

