export const getScroll = {
    methods: {
        getScroll() {
            let x, y, d = document,
                r = d.documentElement,
                b = d.body;
            if (window.pageYOffset !== undefined) {
                x = pageXOffset;
                y = pageYOffset;
            } else {
                x = r.scrollLeft || b.scrollLeft || 0;
                y = r.scrollTop || b.scrollTop || 0;
            }
            return {x, y};
        }
    }
};