<template>
	<view class="login">
		<view :class="['login-logo',identify==1?'is-user':'']">
			<image src="../../static/image/logo.png"></image>
		</view>
		<view class="login-box">
			<image src="../../static/image/login/p1.png"></image>
			<input type="number" v-model="phone" @blur="doJudge('phone')" placeholder="请输入电话号码">
			<view class="error" v-if="phoneError">电话号码有误</view>
		</view>

		<template v-if="identify==1">
			<view class="login-box">
				<image src="../../static/image/user.png"></image>
				<input type="number" v-model="username" placeholder="请输入用户名">
			</view>
			<view class="login-box">
				<image src="../../static/image/login/car2.png"></image>
				<input type="number" v-model="v_num" placeholder="请输入车牌号">
			</view>
			<view class="login-box">
				<image src="../../static/image/login/car1.png"></image>
				<text v-if="vid" class="car-number-name">{{carArray[carIndex].name}}</text>
				<text v-else class="car-number">请选择车型号</text>
				<picker class="car-pick" :value="carIndex" :range="carArray" range-key="name" @change="bindCarChange">
					<view class="car-pick-text">车型</view>
				</picker>
			</view>
			<view class="login-box">
				<image src="../../static/image/login/company2.png"></image>
				<input type="number" v-model="company" placeholder="请输入公司名(选填)">
			</view>
		</template>
		<view class="login-btn" @click="handleBind">
			绑定
		</view>
	</view>
</template>

<script>
	import apiUrl from '@/static/js/api.js'
	export default {
		data() {
			return {
				phone: '',
				phoneError: false,
				password: '',
				passwordError: false,
				identify: 1,
				username: '',
				v_num: '',
				vid: '',
				company: '',
				carArray: [],
				carIndex: 0
			}
		},
		onLoad: function(option) {
			console.log('option', option)
			if (option) {
				this.identify = parseInt(option.type)
			}
		},
		created() {
			this.getCarList()
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
				if(this.identify==1){
					if (_this.username == '') {
						uni.showToast({
							icon: 'none',
							title: '用户名不能为空',
							duration: 2000
						});
						return
					}
					if (_this.v_num == '') {
						uni.showToast({
							icon: 'none',
							title: '车牌号不能为空',
							duration: 2000
						});
						return
					}
					if (_this.vid == '') {
						uni.showToast({
							icon: 'none',
							title: '车型不能为空',
							duration: 2000
						});
						return
					}
				}
				
				let postData = {
					openid: _this.$store.state.openid,
					type: _this.identify,
					phone: _this.phone,
				}
				
				if(this.identify==1){
					postData = {
						openid: _this.$store.state.openid,
						type: _this.identify,
						phone: _this.phone,
						username: _this.username,
						v_num: _this.v_num,
						vid: _this.vid,
						company: _this.company
					}
				}
				if (!_this.phoneError) {
					wx.request({
						url: apiUrl + '/wechat_api/login/login',
						data: postData,
						header: {
							'content-type': 'application/json'
						},
						success(res) {
							if (res.data.code == 0) {
								console.log('token', res.data.data.token)
								_this.$store.commit('setToken', res.data.data.token)
								_this.$store.commit('setMember', res.data.data.member_id)
								let tmp_url = "/pages/list/list"
								if (_this.identify === 3) {
									tmp_url = "/pages/admin/index/index"
								}
								uni.navigateTo({
									url: tmp_url,
									success: () => {
										_this.phone = ''
										_this.phoneError = false
										_this.username = ''
										_this.v_num = ''
										_this.vid = ''
										_this.company = ''
									}
								})
							} else {
								uni.showToast({
									icon: 'none',
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
			},
			getCarList() {
				this.$http('/wechat_api/login/getVTypes', {}).then(res => {
					if (res.data.code === 0) {
						this.carArray = res.data.data
					}
				})
			},
			bindCarChange(e) {
				console.log(123321, e)
				this.carIndex = e.detail.value
				this.vid = this.carArray[this.carIndex].id
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

			&.is-user {
				margin: 40rpx auto 0 auto;
			}

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

			.car-number {
				color: grey;
				margin-left: 20rpx;
			}

			.car-number-name {
				margin-left: 20rpx;
			}

			.car-pick {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;

				.car-pick-text {
					height: 80rpx;
					line-height: 90rpx;
				}
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
