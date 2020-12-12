<template>
	<view class="login">
		<view class="login-logo">
			<image src="../../static/image/logo.png"></image>
		</view>
		<view class="login-box">
			<image src="../../static/image/user.png"></image>
			<input type="number" v-model="phone" @blur="doJudge('phone')" placeholder="请输入电话号码">
			<view class="error" v-if="phoneError">电话号码有误</view>
		</view>
		<!-- <view class="login-box">
			<image src="../../static/image/password.png"></image>
			<input type="number" v-model="password" @blur="doJudge('pass')" placeholder="请输入密码">
			<view class="error" v-if="passwordError">密码有误</view>
		</view> -->
		<view class="login-btn" @click="handleBind">
			绑定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				phoneError: false,
				password: '',
				passwordError: false,
				identify: 1,
			}
		},
		onLoad: function(option) {
			console.log('option', option)
			if (option) {
				this.identify = parseInt(option.type)
			}
		},
		methods: {
			handleBind() {
				const _this = this
				if (!_this.judgePhone(_this.phone)) {
					_this.phoneError = true
					return false
				} else {
					_this.phoneError = false
				}
				// if (!_this.judgePassword(_this.phone, _this.password)) {
				// 	_this.passwordError = true
				// 	return false
				// } else {
				// 	_this.passwordError = false
				// }
				if (!_this.phoneError) {
					wx.request({
						url: 'http://qx.51zhengrui.com/wechat_api/login/login',
						data: {
							openid: _this.$store.state.openid,
							type: _this.identify,
							phone: _this.phone
						},
						header: {
							'content-type': 'application/json'
						},
						success(res) {
							if (res.data.code == 0) {
								_this.$store.commit('setToken', res.data.data)
								uni.navigateTo({
									url: "/pages/index/index",
									success: () => {
										_this.phone = ''
										_this.phoneError = false
										// _this.password = ''
										// _this.passwordError = false
									}
								})
							} else {
								uni.showToast({
									icon:'none',
									title: res.data.msg,
									duration: 2000
								});
							}
						},
						fail(err) {

						}
					})
				}
			},
			doJudge(str) {
				switch (str) {
					case 'phone':
						if (!this.judgePhone(this.phone)) {
							this.phoneError = true
						} else {
							this.phoneError = false
						}
						break;
					case 'pass':
						if (!this.judgePassword(this.phone, this.password)) {
							this.passwordError = true
						} else {
							this.passwordError = false
						}
						break;
				}
			},
			judgePhone(str) {
				let mobileReg = new RegExp(/^1[3456789]\d{9}$/)
				let result = false
				if (mobileReg.test(str)) {
					result = true
				}
				return result
			},
			judgePassword(num, num2) {
				let pass = num.toString()
				let result = false
				pass = pass.substring(pass.length - 6)
				if (num2.toString() == pass) {
					result = true
				} else {
					result = false
				}
				return result
			}
		}
	}
</script>

<style scoped lang="less">
	.login {
		padding: 0 80rpx;

		.login-logo {
			width: 240rpx;
			height: 240rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2rpx solid #219DFF;
			margin: 150rpx auto 0 auto;

			image {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.login-box {
			height: 80rpx;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			margin-top: 50rpx;
			border: 1rpx solid #219DFF;
			padding: 0 20rpx;
			position: relative;

			image {
				display: block;
				width: 32rpx;
				height: 32rpx;
				flex-basis: 32rpx;
			}

			input {
				flex: 1;
				margin-left: 20rpx;
			}

			.error {
				font-size: 24rpx;
				color: red;
				line-height: 24rpx;
				position: absolute;
				left: 20rpx;
				bottom: -32rpx;
			}
		}

		.login-btn {
			height: 80rpx;
			border-radius: 40rpx;
			background: #219DFF;
			;
			margin-top: 50rpx;
			text-align: center;
			line-height: 80rpx;
			color: #FFFFFF;
		}
	}
</style>
