import Vue from 'vue'
import App from './App'
import globalMixin from '@/static/js/global.js'
import store from '@/store/index.js'
import apiUrl from '@/static/js/api.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(globalMixin);

Vue.prototype.$http = function(url, data, type='GET') {
	console.log('type',type)
	let tmp_token = this.$store.state.token
	return new Promise((resolve,reject)=>{
		wx.request({
			url: apiUrl+url,
			data,
			method: type,
			header: {
				'token': tmp_token?tmp_token:'',
				'content-type': 'application/json'
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

const app = new Vue({
	...App,
	store
})
app.$mount()
