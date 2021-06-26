const menu = function(){
    const menuButton = document.getElementById('mobile-menu')
        menuBody = document.getElementById('menu-container')
        mqlDesktop = window.matchMedia("(min-width: 769px)")

    const openMobileMenu = () => {
        menuBody.classList.toggle('visually-hidden')
    }

    const mobileOrDesktopMenu = () => {
        if (mqlDesktop.matches){    
            menuBody.classList.remove('visually-hidden')
        } else {
            menuBody.classList.add('visually-hidden')
        }
    }

    mqlDesktop.addEventListener("change", mobileOrDesktopMenu)
    menuButton.addEventListener('click', openMobileMenu)

    return {
        mobileOrDesktopMenu: mobileOrDesktopMenu
    }
}()

menu.mobileOrDesktopMenu()