export const setHtmlFontSize = {
    data(){
        let tablet = 650,
            maxMobile = tablet - 1,
            desktop = 1000,
            maxTablet = desktop - 1,
            containerCollapse = 1840,
            maxRems = 1440;
        return {
            breakpoints: {
                tablet: tablet,
                maxMobile: maxMobile,
                desktop: desktop,
                maxTablet: maxTablet,
                containerCollapse: containerCollapse,
                maxRems: maxRems
            },
        }
    },
    created(){
        if (typeof document !== 'undefined' && window.innerWidth >= this.breakpoints.desktop) {
            window.addEventListener('resize', this.setHtmlFontSize);
        }
    },
    destroyed(){
        if (typeof document !== 'undefined' && window.innerWidth >= this.breakpoints.desktop){
            window.removeEventListener('resize', this.setHtmlFontSize);
        }
    },
    mounted() {
        if(window.innerWidth >= this.breakpoints.desktop){
            this.setHtmlFontSize();
        }
    },
    methods:{
        setHtmlFontSize (){
            if(window.innerWidth >= this.breakpoints.desktop) {
                let fontSize = window.innerWidth / 100;
                if(window.innerWidth >= this.breakpoints.maxRems) {
                    fontSize = this.breakpoints.maxRems/100;
                }
                document.documentElement.style.fontSize = fontSize + 'px';
            } else {
                document.documentElement.style.fontSize = null
            }
        },
    }
};