import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openid: '',
		token:'',
		member_id:''
	},
	mutations: {
		setOpenid(state, n) {
			state.openid = n
		},
		setToken(state, n) {
			state.token = n
		},
		setMember(state, n) {
			state.member_id = n
		}
	}
})

export default store
