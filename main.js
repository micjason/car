import Vue from 'vue'
import App from './App'
import globalMixin from '@/static/js/global.js'
import store from '@/store/index.js'
import { encrypt, decrypt } from '@/static/js/entype.js';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(globalMixin);

 
Vue.prototype.encrypt = encrypt
Vue.prototype.decrypt = decrypt

const app = new Vue({
    ...App,
	store
})
app.$mount()
