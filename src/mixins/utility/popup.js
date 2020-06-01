import {handlerOnEsc} from '../../mixins/utility/handlerOnEsc';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
export const popup = {
    mixins: [
        handlerOnEsc
    ],

    props: {
        active: true,
        type: Boolean
    },

    methods:{
        onKeyDown(e){
            this.handlerOnEsc(this.closePopup,e);
        },
        closePopup(){
            this.$emit('close');
        }
    },

    watch: {
        active(newValue){
            if(newValue) {
                document.addEventListener('keydown', this.onKeyDown);
                disablePageScroll(this.$refs.popup);
            } else {
                document.removeEventListener('keydown', this.onKeyDown);
                enablePageScroll();
            }
        }
    }
};