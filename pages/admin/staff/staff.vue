<template>
	<view class="staff">
		<view class="staff-box" v-for="(item,index) in staffList" :key="index" @click="jumpPerformance(item.staff_id)">{{item.staff_name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffList: [{
						staff_id: 1,
						staff_name: '李白1'
					},
					{
						staff_id: 2,
						staff_name: '李白2'
					},
					{
						staff_id: 3,
						staff_name: '李白3'
					}, {
						staff_id: 4,
						staff_name: '李白4'
					},
					{
						staff_id: 5,
						staff_name: '李白5'
					},
					{
						staff_id: 6,
						staff_name: '李白6'
					}
				]
			}
		},
		methods: {
			getStaffList() {
				this.$http('/wechat_api/admin/staffs', {}).then(res => {
					console.log(123, res)
				})
			},
			jumpPerformance(id){
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

<style>

</style>
