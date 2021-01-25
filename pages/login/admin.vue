<template>
	<view class="login">
		<view class="login-logo">
			<image src="../../static/image/logo.png"></image>
		</view>
		<view class="login-box">
			<image src="../../static/image/user.png"></image>
			<input type="number" v-model="phone" placeholder="请输入账号">
		</view>
		<view class="login-box">
			<image src="../../static/image/password.png"></image>
			<input type="number" v-model="password" placeholder="请输入密码">
		</view>
		<view class="login-btn" @click="handleLogin">
			登录
		</view>
	</view>
</template>

<script>
	import apiUrl from '@/static/js/api.js'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				identify: 3,
			}
		},
		onLoad: function(option) {
			if (option) {
				this.identify = parseInt(option.type)
			}
		},
		methods: {
			handleLogin(){
				// uni.showToast({
				// 	icon:'none',
				// 	title: res.data.msg,
				// 	duration: 2000
				// });
				uni.navigateTo({
					url: "/pages/admin/index/index",
					success: () => {
						this.$store.commit('setToken', 'd0237f13added75e770735d82513f5c0')
					}
				})
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
