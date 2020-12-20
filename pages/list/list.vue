<template>
	<view class="list">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
		 v-if="imageList.length>0">
			<swiper-item v-for="(item,index) in imageList" :key="index">
				<view class="swiper-item">
					<image :src="item.rotation_chart_url"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="list-check" v-if="type==2">
			<view :class="['list-check-box',active==1?'active':'']" @click="getAll">全部订单</view>
			<view :class="['list-check-box',active==2?'active':'']" @click="getNoDone">未完成</view>
		</view>

		<view class="list-main">
			<view class="list-box-nodata" v-if="listData&&listData.length==0">
				<image src="../../static/image/nodata.png" mode=""></image>
				<text class="list-nodata">暂无订单</text>
			</view>

			<view class="list-box" v-if="listData&&listData.length>0">
				<scroll-view scroll-y="true" enable-flex="true" class="scroll-wrapper" @scrolltolower="getNext">
					<div class="list-scroll-content">
						<div class="list-scroll-box" v-for="(item,index) in listData" :key="index" @click="jumpToDetail(item.order_no,item.order_status)">
							<view :class="['list-order-no',item.order_type==1?'':'carry']">{{item.order_type==1?'预约单号':'承接单号'}}：
							<text class="list-order-no-num">{{item.order_no}}</text>
							</view>
							<view class="list-order-time">订单时间：{{item.order_add_time}}</view>
							<view class="list-member-name">车主姓名：{{item.member_name}}</view>
							<view class="list-next-oil">下次换油日期：{{item.next_oil_change_time}}</view>
							<view class="list-box-btn">
								<view class="list-order-time">订单状态：{{item.order_status==1?'待分配':item.order_status==2?'已分配':item.order_status==3?'已支付':''}}</view>
								<view class="list-pay" v-if="item.order_status==2 && type==1">支付</view>
							</view>
						</div>
					</div>
				</scroll-view>
			</view>
		</view>

		<view class="list-add" v-if="type==1" @click="jumpToDetail()">
			<image class="list-add-new" src="../../static/image/new.png"></image>
		</view>
	</view>
</template>

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
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				imageList: []
			}
		},
		computed: {
			type() {
				return this.$store.state.type
			},
			maxIndex() {
				return Math.ceil(this.total / this.limit)
			}
		},
		mounted() {
			this.getImageList()
			this.getListData()
		},
		methods: {
			jumpToDetail(id, status) {
				console.log('id', id)
				let url = ''
				if (id) {
					url = `/pages/index/index?order_no=${id}&status=${status}`
				} else {
					url = "/pages/index/index"
				}
				uni.navigateTo({
					url
				})
			},
			getListData(status) {
				const that = this
				let post_data = {
					'limit': that.limit,
					'page': that.pageIndex,
					'type': that.$store.state.type,
					'member_id': that.$store.state.member_id
				}
				if (status == 'no') {
					post_data.order_status = 2
				}
				this.$http('/wechat_api/order/order_list', post_data).then(res => {
					if (res.data.code === 0) {
						that.total = res.data.data.count
						if (that.listData && that.listData.length > 0) {
							that.listData = [...that.listData, ...res.data.data.order_list]
						} else {
							that.listData = res.data.data.order_list || []
						}
					}
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
			getAll() {
				this.active = 1
				this.pageIndex = 0
				this.listData = null
				this.getListData()
			},
			getNoDone() {
				this.active = 2
				this.pageIndex = 0
				this.listData = null
				this.getListData('no')
			},
			getImageList() {
				const _this = this
				this.$http('/wechat_api/login/get_rotation_chart_list', {}).then(res => {
					console.log('lunbo', res)
					if (res.data.code === 0) {
						if (res.data.data && res.data.data.length > 0) {
							res.data.data.forEach(item => {
								item.rotation_chart_url = apiUrl + item.rotation_chart_url
							})
						}
						_this.imageList = res.data.data
					}
				})
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

				&:first-child {
					border-right: 2rpx solid #808080;
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
