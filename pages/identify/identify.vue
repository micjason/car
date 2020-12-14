<template>
	<view class="identify">
		<view class="idetify-title">请选择身份：</view>
		<view class="identify-contnet">
			<div class="identify-box" @click="login(1)">
				客户
			</div>
			<div class="identify-box" @click="login(2)">
				维修员
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				identify: 0
			}
		},
		created() {

		},
		methods: {
			login(type) {
				const _this = this
				_this.identify = type
				if (_this.$store.state.openid) {
					wx.request({
						url: 'http://qx.51zhengrui.com/wechat_api/login/login',
						data: {
							openid: _this.$store.state.openid,
							type,
						},
						header: {
							'content-type': 'application/json'
						},
						success(res) {
							if(res.data.code == 0){
								_this.$store.commit('setToken', res.data.data.token)
								_this.$store.commit('setMember', res.data.data.member_id)
								uni.navigateTo({
									url: "/pages/list/list",
									success: () => {}
								})
							}
							else if(res.data.code == -2){
								uni.navigateTo({
									url: `/pages/login/login?type=${_this.identify}`,
									success: () => {}
								})
							}
							else{
								uni.showToast({
									icon:'none',
									title: res.data.msg,
									duration: 2000
								});
							}
						},
						fail() {
							
						}
					})
				} else {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							if (loginRes.code) {
								wx.request({
									url: 'http://qx.51zhengrui.com/wechat_api/login/get_openid',
									data: {
										code: loginRes.code
									},
									header: {
										'content-type': 'application/json' // 默认值
									},
									success(res) {
										_this.$store.commit('setOpenid', JSON.parse(res.data.data).openid)
										wx.request({
											url: 'http://qx.51zhengrui.com/wechat_api/login/login',
											data: {
												openid: _this.$store.state.openid,
												type,
											},
											header: {
												'content-type': 'application/json'
											},
											success(res) {
												if(res.data.code == 0){
													_this.$store.commit('setToken', res.data.data.token)
													_this.$store.commit('setMember', res.data.data.member_id)
													uni.navigateTo({
														url: "/pages/list/list",
														success: () => {}
													})
												}
												else if(res.data.code == -2){
													uni.navigateTo({
														url: `/pages/login/login?type=${_this.identify}`,
														success: () => {}
													})
												}
												else{
													uni.showToast({
														icon:'none',
														title: res.data.msg,
														duration: 2000
													});
												}
											},
											fail() {
												
											}
										})
									}
								})
							}
						}
					});
				}
			},
			test() {
				return new Promise((resolve, reject) => {
					setTimeout(res => {
						console.log('3秒')
						reject('haha')
					}, 3000)
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.identify {
		width: 100%;
		height: 100vh;
		background: url(../../static/image/bg.jpg) no-repeat 100% 100%;
		overflow: hidden;

		.idetify-title {
			font-size: 64rpx;
			color: #FFFFFF;
			margin-top: 300rpx;
			text-align: center;
		}

		.identify-contnet {
			margin-top: 80rpx;
			display: flex;
			justify-content: center;

			.identify-box {
				width: 220rpx;
				height: 220rpx;
				text-align: center;
				line-height: 220rpx;
				font-size: 48rpx;
				color: #2459A6;
				border-radius: 50%;
				background: #BEDFF2;

				&:first-child {
					margin-right: 40rpx;
				}
			}
		}
	}
</style>
