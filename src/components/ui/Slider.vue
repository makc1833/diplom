<template lang="pug">
    include ../../tools/mixins.pug

    +b.slider(
        ref="range"
    )
        +e.line(
            :style="{'transform': lineScale}"
        )
        +e.value(
            :style="{'left': sliderLeft}"
            @mousedown="onMouseDown"
            @touchstart="onMouseDown"
        )
</template>

<script>

    export default {
        props: {
            steps: {
                type: Number,
                required: true,
            },
            minValue: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                transition: true,
                clicked: false,
                lineScale: 0,
                sliderLeft: 0,
                range: null,
                currentValue: 0,
                currentLeft: 0
            };
        },
        mounted(){
            this.setStartProperties();
        },
        methods: {
            setStartProperties(){
                this.range = this.$refs.range.getBoundingClientRect()
                this.lineScale = `scaleX(${this.range.width / this.steps * this.minValue / this.range.width})`;
                this.sliderLeft = `${this.range.width / this.steps * this.minValue}px`;
            },
            onMouseDown(){
                this.clicked = true;
                document.body.style.userSelect = 'none';
                document.addEventListener('mousemove', this.mouseMove)
                document.addEventListener('mouseup', this.onMouseUp)
                document.addEventListener('touchmove', this.mouseMove)
                document.addEventListener('touchend', this.onMouseUp)
            },
            onMouseUp(){
                this.clicked = false;
                document.body.style.userSelect = null;
                document.removeEventListener('mousemove', this.mouseMove)
                document.removeEventListener('mouseup', this.onMouseUp)
                document.removeEventListener('touchmove', this.mouseMove)
                document.removeEventListener('touchend', this.onMouseUp)
            },
            mouseMove(e){
                if(this.clicked){
                    let event = e || window.event,
                        eventX;
                    if(e.type === 'touchmove'){
                        eventX = event.touches[0].pageX;
                    } else {
                        eventX = event.pageX;
                    }
                    this.currentValue = (eventX - this.range.left)/this.range.width;
                    this.currentLeft = eventX - this.range.left;
                    if(eventX <= this.range.left + (this.range.width / this.steps * this.minValue)){
                        this.currentValue =  this.range.width / this.steps * this.minValue / this.range.width;
                        this.currentLeft = this.range.width / this.steps * this.minValue;
                    } else if(eventX >= this.range.right){
                        this.currentValue = 1;
                        this.currentLeft = this.range.width;
                    }
                    this.lineScale = `scaleX(${this.currentValue})`;
                    this.sliderLeft = `${this.currentLeft}px`;
                    this.$emit('change', Math.ceil(this.currentValue*this.steps));
                }
            }
        },
    };
</script>