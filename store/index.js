import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openid: '',
		token:'',
		member_id:'',
		type:''
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
		},
		setType(state, n) {
			state.type = n
		}
	}
})

export default store
