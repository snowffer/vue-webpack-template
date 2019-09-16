<template>
    <div id="app">
        This is the default entry component 12.
    </div>
</template>
<script>
import { getRandomNumberString } from '../../common/common';

export default {
    name: 'App',

    components: {

    },

    filters: {},

    props: {},

    data() {
        return {

        };
    },

    computed: {
        // ...mapGetters({

        // }),
    },

    watch: {},
    mounted() {
        this.$nextTick(() => {
            console.log('This is default app vue component');
            console.log(`This is random string: ${getRandomNumberString()}`);
        });
    },

    created() {

    },

    beforeDestroy() {

    },

    methods: {
        // ...mapMutations({

        // })
    },
};
</script>

<style>
    #app {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",
        "Microsoft YaHei","微软雅黑",Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: flex;
        font-size: 14px;
    }
</style>
