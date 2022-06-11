'use strict';

import * as $ from 'jquery';
import '@lib/slick.min';

export {changeSlideList};

function changeSlideList() {
    let $button = $('.opening-list__button');
    $button.click(function (event) {
        $(this).parent().children('ul').toggleClass('active');
        $(this).toggleClass('active');
    });
    let $list = $('.opening-list').children('ul').children('li').children('h6');
    let $subList = $('.opening-list__sublist').children('li');
    $list.each(function (index) {
        if ($(this).position().top >= 138) {
            $(this).addClass('grey');
        }
    });
    $subList.each(function (index) {
        if ($(this).position().top >= 138) {
            $(this).addClass('grey');
        }
    });
}