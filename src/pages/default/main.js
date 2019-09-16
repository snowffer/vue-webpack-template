import Vue from 'vue';
import App from './App.vue';
// import * as Tools from '../../common/common';

Vue.config.productionTip = false;

// Tools.install = function (Vue) {
//     Vue.prototype.$tools = Tools;
// };
// Vue.use(Tools);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
