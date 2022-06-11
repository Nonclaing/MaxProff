'use strict';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import * as $ from 'jquery'

const defaultOptions = {
    simulateTouch: true,
    grabCursor: true,
    watchOverflow: true,
};

const defaultPaginationRender = {
    renderBullet: function(index, className) {
        return (`
            <div class="${className}"">
                <span class="slider__bullet-button"></span>
                <span class="slider__bullet-text"></span>
            </div>                `
        );
    }
};

const swiperRepair = new Swiper('.slider-repair', {
    ...defaultOptions,
    touchRatio: 1,
    spaceBetween: 21,
    speed: 1000,
    pagination: {
        el: '.slider-repair__pagination',
        clickable: true,
        ...defaultPaginationRender,
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

// const swiperExample = new Swiper('.slider-example', {
//     ...defaultOptions,
//     slidesPerView: 1,
//     spaceBetween: 0,
//     watchOverflow: false,
//     paginationType: "custom",
//     pagination: {
//         el: '.slider-example__pagination',
//         clickable: true,
//         renderBullet: (index, className) => {
//             let names = getNameForPagination();
//             return `<span class="${className}"></span><span>${names[index]}</span>`;
//         },
//     },
//     navigation: {
//         nextEl: '.slider-example__button-next',
//         prevEl: '.slider-example__button-prev',
//     },
// });

// function getNameForPagination() {
//     let names = [];
//     let sliders = document.getElementsByClassName('slider-example');
//     for (let element of sliders) {
//         let elementsInSlide = element.querySelectorAll('[data-slide-pagination]');
//         elementsInSlide.forEach((element) => {
//             names.push(element.getAttribute('data-slide-pagination'));
//         });
//     }
//
//     return names;
// }
// 1. outer loop //
setNameForPagination();

function setNameForPagination() {
    $(".slider-example").each(function(index, element) {
        let $this = $(this);
        let namesArray = [];
        // 1.1. nested loop
        $this.find('[data-slide-pagination]').each(function(index, element) {
            namesArray.push($(this).data("slidePagination"));
        });
        /* create swiper objects */
        $this.addClass(`slider-example_instance-${index}`);
        const swiperExample = new Swiper(`.slider-example_instance-${index}`, {
            ...defaultOptions,
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: false,
            loop: true,
            paginationType: "custom",
            pagination: {
                el: '.slider-example__pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return (`
                    <div class="slider-example__bullet ${className}"">
                        <span class="slider-example__bullet-button slider__bullet-button"></span>
                        <span class="slider-example__bullet-text slider__bullet-text">${namesArray[index]}</span>
                    </div>
           
                    `
                    );
                }
            },
            navigation: {
                nextEl: '.slider-example__button-next',
                prevEl: '.slider-example__button-prev',
            },
        });

        // let swiperNested = new Swiper(".instance-" + index, {
        //     direction: "vertical",
        //     spaceBetween: 50,
        //     keyboard: {
        //         enabled: true
        //     },
        //     pagination: {
        //         el: ".swiper-pagination-nested",
        //         clickable: true,
        //         renderBullet: function(index, className) {
        //             return (
        //                 '<span class="' +
        //                 className +
        //                 '">' +
        //                 (index + 1) +
        //                 "." +
        //                 namesArray[index] +
        //                 "</span>"
        //             );
        //         }
        //     }
        // });
    });
}





//
// const swiperPreview = new Swiper('.slider-with-preview__preview', {
//     ...defaultOptions,
//     direction: 'vertical',
//     spaceBetween: 6,
// });