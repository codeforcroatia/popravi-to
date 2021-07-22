const toggleFilter = function(){
    let filterButton = document.getElementById('filterButton')

    const toggleFilter = () => {
        document.querySelector('#filterModal').classList.toggle('visually-hidden')
    }

    filterButton.addEventListener('click', toggleFilter)
    
}()