<template>
	<view class="admin">
		<view class="admin-btn" @click="jumpOrder">订单管理</view>
		<view class="admin-btn" @click="jumpStaff">员工统计</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			jumpOrder(){
				uni.navigateTo({
					url:'/pages/admin/order/order'
				})
			},
			jumpStaff(){
				uni.navigateTo({
					url:'/pages/admin/staff/staff'
				})
			},
		}
	}
</script>

<style scoped lang="less">
.admin {
	width: 100%;
	height: 100vh;
	background: #e0e6ea;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.admin-btn {
		width: 70%;
		height: 120rpx;
		margin-bottom: 60rpx;
		background: #3e7bd6;
		font-size: 40rpx;
		text-align: center;
		color: #fff;
		border-radius: 40rpx;
		line-height: 120rpx;
		
		&:first-child {
			margin-top: 400rpx;
		}
	}
}
</style>
