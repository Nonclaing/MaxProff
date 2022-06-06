`use strict`;

import * as $ from 'jquery';

export {headerBurger, setActive, changeOutputRange, toCalc};

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


function changeOutputRange() {
    let $range = $('#myRange');
    $range.next().html($range.val());
    $range.bind('mousedown mousemove touchstart touchmove', function () {
        $(this).next().html($(this).val());
    })
}

function toCalc() {
    $('.header__calc-button').click(function () {
        setActive();
    });
}