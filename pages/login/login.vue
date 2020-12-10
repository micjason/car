<template>
	<div class="login">
		<view class="login-logo">
			<image src="../../static/image/logo.png"></image>
		</view>
		<div class="login-box">
			<image src="../../static/image/car.png"></image>
			<input type="text" v-model="carNumber" @blur="doJudge('car')" placeholder="请输入车牌号">
			<view class="error" v-if="carNumberError">车牌号有误</view>
		</div>
		<div class="login-box">
			<image src="../../static/image/user.png"></image>
			<input type="number" v-model="phone" @blur="doJudge('phone')" placeholder="请输入电话号码">
			<view class="error" v-if="phoneError">电话号码有误</view>
		</div>
		<div class="login-box">
			<image src="../../static/image/password.png"></image>
			<input type="number" v-model="password" @blur="doJudge('pass')" placeholder="请输入密码">
			<view class="error" v-if="passwordError">密码有误</view>
		</div>
		<div class="login-btn" @click="jumpToIndex">
			登录
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				carNumber: '',
				carNumberError: false,
				phone: '',
				phoneError: false,
				password: '',
				passwordError: false,
			}
		},
		methods: {
			jumpToIndex() {
				if (!this.cpyz(this.carNumber)) {
					this.carNumberError = true
					return false
				} else {
					this.carNumberError = false
				}
				if (!this.judgePhone(this.phone)) {
					this.phoneError = true
					return false
				} else {
					this.phoneError = false
				}
				if (!this.judgePassword(this.phone, this.password)) {
					this.passwordError = true
					return false
				} else {
					this.passwordError = false
				}
				if (!this.carNumberError && !this.phoneError && !this.passwordError) {
					uni.navigateTo({
						url: "/pages/index/index",
						success: () => {
							this.carNumber = ''
							this.carNumberError = false
							this.phone = ''
							this.phoneError = false
							this.password = ''
							this.passwordError = false
						},
						fail: (err) => {
							console.log("Error occured: ", err);
						},
					})
				}
			},
			doJudge(str) {
				switch (str) {
					case 'car':
						if (!this.cpyz(this.carNumber)) {
							this.carNumberError = true
						} else {
							this.carNumberError = false
						}
						break;
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
			cpyz(str) {
				let newcarnum = str.toUpperCase();
				let result = false
				let regExp =
					/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
				if (newcarnum != "") {
					if (regExp.test(newcarnum)) {
						result = true
					}
				}
				return result
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
