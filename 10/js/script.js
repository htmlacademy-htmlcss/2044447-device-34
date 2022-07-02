let card = document.querySelector('.card_container');
let openCard = document.querySelector('.navigation-user_card');

let submenu = document.querySelector('.submenu_wrapper');
let openSubmenu = document.querySelector('.menu_links_catalog');

const bullets = document.querySelectorAll('.slider-pagination-button');
const sliderList = document.querySelector('.slider_list');
const screenWidth = 1160;
const model = [true, false, false];
const next = document.querySelector('.slider-next');
const prev = document.querySelector('.slider-prev');
const screens = document.querySelectorAll('.slider_item');


const screensProperty = document.querySelectorAll('.slider_block');
const buttons = document.querySelectorAll('.slider_btn');

const field = document.querySelector('.field');

const popup = document.querySelector('.modal-container');
const openPopupButton = document.querySelector('.button-open');
const closePopupButton = document.querySelector('.modal-close-button');
const error = document.querySelector('.field-email');
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


// Open card

openCard.onclick = function() {
    card.classList.toggle('card_container_open');
  };

// Open submenu

openSubmenu.onclick = function() {
    openSubmenu.classList.toggle('menu_links_catalog_open');
    submenu.classList.toggle('submenu_wrapper-open');
  };

// Slider Devices

if(bullets) {
    bullets.forEach(function(bullet) {
        bullet.addEventListener('click', function(evt) {
            console.log(bullet.dataset.screen);
            let position = getPosition(bullet.dataset.screen);
            doMoving(position);
            setActiveBullet(bullet);
            updateModel(bullet.dataset.screen);
            setActiveScreen();
            updateTabIndex ();
            console.log(model);
        })
    });

    next.addEventListener('click', function() {
        let active  = getActiveScreen();
        if (active < screens.length - 1) {
            active = active + 1;
            updateModel(active);
            let position = getPosition(active);
            doMoving(position);
            setActiveBullet(bullets[active]);
            setActiveScreen();
            updateTabIndex ();
        }
    })

    prev.addEventListener('click', function() {
        let active  = getActiveScreen();
        if (active > 0) {
            active = active - 1;
            updateModel(active);
            let position = getPosition(active);
            doMoving(position);
            setActiveBullet(bullets[active]);
            setActiveScreen();
            updateTabIndex ();
        }
    })

    function getPosition (number) {
        return -1 * screenWidth * number;
    };

    function doMoving (delta) {
        sliderList.style.marginLeft = delta + 'px';
    };

    function setActiveBullet (bullet) {
        document.querySelector('.slider-pagination-button-current').classList.remove('slider-pagination-button-current');
        bullet.classList.add('slider-pagination-button-current');
    };

    function setActiveScreen () {
        document.querySelector('.active-screen').classList.remove('active-screen');
        screens[getActiveScreen()].classList.add('active-screen');
    }

    function updateTabIndex () {
        document.querySelectorAll('.slider_item a').forEach(function (link) {
            link.tabIndex = -1;
        });
        document.querySelectorAll('.active-screen a').forEach(function (link) {
            link.tabIndex = 0;
        });
    }


    function updateModel (number) {
        model[getActiveScreen()] = false;
        model[number] = true;
    };

    function getActiveScreen () {
        return model.indexOf(true);
    }
}

// Slider property

buttons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        evt.preventDefault();
        console.log(button.dataset.property);
        setActiveButton(button);
    });

    function setActiveButton (button) {
        document.querySelector('.current_slider').classList.remove('current_slider');
        screensProperty[button.dataset.property].classList.add('current_slider');
        document.querySelector('.btn_current').classList.remove('btn_current');
        button.classList.add('btn_current');
    };

});

// Form subscribe

field.addEventListener("keyup", function(){
    if (field.value.match(pattern)) {
        field.classList.remove('field-error');
    }
    else {
        field.classList.add('field-error');
    }
});
//  Modal-window

openPopupButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('modal-container-open');
  });

closePopupButton.addEventListener('click', function () {
    popup.classList.remove('modal-container-open');
  });

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      popup.classList.remove('modal-container-open');
    }
  });

error.addEventListener("keyup", function(){
    if (error.value.match(pattern)) {
        document.querySelector('.auth-form-warning-text').classList.remove('visually-hidden');
    }
    else {
        document.querySelector('.auth-form-error-text').classList.remove('visually-hidden');
        error.classList.add('auth-form-error');
    }
})
