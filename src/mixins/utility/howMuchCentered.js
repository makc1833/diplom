import {getScroll} from "./getScroll";

export const howMuchCentered = {
    mixins: [getScroll],
    methods: {
        howMuchCentered(el) {
            let elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop),
                rect = el.getBoundingClientRect(),
                viewportHeight = window.innerHeight,
                k = (2*this.getScroll().y-2*elementOffsetTop+viewportHeight-rect.height)/(viewportHeight + rect.height);
            return k;
        }
    }
};