<template>
	<view class="list">
		<view class="list-check">
			<!-- status 1待分配 2已分配且未完成 3付款完成 -->
			<view :class="['list-check-box',active==1?'active':'']" @click="changeStatus(1)">待分配</view>
			<view :class="['list-check-box',active==2?'active':'']" @click="changeStatus(2)">已分配</view>
			<view :class="['list-check-box',active==3?'active':'']" @click="changeStatus(3)">已完成</view>
		</view>

		<view class="search-main">
			<view class="search-wrapper">
				<input class="search-input" placeholder="请输入员工id" @input="getInput($event,'staff_id')" />
			</view>

			<view class="search-wrapper">
				<input class="search-input" placeholder="请输入客户id" @input="getInput($event,'member_id')" />
			</view>

			<view class="search-wrapper">
				<input class="search-input" placeholder="请输入车牌号id" @input="getInput($event,'vehicle_id')" />
			</view>

			<view class="search-wrapper">
				<input class="search-input" placeholder="请输入订单号" @input="getInput($event,'order_no')" />
			</view>

			<view class="type-wrapper">
				<view class="type-title">选择订单类型</view>
				<radio-group class="radio-wrapper" @change="radioChange">
					<label class="label-wrapper" v-for="(item, index) in order_type" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>

			<view class="time-wrapper">
				<view class="time-title">选择时间：</view>
				<view class="time-btn">
					{{time}}
					<picker class="time-picker" mode="date" value="" fields="month" :start="startDate" :end="endDate" @change="bindTimeChange">
						<view class="time-text">{{time}}</view>
					</picker>
				</view>
			</view>

			<view class="search-submit" @click="getListData">
				点击查询
				<img src="../../../static/image/search.png" alt="">
			</view>
		</view>

		<view class="list-main">
			<view class="list-box-nodata" v-if="listData&&listData.length==0">
				<image src="../../../static/image/nodata.png" mode=""></image>
				<text class="list-nodata">暂无订单</text>
			</view>

			<view class="list-box" v-if="listData&&listData.length>0">
				<scroll-view scroll-y="true" enable-flex="true" class="scroll-wrapper" @scrolltolower="getNext">
					<div class="list-scroll-content">
						<div class="list-scroll-box" v-for="(item,index) in listData" :key="index">
							<view :class="['list-order-no',item.order_type==1?'':'carry']">{{item.order_type==1?'预约单号':'承接单号'}}：
								<text class="list-order-no-num">{{item.order_no}}</text>
							</view>
							<view class="list-order-wrapper">
								<view class="list-order-important">订单价格：{{item.order_money}}</view>
								<view class="list-order-important">订单时间：{{format(item.order_delivery_time)}}</view>
								<view class="list-order-common">订单评分：{{item.comment_num}}</view>
								<view class="list-order-common">客户姓名：{{item.member_name}}</view>
								<view class="list-order-common">员工姓名：{{item.staff_name}}</view>
								<view class="list-order-common">车牌号：{{item.vehicle_number}}</view>
								<view class="list-order-common">评论分数：{{item.comment_num}}</view>
								<view class="list-order-common">订单里程：{{item.maintenance_mileage_number}}</view>
								<view class="list-order-common list-order-location">定位信息：{{item.order_address}}</view>
							</view>
						</div>
					</div>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import apiUrl from '@/static/js/api.js'
	import {
		getDate,
		formatDate
	} from '@/static/js/util.js'
	export default {
		data() {
			return {
				active: 1,
				listData: null,
				limit: 5,
				pageIndex: 1,
				total: 0,
				identify: '',
				status: 1,
				order_type: [{
					name: '预约单号',
					value: 1
				}, {
					name: '承接单号',
					value: 2
				}],
				current: -1,
				staff_id: '',
				member_id: '',
				vehicle_id: '',
				time: '',
				order_no: ''
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
			},
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			}
		},
		onLoad: function(option) {
			if (option) {
				this.identify = parseInt(option.type)
			}
		},
		created() {
			// let date = new Date()
			// let year = date.getFullYear();
			// let month = date.getMonth() + 1;
			// this.time = year + '-' + month
		},
		mounted() {

		},
		onShow() {
			this.init()
			this.getListData()
		},
		methods: {
			format(date){
				return formatDate(parseInt(date)*1000)
			},
			init() {
				this.listData = null
				this.pageIndex = 1
				this.total = 0
			},
			getListData(status) {
				const that = this
				// page	否	int	第几页
				// page_num	否	int	页数
				// staff_id	否	int	员工id
				// member_id	否	int	客户id
				// vehicle_id	否	int	车牌号id
				// status	否	int	订单状态 其他一样 多个5：评论过
				// type	否	int	订单种类 1预约单 2承修单
				// time	否	string	年月
				// order_no	否	string	订单号
				let post_data = {
					'page': that.pageIndex,
					'page_num': that.limit,
					'staff_id': that.staff_id,
					'member_id': that.member_id,
					'vehicle_id': that.vehicle_id,
					'status': that.status,
					'type': that.current==-1?'':that.order_type[that.current].value,
					'time': that.time,
					'order_no': that.order_no
				}
				if (status == 'no') {
					post_data.order_status = 2
				}
				this.$http('/wechat_api/admin/orders', post_data).then(res => {
					if (res.data.code === 0) {
						that.total = res.data.data.count
						if (that.listData && that.listData.length > 0) {
							that.listData = [...that.listData, ...res.data.data.list]
						} else {
							that.listData = res.data.data.list || []
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
			changeStatus(status) {
				this.active = status
				this.status = status
				this.pageIndex = 1
				this.listData = null
				this.getListData()
			},
			getInput(e, str) {
				this[str] = e.detail.value
				console.log('this[str]', this[str])
			},
			radioChange(e) {
				console.log('e', e)
				this.current = parseInt(e.detail.value)
			},
			bindTimeChange(e) {
				this.time = e.detail.value
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

		.search-main {
			display: flex;
			padding: 0 20rpx;
			flex-wrap: wrap;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #000;

			.search-wrapper {
				flex: 0 0 50%;
				display: flex;
				height: 80rpx;
				align-items: center;
				box-sizing: border-box;
				margin-top: 20rpx;
				padding: 0 10rpx;

				.search-input {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 10rpx;
					border: 1rpx solid #433cad;
					padding: 0 10rpx;
				}
			}

			.type-wrapper {
				flex: 0 0 100%;
				display: flex;
				height: 80rpx;
				align-items: center;
				margin-top: 20rpx;

				.radio-wrapper {
					display: flex;

					.label-wrapper {
						display: flex;
						align-items: center;
						margin-left: 20rpx;
					}
				}
			}

			.time-wrapper {
				flex: 0 0 50%;
				height: 80rpx;
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				.time-title {
					height: 80rpx;
					display: flex;
					align-items: center;
				}

				.time-btn {
					width: 180rpx;
					height: 80rpx;
					line-height: 80rpx;
					position: relative;
					background:#768cfb;
					text-align: center;
					border-radius: 16rpx;

					.time-picker {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						opacity: 0;

						.time-text {
							height: 80rpx;
							line-height: 80rpx;
						}
					}
				}
			}

			.search-submit {
				flex: 0 0 50%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #5cb85c;
				margin-top: 20rpx;
				font-size: 36rpx;
				border-radius: 40rpx;

				img {
					width: 44rpx;
					height: 44rpx;
					margin-left: 10rpx;
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
							
							.list-order-wrapper {
								display: flex;
								flex-wrap: wrap;
								
								.list-order-important{
									line-height: 70rpx;
									flex: 0 0 50%;
									box-sizing: border-box;
									padding-right: 10rpx;
								}
								
								.list-order-common {
									color: #999999;
									line-height: 60rpx;
									flex: 0 0 50%;
									box-sizing: border-box;
									padding-right: 10rpx;
									
									&.list-order-location {
										flex: 1;
									}
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
