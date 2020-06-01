export const isAnyElementInViewport = {
    methods: {
        isAnyElementInViewport(el) {

            let rect = el.getBoundingClientRect();
            // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
            let windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            let windowWidth = (window.innerWidth || document.documentElement.clientWidth);

            // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
            let vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            let horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

            return (vertInView && horInView);
        },
    }
};