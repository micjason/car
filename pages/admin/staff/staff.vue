<template>
	<view class="staff" v-if="staffList.length>0">
		<view class="staff-box" v-for="(item,index) in staffList" :key="index" @click="jumpPerformance(item.staff_id)">{{item.staff_name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffList: []
			}
		},
		methods: {
			getStaffList() {
				this.$http('/wechat_api/admin/staffs', {}).then(res => {
					if(res.data.code===0){
						this.staffList = res.data.data
					}
				})
			},
			jumpPerformance(id) {
				uni.navigateTo({
					url: `/pages/admin/performance/performance?id=${id}`,
					success: () => {}
				})
			}
		},
		mounted() {
			this.getStaffList()
		},
	}
</script>

<style scoped lang="less">
	.staff {
		padding: 40rpx 0;

		.staff-box {
			font-size: 36rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #1D82FE;
			color: #fff;
			text-align: center;
			padding: 0 40rpx;
			border-bottom: 4rpx solid #FFFFFF;
		}
	}
</style>
