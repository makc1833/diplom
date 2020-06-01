+<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import {setHtmlFontSize} from "./mixins/utility/setHtmlFontSize";

    export default {
        mixins: [setHtmlFontSize],
    };
</script>



<style lang="scss">
    @import 'assets/scss/critical';
    @import 'assets/scss/main';
</style>