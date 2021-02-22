<template>
	<view class="staff" v-if="staffList.length>0">
		<view class="staff-box" v-for="(item,index) in staffList" :key="index" @click="jumpPerformance(item.staff_id,item.staff_name)">{{item.staff_name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffList: [],
				order_no:''
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
			jumpPerformance(id,name) {
				const _this=this
				console.log('18706668888',_this.order_no)
				if(_this.order_no==''){
					uni.navigateTo({
						url: `/pages/admin/performance/performance?id=${id}`,
						success: () => {}
					})
				}
				else{
					uni.showModal({
					    title: '提示',
					    content: `是否确认分配给${name}`,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								_this.$http('/wechat_api/admin/assignStaff', {
									'order_no':_this.order_no,
									'staff_id':id
								}).then(res => {
									if (res.data.code === 0) {
										uni.showToast({
											icon: 'none',
											title: '分配成功',
											duration: 1000,
											mask: true,
											success: () => {
												setTimeout(function() {
													uni.navigateBack({
													    delta: 1
													});
												}, 1000)
											}
										});
									}
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			}
		},
		onLoad: function(option) {
			console.log('option',option)
			if (Object.keys(option).length > 0) {
				this.order_no = option.order_no
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
			font-size: 40rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #bdd6f5;
			color: #000;
			text-align: center;
			padding: 0 40rpx;
			border-bottom: 4rpx solid #FFFFFF;
		}
	}
</style>
