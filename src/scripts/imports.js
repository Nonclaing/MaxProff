'use strict';
import '@styles/style.scss'
import * as $ from 'jquery';

import {spoilersButton, clearSpoilers} from "./components/spoilerButton";
import {headerBurger, setActive, changeOutputRange, toCalc} from "./components/headerBurger";
import {testWebP} from "./components/makeWebP";
import {changeSlideList, sliders} from "./components/sliders";
import {makeDeclination} from "./components/declination";
import {swiperRepair} from "@scripts/components/swipers";

$(document).ready(function () {
    testWebP();
    headerBurger();
    toCalc();
    spoilersButton();
    changeOutputRange();
    changeSlideList();
    makeDeclination();
    swiperRepair();
});
