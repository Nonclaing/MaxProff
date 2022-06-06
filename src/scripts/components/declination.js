'use strict';

import * as $ from 'jquery';

export {makeDeclination};

function makeDeclination() {
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
