window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function (){
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    const yourReports = document.getElementById('yourreports');
    const profileReports = document.getElementById('profile__yourreports');

    const yourUpdates = document.getElementById('yourupdates');
    const profileUpdates = document.getElementById('profile__yourupdates');

    yourReports.onclick = function() {
        profileReports.style.display = 'block';
        yourReports.style.color = '#1D1C1C';
        yourReports.style.borderBottom = '4px solid #1D1C1C';

        profileUpdates.style.display = 'none';
        yourUpdates.style.color = '#DAD6D3';
        yourUpdates.style.border = 'none';
    };
    yourUpdates.onclick = function() {
        profileReports.style.display = 'none';
        yourReports.style.color = '#DAD6D3';
        yourReports.style.border = 'none';


        profileUpdates.style.display = 'block';
        yourUpdates.style.color = '#1D1C1C';
        yourUpdates.style.borderBottom = '4px solid #1D1C1C';
    };
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    const profileNavContent = document.getElementById('profile__nav-menu');
    const profileNavMap = document.getElementById('profile__nav-map');
    const Map = document.getElementById('map_box');

    profileNavMap.onclick = function() {
        if (document.getElementsByClassName('js lazyload mobile')) {
            topFunction();
        } else {
            Map.style.zIndex = '3';
            Map.style.top = '8em'; //4
            Map.style.left = '31em'; // 29
            profileNavMap.style.backgroundColor = '#F6F2EF';
            profileNavContent.style.backgroundColor = 'inherit';
            yourReports.style.display = 'none';
            yourUpdates.style.display = 'none';
        }
    };

    profileNavContent.onclick = function() {
        Map.style.zIndex = '-3';
        Map.style.top= '4em';
        Map.style.left= '29em';
        profileNavMap.style.backgroundColor = 'inherit';
        profileNavContent.style.backgroundColor = '#F6F2EF';
        yourReports.style.display = 'block';
        yourUpdates.style.display = 'block';

        if (yourReports.style.backgroundColor === '#1D1C1C') {
            profileReports.style.display = 'block';
            profileUpdates.style.display = 'none';

            yourUpdates.style.color = '#DAD6D3';
            yourUpdates.style.border = 'none';
        } else if(yourUpdates.style.backgroundColor === '#1D1C1C') {
            profileUpdates.style.display = 'block';
            profileReports.style.display = 'none';

            yourReports.style.color = '#DAD6D3';
            yourReports.style.border = 'none';
        }

    };

    const mapPageId = document.getElementsByClassName('mappage');
}