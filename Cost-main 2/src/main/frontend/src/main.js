
import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css'
import 'vuesax/dist/vuesax.css';
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";

//defined as global component

import vSelect from "vue-select";
Vue.component("v-select", vSelect);
Vue.use(Vuesax);
import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts)
export const eventBus = new Vue();
Vue.prototype.$domain = 'http://18.132.74.86/images';
import axios from 'axios'
axios.defaults.baseURL = 'http://18.132.74.86:8084';
Vue.prototype.$http = axios
Vue.use(axios);
import Vuex from 'vuex'
Vue.use(Vuex);
import Print from 'vue-print-nb'
Vue.use(Print);
import '../themeConfig.js'
import '@/firebase/firebaseConfig'
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);
import acl from './acl/acl'
import './globalComponents.js'
import './assets/scss/main.scss'
import '@/assets/css/main.css';
import router from './router'
import store from './store/store'
import i18n from './i18n/i18n'
import './filters/filters'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faSpinner)

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'YOUR_API_KEY',
        libraries: 'places',
    },
})




import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


require('./assets/css/iconfont.css')
import globalAccess from './layouts/mixins/globalAccess'
Vue.mixin(globalAccess)

Vue.config.productionTip = false

new Vue({
    store,
    i18n,
    acl,
    render: h => h(App),
    router
}).$mount('#app')
