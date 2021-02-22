<template>
	<view class="performance">
		<view class="select-time">
			<view class="select-text">选择时间：</view>
			<view class="select-btn">
				{{time}}
				<picker class="select-date" mode="date" value="" fields="month" :start="startDate" :end="endDate" @change="bindNextChange">
					<view class="hide-pick-time">{{time}}</view>
				</picker>
				<view class="triangle"></view>
			</view>
		</view>

		<view class="performance-list" v-if="performanceList.length>0">
			<view class="performance-box performance-title">
				<view class='performance-common performance-staff_id'>员工id</view>
				<view class='performance-common performance-staff_name'>员工姓名</view>
				<view class='performance-common performance-order_num'>订单数量</view>
				<view class='performance-common performance-all_money'>订单总价</view>
				<view class='performance-common performance-comment_num'>订单平均分</view>
			</view>

			<view class="performance-box performance-main" v-for="(item,index) in performanceList" :key="index">
				<view class='performance-common performance-staff_id'>
					<view class="performance-text">{{item.staff_id}}</view>
				</view>
				<view class='performance-common performance-staff_name'>
					<view class="performance-text">{{item.staff_name}}</view>
				</view>
				<view class='performance-common performance-order_num'>
					<view class="performance-text">{{item.order_num}}</view>
				</view>
				<view class='performance-common performance-all_money'>
					<view class="performance-text">{{item.all_money}}</view>
				</view>
				<view class='performance-common performance-comment_num'>
					<view class="performance-text">{{item.comment_num}}</view>
				</view>
			</view>
		</view>
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
				time: '',
				performanceList: []
			}
		},
		onLoad: function() {
			
		},
		created() {
			let date = new Date()
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			this.time = year + '-' + month
		},
		mounted() {
			this.getPerformance()
		},
		methods: {
			// *int      staff_id       员工id
			// *string   staff_name     员工名
			// *int      order_num      订单数量
			// *int      all_money      订单总价 
			// *int      comment_num    订单平均分
			getPerformance() {
				this.$http('/wechat_api/admin/staffMoney', {
					time: this.time
				}).then(res => {
					if(res.data.code===0){
						this.performanceList = res.data.data
					}
					// this.performanceList = [{
					// 	staff_id: 1,
					// 	staff_name: '李白',
					// 	order_num: 100,
					// 	all_money: 3000,
					// 	comment_num: 60
					// },{
					// 	staff_id: 12,
					// 	staff_name: '李白李白李白李白李白李白李白李白',
					// 	order_num: 100,
					// 	all_money: 3000,
					// 	comment_num: 60
					// }]
				})
			},
			bindNextChange(e) {
				this.time = e.detail.value
				this.getPerformance()
			},
		}
	}
</script>

<style scoped lang="less">
	.performance {
		padding: 0 40rpx;

		.select-time {
			display: flex;
			align-items: center;
			font-size: 36rpx;
			height: 80rpx;
			line-height: 80rpx;

			.select-btn {
				position: relative;
				padding-right: 40rpx;

				.select-date {
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					width: 100%;
					height: 100%;
					z-index: 10;

					.hide-pick-time {
						line-height: 80rpx;
					}
				}
				
				.triangle{
					position: absolute;
					width: 0;
					height: 0;
					right: 0;
					top: 33rpx;
					border: 14rpx solid;
					border-color: #000 transparent transparent;
				}
			}
		}

		.performance-list {
			margin-top: 20rpx;
			border-top: 1rpx solid #1D82FE;

			.performance-box {
				display: flex;

				&.performance-title {
					font-size: 28rpx;
				}

				&.performance-main {
					font-size: 28rpx;
				}

				.performance-common {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 56rpx;
					padding: 14rpx 0;
					border-bottom: 1rpx solid #1D82FE;
					
					.performance-text {
						width: 100%;
						display: -webkit-box;
						-webkit-line-clamp:2;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						text-align: center;
						word-break: break-all;
					}

					&.performance-staff_id {
						flex: 0 0 15%;
					}

					&.performance-staff_name {
						flex: 0 0 20%;
					}

					&.performance-order_num {
						flex: 0 0 20%;
					}

					&.performance-all_money {
						flex: 0 0 20%;
					}

					&.performance-comment_num {
						flex: 0 0 25%;
					}
				}
			}
		}
	}
</style>
