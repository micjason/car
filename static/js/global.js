import apiUrl from '@/static/js/api.js'
export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {}
			},
			onLoad() {
				const _this = this
				//#ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						if (loginRes.code) {
							wx.request({
								url: apiUrl+'/wechat_api/login/get_openid',
								data: {
									code: loginRes.code
								},
								header: {
									'content-type': 'application/json' // 默认值
								},
								success(res) {
									_this.$store.commit('setOpenid', JSON.parse(res.data.data).openid)
								}
							})

							
						}
					}
				});
				//#endif
			},
			created() {},
			computed: {},
			watch: {},
			methods: {}
		})
	}
}
