import Vue from 'vue'
import App from './App'
import globalMixin from '@/static/js/global.js'
import store from '@/store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(globalMixin);

const app = new Vue({
    ...App,
	store
})
app.$mount()
