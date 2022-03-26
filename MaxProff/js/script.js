// Замена картинок на webP
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});
$(document).ready(function () {
    headerBurger();
    sliders();
    spoilersButton();
    changeOutputRange();
    changeSlideList();
    makedDeclination();
});
// Бургер
function headerBurger() {
    $('.burger__button, .burger__menu-exit').click(setActive);
    $('.burger__menu').click(function (event) {
        if (event.target === $(this).get(0) && $(this).hasClass("active"))
            setActive();
    });
}
function setActive() {
    $('.burger__menu, .burger__button, .burger__menu-body').toggleClass('active');
    $('body').toggleClass('lock');
}
function spoilersButton() {
    $('.spoiler__title').click(function (event) {
        if (window.screen.width >= 700)
        {
            clearSpoilers($(this).parent(), $(this).next());
            return;
        }
        // класс one закрывает другие вкладки
        // класс active будет висеть не на title, а на блоке item

        // Сохраним переменную item и блока, чтобы проверять их в дальнейшем
        // item - блок с заголовком, на который нажали
        // block - блок со списком всех заголовков
        let item = $(this).parent();
        let block = item.parent();

        // Проверка на наличие класса one у блока
        if (block.hasClass('one')) {
            // Если класс есть, то требуется закрыть все остальные заголовки

            // Проверяем все item-ы и удаляем у всех, кроме текущего, класс active
            block.children().not(item).removeClass('active');
            // проверяем все block__text у всех item-ов в block, и если block__text соответствует текущему($(this).next()), то слайдим его вниз
            block.children().children('.spoiler__text').not($(this).next()).slideUp(300);
        }
        // добавялем класс active нашему item-у, на title которого мы нажали
        item.toggleClass('active');
        // слайдим текст в нашем блоке
        $(this).next().slideToggle(300);
    });
}
function clearSpoilers(title, text) {
    if (title.hasClass('active'))
    {
        title.removeClass('active');
    }
    text.removeAttr('style');
}
function changeOutputRange() {
    $range = $('#myRange');
    $range.next().html($range.val());
    $range.bind('mousedown mousemove touchstart touchmove', function () {
        $(this).next().html($(this).val());
    })
}
function changeSlideList() {
    $button = $('.main__slider-list-button');
    $button.click(function (event) {
        $(this).parent().children('ul').toggleClass('active');
        $(this).toggleClass('active');
    });
    $list = $('.main__slider-list').children('ul').children('li').children('h6');
    $subList = $('.main__slider-sublist').children('li');
    $list.each(function (index) {
        if ($(this).position().top >= 140) {
            $(this).addClass('grey');
        }
    });
    $subList.each(function (index) {
        if ($(this).position().top >= 140) {
            $(this).addClass('grey');
        }
    });
}

function sliders() {
    let sliderRepair = $('.main__slider_repair');
    let sliderExample = $('.main__slider_example')
    sliderRepair.slick({
        arrows: false, // кнопки перехода
        dots: false, // точки прокрутки
        adaptiveHeight: true, // адартивная высота
        slidesToShow: 4, // кол0во слайдов за раз
        slidesToScroll: 1, // кол0во слайдов за раз
        speed: 500, // скорость прокрутки
        easing: 'erase', // тип анимации
        infinite: false, // бесконечный ли слайдер
        initialSlide: 0, // место старта
        responsive: [ // брейкпоинты
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 1,
                    slidesToScroll: 1, // кол0во слайдов за раз
                    centerMode: true,
                    dots: true

                }
            },
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 1,
                    slidesToScroll: 2, // кол0во слайдов за раз
                    centerMode: true,
                    dots: true
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                    initialSlide: 0,
                    slidesToScroll: 1, // кол0во слайдов за раз
                    centerMode: true,
                    dots: true
                }
            }
        ],
    });
    sliderExample.slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        speed: 500,
        easing: 'erase',
    });
}
function makedDeclination() {
    let days = $('.day');
    let word_array = ['first', 'second', 'third'];
    days.each(function (index) {
        $(this).addClass(declOfNum($(this).text(), word_array));
    })
}
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
