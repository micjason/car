<template>
	<view class="content">
		<view class="input-box drak" v-if="Object.keys(memberInfo).length>0">
			<view class="input-box-cell">
				车主姓名：{{memberInfo.member_name||''}}
			</view>
			<view class="input-box-cell">
				车主电话：{{memberInfo.member_phone||''}}
			</view>
		</view>
		<view class="input-box light" v-if="Object.keys(memberInfo).length>0">
			<view class="input-box-cell">
				司机姓名：{{memberInfo.member_driver||''}}
			</view>
			<view class="input-box-cell">
				司机电话：{{memberInfo.member_driver_phone||''}}
			</view>
		</view>
		<view class="order-info" v-if="Object.keys(memberInfo).length>0">
			<view class="order-info-box" v-if="memberInfo.order_no">
				<view class="order-name">{{memberInfo.order_type==1?'预约单号':'承修单号'}}：</view>
				<view class="order-value">{{memberInfo.order_no}}</view>
			</view>
			<view class="order-info-box" v-if="memberInfo.staff_id">
				<view class="order-name">维修技师</view>
				<view class="order-value">{{memberInfo.staff_id}}</view>
			</view>
		</view>
		<view class="basic-info" v-if="Object.keys(memberInfo).length>0">
			<view class="common-title">
				<image src="../../static/image/line.png"></image>
				<text>基本信息</text>
			</view>
			<view class="info-box">
				<view class="info-left"><text class="must">*</text></view>
				<view class="info-right">
					<view class="info-name">
						车牌号码
					</view>
					<view class="info-value">
						<view class="info-value-place">
							{{getCar(memberInfo.vehicle_number)}}
						</view>
						<view class="info-value-carnumber">
							{{getNumber(memberInfo.vehicle_number)}}
						</view>
					</view>
				</view>
			</view>
			<view class="info-box">
				<view class="info-left"><text class="must">*</text></view>
				<view class="info-right">
					<view class="info-name">
						车型
					</view>
					<view class="info-value">
						{{memberInfo.motorcycle_type_name}}
					</view>
				</view>
			</view>
			<view class="info-box">
				<view class="info-left"><text class="must">*</text></view>
				<view class="info-right">
					<view class="info-name">
						里程
					</view>
					<view class="info-value">
						{{memberInfo.maintenance_mileage_number}}
					</view>
				</view>
			</view>
			<view class="info-box">
				<view class="info-left"><text class="must">*</text></view>
				<view class="info-right">
					<view class="info-name">
						VIN
					</view>
					<view class="info-value">
						{{memberInfo.frame_number}}
					</view>
				</view>
			</view>
			<!-- <view class="info-box">
				<view class="info-left"><text v-if="item.isMust" class="must">*</text></view>
				<view class="info-right">
					<view class="info-name">
						{{item.name}}
					</view>
					<view class="info-value">
						<view v-if="item.type==='carNumber'" class="info-value-carnumber">
							<view class="info-car-wrapper">
								<view class="info-car-name">{{}}</view>
								<image class="info-car-icon" src="../../static/image/arrow.png"></image>
							</view>
							<input class="info-car-input" type="text" :placeholder="'请输入'+item.name" placeholder-style="color:#C8C7CE">
						</view>
						<input v-if="item.type==='input'" class="info-value-input" type="text" :placeholder="'请输入'+item.name"
						 placeholder-style="color:#C8C7CE">
						<view :class="['info-value-select',item.init?'no-value':'']">
							
						</view>
						<view v-if="item.type==='select'||item.type==='time'" class="info-value-arrow">
							<image src="../../static/image/arrow.png"></image>
						</view>
			
						<picker class="hide-pick" v-if="item.type==='time'" mode="date" :value="item.value" :start="startDate" :end="endDate"
						 @change="bindChange($event,index)">
							<view class="hide-pick-text">{{item.value}}</view>
						</picker>
					</view>
				</view>
			</view> -->
		</view>
		<view class="maintain-info" v-if="projectArray.length>0">
			<view class="common-title">
				<image src="../../static/image/line.png"></image>
				<text>维修信息</text>
			</view>
			<view class="project-wrapper" v-for="(item,index) in projectArray" :key="index">
				<template v-if="item.content&&item.content.length>0">
					<view class="project-title">
						<view class="project-name-wrapper">
							<view class="project-name">{{item.maintenance_items_name}}</view>
							<image src="../../static/image/arrow.png"></image>
						</view>
						<image @click="deleteProject(index)" class="project-name-delete" src="../../static/image/delete.png"></image>
					</view>
					<view class="project-content" v-for="(item2,index2) in item.content" :key="index2">
						<view class="project-left">
							<view class="project-left-top">
								<view class="project-left-name">{{item2.parts_name}}</view>
								<view class="project-left-type" v-if="item2.brand&&item2.brand.length>0">
									<view>{{item2.brand[item2.brandValue].brand_name}}</view>
									<image class="project-type-spread" src="../../static/image/down.png"></image>

									<picker class="hide-pick" @change="bindBrandChange($event,index,index2)" :value="item2.brandValue" :range="item2.brand"
									 range-key="brand_name">
										<view class="hide-pick-type">{{item2.brand[item2.brandValue].brand_name}}</view>
									</picker>
								</view>

								<view class="project-left-type" v-if="item2.brand&&item2.brand.length>0&&item2.brand[item2.brandValue].item_type&&item2.brand[item2.brandValue].item_type.length>0">
									<view>{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].item_type_name}}</view>
									<image class="project-type-spread" src="../../static/image/down.png"></image>

									<picker class="hide-pick" @change="bindTypeChange($event,index,index2)" :value="item2.brand[item2.brandValue].itemValue"
									 :range="item2.brand[item2.brandValue].item_type" range-key="item_type_name">
										<view class="hide-pick-type">{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].item_type_name}}</view>
									</picker>
								</view>
							</view>
							<view class="project-left-price" v-if="item2.brand&&item2.brand.length>0&&item2.brand[item2.brandValue].item_type&&item2.brand[item2.brandValue].item_type.length>0">
								￥{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].good_price}}
								<text class="project-price-unit">/{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].good_unit}}</text>
							</view>
						</view>
						<view class="project-right">
							<image @click="getNumber('minus',index,index2)" class="project-right-minus" src='../../static/image/minus.png'></image>
							<view class="project-right-number">{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].good_number==0?'':item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].good_number}}</view>
							<image @click="getNumber('plus',index,index2)" class="project-right-plus" src='../../static/image/plus.png'></image>
						</view>
					</view>
				</template>
			</view>
		</view>

		<view class="project-add" v-if="projectArray.length>0">
			<image class="project-add-icon" src='../../static/image/add.png'></image>
			<view class="project-add-text" @click="addProject">添加维修项目</view>
			<picker class="hide-pick" @change="handleProject" :value="projectIndex" :range="projectArray" range-key="maintenance_items_name">
				<view class="hide-pick-project">维修项目</view>
			</picker>
		</view>

		<view class="result">
			<view class="result-left">
				<image class="result-icon" src="../../static/image/order.png"></image>
				<view class="result-order-wrapper">
					<view class="result-order-price">
						<text class="result-order-price-icon">￥</text>
						<text class="result-order-price-text">{{result}}</text>
					</view>
					<view class="result-order-pay">
						另需人工费¥100
					</view>
				</view>
			</view>
			<view class="result-btn">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		getDate
	} from '../../static/js/util.js'

	export default {
		computed: {
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			},
		},
		data() {
			return {
				date: '',
				result: 0,
				projectArray: [],
				projectIndex: 0,
				memberInfo:{},
				ids: []
			}
		},
		created() {
			this.getBasicInfo()
			this.getAllProject()
		},
		methods: {
			bindChange(e, index) {
				this.basicInfo[index].value = e.target.value
				this.basicInfo[index].init = false
			},
			// 获取基本信息
			getBasicInfo(){
				const _this = this
				wx.request({
					url: 'http://qx.51zhengrui.com/wechat_api/order/get_member_information',
					data: {
						'openid': _this.$store.state.openid,
					},
					header: {
						'token': _this.$store.state.token,
						'content-type': 'application/json'
					},
					success(res) {
						if (res.data.code == 0) {
							_this.memberInfo = res.data.data
						}
						console.log('member_information', res)
					}
				})
			},
			// 获取所有项目选项
			getAllProject() {
				const _this = this
				wx.request({
					url: 'http://qx.51zhengrui.com/wechat_api/order/get_maintenance_items',
					data: {},
					header: {
						'token': _this.$store.state.token,
						'content-type': 'application/json'
					},
					success(res) {
						if (res.data.code == 0) {
							_this.projectArray = res.data.data
						}
					}
				})
			},
			// 商品下拉
			bindBrandChange(e, index, index2) {
				this.projectArray[index].content[index2].brandValue = Number(e.detail.value)
				this.$forceUpdate()
				this.calcPrice()
			},
			// 型号下拉
			bindTypeChange(e, index, index2) {
				let brandValue = this.projectArray[index].content[index2].brandValue
				this.projectArray[index].content[index2].brand[brandValue].itemValue = Number(e.detail.value)
				this.$forceUpdate()
				this.calcPrice()
			},
			// 增减数量
			getNumber(type, index, index2) {
				let brandValue = this.projectArray[index].content[index2].brandValue
				let itemValue = this.projectArray[index].content[index2].brand[brandValue].itemValue
				let num = this.projectArray[index].content[index2].brand[brandValue].item_type[itemValue].good_number
				if (type == 'minus') {
					if (num >= 1) {
						this.projectArray[index].content[index2].brand[brandValue].item_type[itemValue].good_number--
						this.$forceUpdate()
						this.calcPrice()
					}
				} else if (type == 'plus') {
					this.projectArray[index].content[index2].brand[brandValue].item_type[itemValue].good_number++
					this.$forceUpdate()
					this.calcPrice()
				}
			},
			// 删除维修项目
			deleteProject(index) {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确定删除该项目？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.projectArray[index].content = ''
							let id = _this.projectArray[index].maintenance_items_id
							let id_index = _this.ids.indexOf(id)
							_this.ids.splice(id_index, 1)
							_this.$forceUpdate()
							_this.calcPrice()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 计算价格
			calcPrice() {
				let result = 0
				if (this.projectArray.length > 0) {
					this.projectArray.forEach((item, index) => {
						if (item.content && item.content.length > 0) {
							console.log(111, 'calcPrice')
							item.content.forEach((item2, index2) => {
								if (item2.brand && item2.brand.length > 0) {
									item2.brand.forEach((item3, index3) => {
										if (item3.item_type && item3.item_type.length > 0) {
											result += Number(item3.item_type[item3.itemValue].good_number) * Number(item3.item_type[item3.itemValue]
												.good_price)
											console.log('result', result)
										}
									})
								}
							})
						}
					})
					this.result = result
					console.log('this.result', this.result)
				}
			},
			// 选取维修项目
			handleProject(e) {
				let tmp_id = this.projectArray[Number(e.target.value)].maintenance_items_id
				this.getProjectInfo(tmp_id, Number(e.target.value))
			},
			// 获取项目下的品牌以及型号数据
			getProjectInfo(id, _index) {
				if (this.ids.indexOf(id) !== -1) {
					return false
				}
				const _this = this
				wx.request({
					url: 'http://qx.51zhengrui.com/wechat_api/order/get_parts_good_list',
					data: {
						'maintenance_items_id': id
					},
					header: {
						'token': _this.$store.state.token,
						'content-type': 'application/json'
					},
					success(res) {
						if (res.data.code == 0) {
							if (res.data.data.length > 0) {
								_this.ids.push(id)
								res.data.data.forEach(item => {
									if (item.brand && item.brand.length > 0) {
										item.brandValue = 0
										item.brand.forEach(item2 => {
											if (item2.item_type && item2.item_type.length > 0) {
												item2.itemValue = 0
												item2.item_type.forEach(item3 => {
													item3.good_number = 0
												})
											}
										})
									}
								})
								_this.projectArray[_index].content = res.data.data
								_this.$forceUpdate()
								console.log('xxxuuu', _this.projectArray)
							} else {
								uni.showToast({
									icon: 'none',
									title: '暂无数据',
									duration: 2000
								});
							}
						}
					}
				})
			},
			getCar(str){
				return str.substring(0,1)
			},
			getNumber(str){
				return str.substring(1)
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		padding-bottom: 120rpx;
		background-color: #F7F8FC;

		.input-box {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 64rpx 0 54rpx;
			box-sizing: border-box;
			color: #FFFFFF;
			font-size: 26rpx;
			
			&.drak {
				background-color: #2459A6;
				
				.input-box-cell {
					flex:1;
					overflow: hidden;
					padding-right: 10rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #FFFFFF;
				}
			}

			&.light {
				background-color: #E2EEFF;
				
				.input-box-cell {
					flex:1;
					overflow: hidden;
					padding-right: 10rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #5C8ACD;
				}
			}
		}

		.order-info {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			padding: 0 23rpx;
			background-color: #FFFFFF;

			.order-info-box {
				display: flex;
				height: 120rpx;
				align-items: center;

				.order-name {
					font-size: 22rpx;
					color: #AAAAAA;
				}

				.order-value {
					font-size: 22rpx;
					color: #333333
				}
			}
		}

		.common-title {
			display: flex;
			align-items: center;
			height: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #111111;

			image {
				width: 10rpx;
				height: 30rpx;
				margin: 0 17rpx 0 24rpx;
			}
		}

		.hide-pick {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			z-index: 1;

			.hide-pick-text {
				width: 100%;
				height: 98rpx;
			}

			.hide-pick-type {
				width: 100%;
				height: 66rpx;
			}

			.hide-pick-project {
				width: 100%;
				height: 94rpx;
			}
		}

		.basic-info {
			margin-top: 36rpx;

			.info-box {
				height: 98rpx;
				padding: 0 23rpx 0 38rpx;
				display: flex;

				.info-left {
					flex-basis: 19rpx;
					display: flex;
					align-items: center;

					.must {
						color: #EC0000;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
					}
				}

				.info-right {
					display: flex;
					flex: 1;
					border-bottom: 1rpx solid #E8E8E8;
					align-items: center;
					justify-content: space-between;

					.info-name {
						display: flex;
						align-items: center;
						height: 100%;
						flex-basis: 220rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #1E242B;
					}

					.info-value {
						display: flex;
						align-items: center;
						flex: 1;
						height: 100%;
						position: relative;
						
						.info-value-place {
							width: 50rpx;
							height: 50rpx;
							background: #D33E5A;
							border-radius: 4rpx;
							text-align: center;
							line-height: 50rpx;
							font-size: 32rpx;
							color: #FFFFFF;
						}
						
						.info-value-carnumber {
							width: calc(100% - 50rpx);
							margin-left: 54rpx;
							color: #1E242B;
							font-size: 32rpx;
						}

						// .info-value-carnumber {
						// 	width: 50rpx;
						// 	display: flex;
						// 	align-items: center;

						// 	.info-car-wrapper {
						// 		display: flex;
						// 		align-items: center;
						// 		flex-basis: 104rpx;
						// 		position: relative;

						// 		.info-car-name {
						// 			width: 50rpx;
						// 			height: 50rpx;
						// 			background: #D33E5A;
						// 			border-radius: 4rpx;
						// 			text-align: center;
						// 			line-height: 50rpx;
						// 			font-size: 32rpx;
						// 			color: #FFFFFF;
						// 		}

						// 		.info-car-icon {
						// 			width: 12rpx;
						// 			height: 6rpx;
						// 			margin-left: 10rpx;
						// 		}
						// 	}

						// 	.info-car-input {
						// 		width: calc(100% - 144rpx);
						// 		height: 100%;
						// 		border: none;
						// 		color: #1E242B;
						// 		font-size: 32rpx;
						// 		font-family: PingFang SC;
						// 		font-weight: 500;
						// 	}
						// }

						// .info-value-input {
						// 	width: calc(100% - 40rpx);
						// 	height: 100%;
						// 	border: none;
						// 	color: #1E242B;
						// 	font-size: 32rpx;
						// 	font-family: PingFang SC;
						// 	font-weight: 500;
						// }

						// .info-value-select {
						// 	width: calc(100% - 40rpx);
						// 	color: #1E242B;
						// 	font-size: 32rpx;
						// 	font-family: PingFang SC;
						// 	font-weight: 500;

						// 	&.no-value {
						// 		color: #C8C7CE;
						// 	}
						// }

						// .info-value-arrow {
						// 	width: 40rpx;
						// 	display: flex;
						// 	align-items: center;
						// 	justify-content: center;

						// 	image {
						// 		width: 12rpx;
						// 		height: 6rpx;
						// 	}
						// }
					}
				}
			}
		}

		.maintain-info {
			margin-top: 36rpx;

			.project-wrapper {
				margin-top: 24rpx;
				padding: 0 24rpx;

				.project-title {
					margin-left: 32rpx;
					height: 94rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.project-name-wrapper {
						display: flex;
						align-items: center;

						.project-name {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #2459A6;
							line-height: 46rpx;
						}

						image {
							width: 12rpx;
							height: 6rpx;
							margin-left: 45rpx;
						}
					}

					.project-name-delete {
						width: 20rpx;
						height: 20rpx;
						margin-right: 51rpx;
					}
				}

				.project-content {
					padding: 0 40rpx 0 32rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 35rpx;

					.project-left {
						display: flex;
						flex-direction: column;

						.project-left-top {
							display: flex;
							align-items: center;

							.project-left-name {
								font-size: 28rpx;
								font-weight: 500;
								color: #111111;
								line-height: 46rpx;
							}

							.project-left-type {
								margin-left: 46rpx;
								padding: 10rpx 10rpx 13rpx 10rpx;
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #868590;
								line-height: 46rpx;
								background: #F5F5F8;
								border-radius: 8px;
								display: flex;
								align-items: center;
								position: relative;

								.project-type-spread {
									width: 12rpx;
									height: 12rpx;
									margin-left: 9rpx;
								}
							}
						}

						.project-left-price {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #D33E5A;
							line-height: 46rpx;

							.project-price-unit {
								color: #999999;
								margin-left: 3rpx;
							}
						}
					}

					.project-right {
						height: 44rpx;
						display: flex;
						align-items: center;

						.project-right-minus {
							width: 44rpx;
							height: 44rpx;
						}

						.project-right-number {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #111111;
							line-height: 46rpx;
							margin: 0 17rpx;
						}

						.project-right-plus {
							width: 44rpx;
							height: 44rpx;
						}
					}
				}

			}
		}

		.project-add {
			height: 94rpx;
			margin: 24rpx auto;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.project-add-icon {
				width: 24rpx;
				height: 24rpx;
			}

			.project-add-text {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left: 27rpx;
			}
		}

		.result {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 102rpx;
			display: flex;

			.result-left {
				background: #3B3B3D;
				display: flex;
				flex: 1;

				.result-icon {
					width: 108rpx;
					height: 108rpx;
					margin-left: 24rpx;
					transform: translateY(-16rpx);
				}

				.result-order-wrapper {
					margin-left: 37rpx;

					.result-order-price {
						color: #FFFFFF;
						margin-top: 17rpx;
						margin-bottom: 18rpx;
						height: 36rpx;
						display: flex;
						align-items: flex-end;

						.result-order-price-icon {
							font-size: 32rpx;
							line-height: 1;
						}

						.result-order-price-text {
							font-size: 48rpx;
							line-height: 36rpx;
						}
					}

					.result-order-pay {
						font-size: 20rpx;
						line-height: 1;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}

				}
			}

			.result-btn {
				width: 216rpx;
				height: 102rpx;
				line-height: 102rpx;
				text-align: center;
				background: #277BF6;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
