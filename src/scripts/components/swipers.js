'use strict';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export {swiperRepair};

const swiperRepair = new Swiper('.slider-repair', {
    simulateTouch: true,
    touchRatio: 2,
    grabCursor: true,
    watchOverflow: true,
    spaceBetween: 21,
    speed: 800,
    pagination: {
        el: '.slider-repair__pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1.2,
        },
        425: {
            slidesPerView: 1.3,
        },
        600: {
            slidesPerView: 2.5,
        },
        1000: {
            slidesPerView: 4,
        },

    },
});