import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openid: '',
		token:''
	},
	mutations: {
		setOpenid(state, n) {
			state.openid = n
		},
		setToken(state, n) {
			state.token = n
		}
	}
})

export default store
