<template>
	<view class="list">
		<view class="list-check">
			<!-- status 1待分配 2已分配切未完成 3付款完成 -->
			<view :class="['list-check-box',active==1?'active':'']" @click="changeStatus(1)">待分配</view>
			<view :class="['list-check-box',active==2?'active':'']" @click="changeStatus(2)">已分配</view>
			<view :class="['list-check-box',active==3?'active':'']" @click="changeStatus(3)">已完成</view>
		</view>

		<view class="list-main">
			<view class="list-box-nodata" v-if="listData&&listData.length==0">
				<image src="../../static/image/nodata.png" mode=""></image>
				<text class="list-nodata">暂无订单</text>
			</view>

			<view class="list-box" v-if="listData&&listData.length>0">
				<scroll-view scroll-y="true" enable-flex="true" class="scroll-wrapper" @scrolltolower="getNext">
					<div class="list-scroll-content">
						<div class="list-scroll-box" v-for="(item,index) in listData" :key="index">
							<view :class="['list-order-no',item.order_type==1?'':'carry']">{{item.order_type==1?'预约单号':'承接单号'}}：
								<text class="list-order-no-num">{{item.order_no}}</text>
							</view>
							<view class="list-order-time">订单时间：{{item.order_add_time}}</view>
							<view class="list-member-name">车主姓名：{{item.member_name}}</view>
							<view class="list-next-oil">下次换油日期：{{item.next_oil_change_time}}</view>
							<view class="list-box-btn">
								<view class="list-order-time">订单状态：{{item.order_status==1?'待分配':item.order_status==2?'已分配':item.order_status==3?'已支付':''}}</view>
							</view>
						</div>
					</div>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<!-- page	否	int	第几页           
page_num	否	int	页数
staff_id	否	int	员工id
member_id	否	int	客户id
vehicle_id	否	int	车牌号id
status	否	int	订单状态 其他一样 多个5：评论过
type	否	int	订单种类 1预约单 2承修单
time	否	string	年月
order_no	否	string	订单号 -->

<script>
	import apiUrl from '@/static/js/api.js'
	export default {
		data() {
			return {
				active: 1,
				listData: null,
				limit: 5,
				pageIndex: 1,
				total: 0,
				identify: '',
				status:1
			}
		},
		computed: {
			type() {
				let result = ''
				if (this.identify == '') {
					result = this.$store.state.type
				} else {
					result = this.identify
				}
				return result
			},
			maxIndex() {
				return Math.ceil(this.total / this.limit)
			}
		},
		onLoad: function(option) {
			if (option) {
				this.identify = parseInt(option.type)
			}
		},
		mounted() {

		},
		onShow() {
			this.init()
			this.getListData()
		},
		methods: {
			init() {
				this.listData = null
				this.pageIndex = 1
				this.total = 0
			},
			// jumpToDetail(e, id, status, index) {
			// 	e.stopPropagation()
			// 	let url = ''
			// 	if (id) {
			// 		let order_info = {}
			// 		order_info.settle_time = this.listData[index].settle_time
			// 		order_info.staff_name = this.listData[index].staff_name
			// 		order_info.order_type = this.listData[index].order_type
			// 		order_info.order_no = this.listData[index].order_no
			// 		let tmp_order_info = encodeURIComponent(JSON.stringify(order_info))
			// 		url = `/pages/index/index?order_no=${id}&status=${status}&order_info=${tmp_order_info}`
			// 	} else {
			// 		url = "/pages/index/index"
			// 	}
			// 	uni.navigateTo({
			// 		url
			// 	})
			// },
			getListData(status) {
				const that = this
				let post_data = {
					'limit': that.limit,
					'page': that.pageIndex,
					'type': that.type,
					'member_id': that.$store.state.member_id
				}
				if (status == 'no') {
					post_data.order_status = 2
				}
				this.$http('/wechat_api/admin/orders', post_data).then(res => {
					// if (res.data.code === 0) {
					// 	that.total = res.data.data.count
					// 	if (that.listData && that.listData.length > 0) {
					// 		that.listData = [...that.listData, ...res.data.data.order_list]
					// 	} else {
					// 		that.listData = res.data.data.order_list || []
					// 	}
					// }
					that.total = 1
					that.listData = [{
						comment_num: 0,
						labor_cost: null,
						maintenance_mileage_number: 123,
						member_id: 12,
						member_name: "xubu",
						next_oil_change_time: "2021-01-25",
						order_add_time: "2021-01-25",
						order_address: "上海市上海市",
						order_delivery_time: 1611540000,
						order_id: 1,
						order_img: "",
						order_latitude: "31.14979",
						order_longitude: "121.12426",
						order_money: "60.00",
						order_no: "20210125104544768315",
						order_status: 1,
						order_type: 1,
						order_update_time: null,
						settle_time: null,
						staff_id: null,
						staff_name: null,
					}]
				})
			},
			getNext() {
				if (this.pageIndex < this.maxIndex) {
					this.pageIndex++
				} else {
					return false
				}
				this.getListData()
			},
			changeStatus(status) {
				this.active = status
				this.pageIndex = 0
				this.listData = null
				this.getListData()
			}
		}
	}
</script>

<style scoped lang="less">
	.list {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.swiper {
			width: 100%;
			height: 300rpx;

			.swiper-item {
				width: 100%;
				height: 300rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.list-check {
			display: flex;
			flex-basis: 80rpx;

			.list-check-box {
				flex: 1;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				background: #C8C7CC;
				color: #000000;
				border-right: 2rpx solid #808080;

				&:last-child {
					border-right: none;
				}

				&.active {
					background: #1357a1;
					color: #FFFFFF;
				}
			}
		}

		.list-main {
			flex: 1;
			overflow: hidden;

			.list-box {
				width: 100%;
				height: 100%;

				.scroll-wrapper {
					width: 100%;
					height: 100%;
					padding: 20rpx 0;

					.list-scroll-content {
						padding: 0 40rpx;

						.list-scroll-box {
							margin-bottom: 60rpx;
							font-size: 32rpx;
							color: #000000;

							.list-order-no {
								position: relative;
								line-height: 80rpx;
								margin-bottom: 20rpx;
								color: #4CD964;
								border-bottom: 1rpx solid #d9d6dd;

								&.carry {
									color: #DD524D;
								}

								&::before {
									display: block;
									content: '';
									width: 4rpx;
									height: 44rpx;
									background: #ff7029;
									position: absolute;
									left: -20rpx;
									top: 18rpx;
								}

								.list-order-no-num {
									color: #000000;
								}
							}

							.list-order-time,
							.list-member-name {
								line-height: 70rpx;
							}

							.list-next-oil {
								color: #999999;
								line-height: 60rpx;
							}

							.list-box-btn {
								height: 60rpx;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.list-order-time {
									color: #999999;
								}

								.list-pay {
									width: 120rpx;
									height: 60rpx;
									text-align: center;
									line-height: 60rpx;
									border-radius: 30rpx;
									background-color: #007AFF;
									color: #FFFFFF;
								}
							}
						}
					}
				}
			}

			.list-box-nodata {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				image {
					width: 392rpx;
					height: 256rpx;
				}

				.list-nodata {
					font-size: 36rpx;
					margin-top: 16rpx;
					color: #2d2525;
				}
			}
		}

		.list-add {
			flex-basis: 180rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.list-add-new {
				width: 160rpx;
				height: 160rpx;
			}
		}
	}
</style>
