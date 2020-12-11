import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
require('@/static/mock/mock.js')

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
