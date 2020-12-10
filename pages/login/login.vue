<template>
	<div class="login">
		<view class="login-logo">
			<image src="../../static/image/logo.png"></image>
		</view>
		<div class="login-box">
			<image src="../../static/image/car.png"></image>
			<input type="text" placeholder="请输入车牌号">
		</div>
		<div class="login-box">
			<image src="../../static/image/user.png"></image>
			<input type="number" placeholder="请输入电话号码">
		</div>
		<div class="login-box">
			<image src="../../static/image/password.png"></image>
			<input type="number" placeholder="请输入密码">
		</div>
		<div class="login-btn">
			登录
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style scoped lang="less">
	.login {
		padding:0 80rpx;
		
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
			margin-top: 40rpx;
			border: 1rpx solid #219DFF;
			padding: 0 10rpx;
			
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
		}
		.login-btn {
			
		}
	}
</style>
