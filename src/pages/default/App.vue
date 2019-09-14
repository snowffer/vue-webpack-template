<template>
    <div id="app">
        This is the default entry component 12. 
    </div>
</template>
<script>
    export default {
        name: 'app',

        components: {

        },

        props: {},

        data () {
            return {

            };
        },

        watch: {},

        filters: {},

        computed: {
            // ...mapGetters({

            // }),
        },

        methods: {
            // ...mapMutations({

            // })
        },
        mounted: function () {
            this.$nextTick(function () {
                a = 1;
            });
        },

        created: function () {

        },

        beforeDestroy: function () {

        }
    };
</script>

<style>
    #app {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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

