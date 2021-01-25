<template>
	<view>
		<picker mode="date" value="" fields="month" :start="startDate" :end="endDate" @change="bindNextChange">
			<view class="hide-pick-time">下次换油日期</view>
		</picker>
		{{time}}
	</view>
</template>

<script>
	import {
		getDate
	} from '@/static/js/util.js'
	export default {
		computed: {
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			}
		},
		data() {
			return {
				id: '',
				time: '',
				performanceList:[]
			}
		},
		onLoad: function(option) {
			if (option) {
				this.id = parseInt(option.id)
			}
		},
		created() {
			let date = new Date()
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			this.time = year + '-' + month
		},
		methods: {
			// *int      staff_id       员工id
			// *string   staff_name     员工名
			// *int      order_num      订单数量
			// *int      all_money      订单总价 
			// *int      comment_num    订单平均分
			getPerformance() {
				this.$http('/wechat_api/admin/staffMoney', {
					staff_id: '',
					time: ''
				}).then(res => {
					console.log(123, res)
					this.performanceList = [
						{
							staff_id:1,
							staff_name:'李白',
							order_num:100,
							all_money:3000,
							comment_num:60
						}
					]
				})
			},
			bindNextChange(e) {
				console.log('e', e)
				this.time = e.detail.value
			},
		}
	}
</script>

<style>

</style>
