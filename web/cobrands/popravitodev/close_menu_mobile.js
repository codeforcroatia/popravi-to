window.addEventListener("DOMContentLoaded", (event) => {
    const menuButton = document.getElementById('mobile-menu');

    const closeMobileMenu = () => {
        menuButton.classList.toggle('close-mobile-menu');
    }

    menuButton.addEventListener('click', closeMobileMenu)
})