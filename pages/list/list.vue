<template>
	<view class="list">
		<view class="list-check" v-if="type==2">
			<view class="list-check-box">全部订单</view>
			<view class="list-check-box">未完成</view>
		</view>

		<view class="list-main">
			<view class="list-box-nodata" v-if="listData&&listData.length==0">
				<image src="../../static/image/nodata.png" mode=""></image>
				<text class="list-nodata">暂无订单</text>
			</view>

			<view class="list-box" v-if="listData&&listData.length>0">
				<scroll-view scroll-y="true" enable-flex="true" class="scroll-wrapper" @scrolltolower="getNext">
					<div class="list-scroll-content">
						<div class="list-scroll-box" v-for="(item,index) in listData" :key="index" @click="jumpToDetail(item.order_no)">
							<view class="list-order-no">订单号：{{item.order_no}}</view>
							<view class="list-order-time">订单时间：{{item.order_add_time}}</view> <view class="list-member-name">车主姓名：{{item.member_name}}</view>
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
	export default {
		data() {
			return {
				listData: null,
				limit: 5,
				pageIndex: 1,
				total: 0
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
			this.getListData()
		},
		methods: {
			jumpToDetail(id) {
				console.log('id',id)
				let url = ''
				if(id){
					url=`/pages/index/index?order_no=${id}`
				}
				else{
					url= "/pages/index/index"
				}
				uni.navigateTo({
					url
				})
			},
			getListData() {
				const that = this
				wx.request({
					url: 'http://qx.51zhengrui.com/wechat_api/order/order_list',
					data: {
						limit: that.limit,
						page: that.pageIndex,
						type: that.$store.state.type,
						member_id: that.$store.state.member_id
					},
					header: {
						'token': this.$store.state.token,
						'content-type': 'application/json'
					},
					success(res) {
						if (res.data.code === 0) {
							that.total = res.data.data.count
							if (that.listData) {
								that.listData = [...that.listData, ...res.data.data.order_list]
							} else {
								that.listData = []
							}
						}
					},
					fail(err) {

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
				console.log(11, this.pageIndex, this.maxIndex)
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
				background: #1357a1;
				color: #FFFFFF;

				&:first-child {
					border-right: 2rpx solid #808080;
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
								border-bottom: 1rpx solid #d9d6dd;

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
