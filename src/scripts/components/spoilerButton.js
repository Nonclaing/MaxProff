`use strict`;

import * as $ from 'jquery';

export {spoilersButton, clearSpoilers};

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