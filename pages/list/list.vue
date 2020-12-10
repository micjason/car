<template>
	<div class="list">
		<div class="list-box" v-for="(item,index) in listData" :key="index" @click="jumpToDetail">
			<view class="list-name list-common">
				<view class="list-common-left">维修项目：</view>
				<view class="list-common-right">{{item.name}}</view>
			</view>
			<view class="list-price list-common">
				<view class="list-common-left">维修金额：</view>
				<view class="list-common-right">{{item.price}}</view>
			</view>
			<view class="list-time">
				订单时间：{{item.time}}
			</view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				listData: [{
						name: '发动机定期保养,发动机定期保养,发动机定期保养',
						price: '200',
						time: '2020-12-11'
					},
					{
						name: '发动机定期保养',
						price: '200',
						time: '2020-12-11'
					},
					{
						name: '发动机定期保养',
						price: '200',
						time: '2020-12-11'
					}
				]
			}
		},
		methods: {
			jumpToDetail() {
				uni.navigateTo({
					url: "/pages/index/index",
					success: () => {

					},
					fail: (err) => {
						console.log("Error occured: ", err);
					},
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.list {
		padding: 40rpx;

		.list-box {
			padding: 16rpx;
			border: 1rpx solid #219DFF;
			margin-bottom: 40rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			line-height: 50rpx;

			.list-common {
				display: flex;

				.list-common-left {
					flex-basis: 140rpx;
				}

				.list-common-right {
					flex: 1
				}
			}

			.list-time {
				text-align: right;
			}
		}
	}
</style>
