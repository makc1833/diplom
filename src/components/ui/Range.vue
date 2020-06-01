<template lang="pug">
    include ../../tools/mixins
    +b.range(
        :class="{'error': error}"
    )
        +e.label {{label}}
        +e.SLIDER-COMPONENT.slider(
            :steps="maxValue"
            :minValue="minValue"
            @change="$emit('change', $event)"
        )
        +e.number {{ value }}
</template>

<script>

    import Slider from "./Slider.vue";
    export default {
        props: {
            label: {
                required: true,
                type: [String,Number]
            },
            value: {
                required: true,
                type: Number
            },
            maxValue: {
                required: true,
                type: Number
            },
            minValue: {
                required: true,
                type: Number
            },
            error: {
                required: true,
                type: Boolean
            },
        },
        components: {
            'slider-component': Slider
        }
    }
</script>
