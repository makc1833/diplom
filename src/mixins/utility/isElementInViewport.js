export const isElementInViewport = {
    methods: {
        isElementInViewport(el) {
            let rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document. documentElement.clientHeight)
            )
        },
    }
};