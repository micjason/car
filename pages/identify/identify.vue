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
			<div class="identify-box" @click="login(3)">
				管理员
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
					_this.$http('/wechat_api/login/login', {
						openid: _this.$store.state.openid,
						type,
					}).then(res => {
						if (res.data.code == 0) {
							_this.$store.commit('setToken', res.data.data.token)
							_this.$store.commit('setMember', res.data.data.member_id)
							let tmp_url = `/pages/list/list?type=${type}`
							if(type===3){
								tmp_url = `/pages/admin/index/index?type=${type}`
							}
							uni.navigateTo({
								url: tmp_url,
								success: () => {
									_this.$store.commit('setType', type)
								}
							})
						} else if (res.data.code == -2) {
							uni.navigateTo({
								url: `/pages/login/login?type=${type}`,
								success: () => {
									_this.$store.commit('setType', type)
								}
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg || '服务器异常',
								duration: 2000
							});
						}
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: '服务器异常',
							duration: 2000
						});
					})
				} else {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							if (loginRes.code) {
								_this.$http('/wechat_api/login/get_openid', {
									code: loginRes.code
								}).then(res => {
									_this.$store.commit('setOpenid', JSON.parse(res.data.data).openid)
									_this.$http('/wechat_api/login/login', {
										openid: _this.$store.state.openid,
										type,
									}).then(res2 => {
										if (res2.data.code == 0) {
											_this.$store.commit('setToken', res2.data.data.token)
											_this.$store.commit('setMember', res2.data.data.member_id)
											
											let tmp_url = `/pages/list/list?type=${type}`
											if(type===3){
												tmp_url = `/pages/admin/index/index?type=${type}`
											}
											uni.navigateTo({
												url: tmp_url,
												success: () => {
													_this.$store.commit('setType', type)
												}
											})
										} else if (res2.data.code == -2) {
											uni.navigateTo({
												url: `/pages/login/login?type=${type}`,
												success: () => {
													_this.$store.commit('setType', type)
												}
											})
										} else {
											uni.showToast({
												icon: 'none',
												title: res2.data.msg,
												duration: 2000
											});
										}
									})
								})
							}
						}
					});
				}
			},
			jumpAdmin(type){
				uni.navigateTo({
					url: `/pages/login/admin?type=${type}`,
					success: () => {
						this.$store.commit('setType', type)
					}
				})
			}
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
				width: 200rpx;
				height: 200rpx;
				text-align: center;
				line-height: 200rpx;
				font-size: 48rpx;
				color: #2459A6;
				border-radius: 50%;
				background: #BEDFF2;
				margin-right: 40rpx;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>
