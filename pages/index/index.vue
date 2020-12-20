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
							{{getCarNumber(memberInfo.vehicle_number)}}
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
						<input type="text" :disabled="canWrite?false:true" :value="maintenance_mileage_number" placeholder="请输入里程">
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
			<view class="info-box">
				<view class="info-left"></view>
				<view class="info-right">
					<view class="info-name">
						下次换油日期
					</view>
					<view class="info-value-date-wrapper">
						<view :class="['info-value-date',next_oil_change_time?'':'no-value']">
							{{next_oil_change_time?next_oil_change_time:'请选择下次换油日期'}}
						</view>
						<view class="info-car-icon" v-if="!detail">
							<image src="../../static/image/arrow.png"></image>
						</view>

						<picker :disabled="canWrite?false:true" class="hide-pick" mode="date" value="" :start="startDate" :end="endDate"
						 @change="bindNextChange">
							<view class="hide-pick-time">下次换油日期</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="info-box">
				<view class="info-left"></view>
				<view class="info-right">
					<view class="info-name">
						派单时间
					</view>
					<view class="info-value-date-wrapper">
						<view :class="['info-value-date',order_delivery_time?'':'no-value']">
							{{order_delivery_time?order_delivery_time:'请选择派单时间'}}
						</view>
						<view class="info-car-icon" v-if="!detail">
							<image src="../../static/image/arrow.png"></image>
						</view>

						<picker :disabled="canWrite?false:true" class="hide-pick" mode="date" value="" :start="startDate" :end="endDate"
						 @change="bindSendChange">
							<view class="hide-pick-time">下次换油日期</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- <view class="info-box">
				<view class="info-left"></view>
				<view class="info-right">
					<view class="info-name">
						结清日期
					</view>
					<view class="info-value-date-wrapper">
						<view :class="['info-value-date',settle_time?'':'no-value']">
							{{settle_time?settle_time:'请选择结清日期'}}
						</view>
						<view class="info-car-icon"><image src="../../static/image/arrow.png"></image></view>
						
						<picker class="hide-pick" mode="date" value="" :start="startDate" :end="endDate"
						 @change="bindDoneChange">
							<view class="hide-pick-time">结清日期</view>
						</picker>
					</view>
				</view>
			</view> -->
			<view class="info-box">
				<view class="info-left"></view>
				<view class="info-right">
					<view class="info-name">
						定位
					</view>
					<view class="info-value">
						<view class="location-info">{{location}}</view>
						<view v-if="canWrite" class="location-icon" @click="openMap">
							<image src="../../static/image/location.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="info-picture">
				<view class="info-picture-left">
					维修图片
				</view>
				<view class="info-picture-right">
					<view class="info-picture-box" v-for="(item,index) in order_img" :key="index" @click='getPreview(index)'>
						<image class="info-picture-cell" :src="item"></image>
					</view>
					<view class="info-picture-box" @click="chooseImage">
						<image class="info-picture-add" src="../../static/image/camer.png"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <map style="width: 100%; height: 289rpx;" :latitude="latitude" :longitude="longitude" :markers="covers" @tap="openMap()"></map> -->
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
						<view v-if="canWrite" class="project-name-delete" @click="deleteProject(index)">
							<image src="../../static/image/delete.png"></image>
						</view>
					</view>
					<view class="project-content" v-for="(item2,index2) in item.content" :key="index2">
						<view class="project-left">
							<view class="project-left-top">
								<view class="project-left-name">{{item2.parts_name}}</view>
								<view class="project-left-type" v-if="item2.brand&&item2.brand.length>0">
									<view>{{item2.brand[item2.brandValue].brand_name}}</view>
									<image class="project-type-spread" src="../../static/image/down.png"></image>

									<picker v-if="canWrite" class="hide-pick" @change="bindBrandChange($event,index,index2)" :value="item2.brandValue"
									 :range="item2.brand" range-key="brand_name">
										<view class="hide-pick-type">{{item2.brand[item2.brandValue].brand_name}}</view>
									</picker>
								</view>

								<view class="project-left-type" v-if="item2.brand&&item2.brand.length>0&&item2.brand[item2.brandValue].item_type&&item2.brand[item2.brandValue].item_type.length>0">
									<view>{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].item_type_name}}</view>
									<image class="project-type-spread" src="../../static/image/down.png"></image>

									<picker v-if="canWrite" class="hide-pick" @change="bindTypeChange($event,index,index2)" :value="item2.brand[item2.brandValue].itemValue"
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
							<image v-if="canWrite" @click="getNumber('minus',index,index2)" class="project-right-minus" src='../../static/image/minus.png'></image>
							<view class="project-right-number">{{item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].good_number==0?'':item2.brand[item2.brandValue].item_type[item2.brand[item2.brandValue].itemValue].good_number}}</view>
							<image v-if="canWrite" @click="getNumber('plus',index,index2)" class="project-right-plus" src='../../static/image/plus.png'></image>
						</view>
					</view>
				</template>
			</view>
		</view>

		<view class="project-add" v-if="projectArray.length>0 && canWrite">
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
					<!-- <view class="result-order-pay">
						另需人工费¥100
					</view> -->
				</view>
			</view>
			<view class="result-btn" @click='doSubmit' v-if="type==1&&order_status!=3">提交</view>
			<view class="result-btn" @click='docomplete' v-if="type==2&&order_status==2">完成</view>
		</view>
	</view>
</template>

<script>
	import {
		getDate
	} from '../../static/js/util.js'

	import apiUrl from '@/static/js/api.js'
	export default {
		computed: {
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			},
			canWrite() {
				let result = true
				if (this.order_status == 3 || this.$store.state.type == 2) {
					result = false
				}
				return result
			},
			type() {
				return this.$store.state.type
			}
		},
		data() {
			return {
				result: 0,
				projectArray: [],
				projectIndex: 0,
				memberInfo: {},
				ids: [],
				next_oil_change_time: '',
				order_delivery_time: '',
				settle_time: '',
				submit: [],
				detail: false,
				order_no: '',
				order_status: '',
				latitude: 31.7335,
				longitude: 118.1024,
				covers: [{
					latitude: 31.7335, //纬度，范围为-90~90，负数表示南纬
					longitude: 118.1024, //经度，范围为-180~180，负数表示西经
				}],
				order_img: [],
				order_origin_img: [],
				maintenance_mileage_number: '',
				location: ''
			}
		},
		mounted() {
			this.getBasicInfo()
			this.getAllProject()
		},
		onLoad(options) {
			console.log(12312312312, options)
			if (Object.keys(options).length > 0) {
				this.detail = true
				this.order_no = options.order_no
				this.order_status = Number(options.order_status)
				this.getdetailInfo(options.order_no)
			}
		},
		onReady() {
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					console.log('当前位置的经度：' + res.longitude);
					this.longitude = res.longitude
					console.log('当前位置的纬度：' + res.latitude);
					this.latitude = res.latitude
				}
			});
		},
		methods: {
			chooseImage() {
				const that = this
				if (that.order_img.length >= 6) {
					uni.showToast({
						icon: 'none',
						title: '最多上传6张图片',
						duration: 2000
					});
					return false
				}
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log('图', res.tempFilePaths, 1123, JSON.stringify(res.tempFilePaths));
						if (res.tempFilePaths) {
							let tmp_length = res.tempFilePaths.length
							if (that.order_img.length + tmp_length > 6) {
								uni.showToast({
									icon: 'none',
									title: '最多上传6张图片',
									duration: 2000
								});
								return false
							}
						}

						if (res.tempFilePaths && res.tempFilePaths.length > 0) {
							res.tempFilePaths.forEach(item => {
								uni.uploadFile({
									url: apiUrl + '/wechat_api/base/upload', //仅为示例，非真实的接口地址
									filePath: item,
									header: {
										'token': that.$store.state.token,
									},
									name: 'file',
									formData: {

									},
									success: (uploadFileRes) => {
										console.log('xubu', JSON.parse(uploadFileRes.data).data);
										let tmp_url = apiUrl + JSON.parse(uploadFileRes.data).data
										let tmp_url_o = JSON.parse(uploadFileRes.data).data
										that.order_img.push(tmp_url)
										that.order_origin_img.push(tmp_url_o)
									}
								});
							})
						}
					}
				});
			},
			getPreview(index) {
				const that = this
				console.log('previewImage',that.order_img.length,that.order_img)
				uni.previewImage({
					current: index,
					urls: that.order_img,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			openMap() { //点击地图
				if ((this.order_status == 3 && this.$store.state.type == 1) || this.$store.state.type == 2) {
					uni.openLocation({
						latitude: this.latitude,
						longitude: this.longitude,
						name: this.location,
						address: this.location
					})
				} else {
					uni.chooseLocation({
						success: res => {
							console.log('位置名称：' + res.name);
							console.log('详细地址：' + res.address);
							console.log('纬度：' + res.latitude);
							console.log('经度：' + res.longitude);
							this.location = res.address
							this.longitude = res.longitude
							this.latitude = res.latitude
						}
					});
				}
			},
			init() {
				this.result = 0
				this.projectArray = []
				this.projectIndex = 0
				this.memberInfo = {}
				this.ids = []
				this.next_oil_change_time = ''
				this.order_delivery_time = ''
				this.maintenance_mileage_number = ''
				this.settle_time = ''
				this.submit = []
			},
			bindNextChange(e) {
				this.next_oil_change_time = e.detail.value
			},
			bindSendChange(e) {
				this.order_delivery_time = e.detail.value
			},
			bindDoneChange(e) {
				this.settle_time = e.detail.value
			},
			// 获取基本信息
			getBasicInfo() {
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
				if (this.projectArray[index].content[index2].brandValue == Number(e.detail.value)) {
					return false
				}
				this.projectArray[index].content[index2].brandValue = Number(e.detail.value)

				this.projectArray[index].content[index2].brand.forEach(item => {
					if (item.item_type && item.item_type.length > 0) {
						item.item_type.forEach(item2 => {
							item2.good_number = 0
						})
					}
				})
				this.$forceUpdate()
				this.calcPrice()
			},
			// 型号下拉
			bindTypeChange(e, index, index2) {
				let brandValue = this.projectArray[index].content[index2].brandValue
				if (this.projectArray[index].content[index2].brand[brandValue].itemValue == Number(e.detail.value)) {
					return false
				}

				this.projectArray[index].content[index2].brand[brandValue].itemValue = Number(e.detail.value)

				this.projectArray[index].content[index2].brand[brandValue].item_type.forEach(item => {
					item.good_number = 0
				})

				this.$forceUpdate()
				this.calcPrice()
			},
			// 增减数量
			getNumber(type, index, index2) {
				console.log('getNumber', type)
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
							item.content.forEach((item2, index2) => {
								if (item2.brand && item2.brand.length > 0) {
									item2.brand.forEach((item3, index3) => {
										if (item3.item_type && item3.item_type.length > 0) {
											result += Number(item3.item_type[item3.itemValue].good_number) * Number(item3.item_type[item3.itemValue]
												.good_price)
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
					uni.showToast({
						icon: 'none',
						title: '请勿重复选择',
						duration: 2000
					});
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
			getCar(str) {
				return str.substring(0, 1)
			},
			getCarNumber(str) {
				return str.substring(1)
			},
			// 获取订单详情信息
			getdetailInfo(id) {
				const _this = this
				wx.request({
					url: 'http://qx.51zhengrui.com/wechat_api/order/order_detail',
					data: {
						order_no: id,
						member_id: _this.$store.state.member_id,
						type: _this.$store.state.type
					},
					header: {
						'token': _this.$store.state.token,
						'content-type': 'application/json'
					},
					success(res1) {
						console.log('detail', res1.data.data)
						if (res1.data.code == 0) {
							_this.next_oil_change_time = res1.data.data.next_oil_change_time
							_this.order_delivery_time = res1.data.data.order_delivery_time
							_this.maintenance_mileage_number = res1.data.data.maintenance_mileage_number
							_this.longitude = res1.data.data.longitude
							_this.latitude = res1.data.data.latitude
							_this.location = ''
							_this.result = res1.data.data.order_money
							let tmp_img_list = res1.data.data.order_img.split(',')
							let tmp_img_result = []
							let tmp_img_result2 = []
							console.log('tmp_img_list',tmp_img_list)
							if(tmp_img_list&&tmp_img_list.length>0){
								tmp_img_list.map(item=>{
									tmp_img_result.push(apiUrl+'/'+item)
									tmp_img_result2.push('/'+item)
								})
							}
							console.log('tmp_img_list',tmp_img_result)
							_this.order_img = tmp_img_result
							_this.order_origin_img = tmp_img_result2

							if (res1.data.data.order && res1.data.data.order.length > 0) {
								res1.data.data.order.forEach(order_item => {
									wx.request({
										url: 'http://qx.51zhengrui.com/wechat_api/order/get_parts_good_list',
										data: {
											'maintenance_items_id': order_item.maintenance_items_id
										},
										header: {
											'token': _this.$store.state.token,
											'content-type': 'application/json'
										},
										success(res2) {
											if (res2.data.data.length > 0) {
												_this.ids.push(order_item.maintenance_items_id)

												res2.data.data.forEach(item => {
													if (item.brand && item.brand.length > 0) {
														item.brandValue = 0
														item.brand_ids = []
														item.brand.forEach(item2 => {
															item.brand_ids.push(item2.brand_id)
															if (item2.item_type && item2.item_type.length > 0) {
																item2.itemValue = 0
																item2.item_ids = []
																item2.item_type.forEach(item3 => {
																	item2.item_ids.push(item3.item_type_id)
																	item3.good_number = 0
																})
															}
														})
													}
												})


												if (order_item.good && order_item.good.length > 0) {
													order_item.good.forEach(good_item => {
														res2.data.data.forEach(x => {
															if (good_item.parts_id == x.parts_id) {
																x.brandValue = x.brand_ids.indexOf(good_item.brand_id)

																x.brand.forEach(y => {
																	if (good_item.brand_id == y.brand_id) {
																		y.itemValue = y.item_ids.indexOf(good_item.item_type_id)

																		y.item_type.forEach(z => {
																			if (good_item.good_id == z.good_id) {
																				z.good_number = good_item.good_number
																			}
																		})
																	}
																})
															}
														})
													})
												}

												let project_ids = []
												_this.projectArray.forEach(pro_item => {
													project_ids.push(pro_item.maintenance_items_id)
												})
												let order_item_index = project_ids.indexOf(order_item.maintenance_items_id)
												_this.projectArray[order_item_index].content = res2.data.data

												_this.$forceUpdate()
											}
										}
									})
								})
							}
						}
					}
				})
			},
			doSubmit() {
				const that = this
				if (this.result == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择维修项目',
						duration: 2000
					});
					return false
				}

				uni.showLoading({
					title: '提交中',
					mask: true
				});

				let time = (new Date(this.next_oil_change_time).getTime()) / 1000
				let time2 = (new Date(this.order_delivery_time).getTime()) / 1000
				let order_detail = []

				if (this.projectArray.length > 0) {
					this.projectArray.forEach((item, index) => {
						if (item.content && item.content.length > 0) {
							item.content.forEach((item2, index2) => {
								if (item2.brand && item2.brand.length > 0) {
									item2.brand.forEach((item3, index3) => {
										if (item3.item_type && item3.item_type.length > 0) {
											console.log(111, Number(item3.item_type[item3.itemValue].good_number))
											if (Number(item3.item_type[item3.itemValue].good_number) > 0) {
												let tmp_obj = {}
												tmp_obj.maintenance_items_id = item.maintenance_items_id
												tmp_obj.maintenance_items_name = item.maintenance_items_name
												tmp_obj.parts_id = item2.parts_id
												tmp_obj.parts_name = item2.parts_name
												tmp_obj.brand_id = item3.brand_id
												tmp_obj.brand_name = item3.brand_name
												tmp_obj.item_type_name = item3.item_type[item3.itemValue].item_type_name
												tmp_obj.good_id = item3.item_type[item3.itemValue].good_id
												tmp_obj.good_price = item3.item_type[item3.itemValue].good_price
												tmp_obj.good_number = item3.item_type[item3.itemValue].good_number
												tmp_obj.good_all_price = Number(item3.item_type[item3.itemValue].good_price) * Number(item3.item_type[
													item3.itemValue].good_number)
												order_detail.push(tmp_obj)
											}
										}
									})
								}
							})
						}
					})
				}

				let post_url = ''
				let post_data = {}
				if (!this.detail) {
					post_url = 'http://qx.51zhengrui.com/wechat_api/order/order_add'
					post_data.member_id = that.memberInfo.member_id
					post_data.next_oil_change_time = time
					post_data.order_money = that.result
					post_data.order_detail_list = JSON.stringify(order_detail)
					post_data.order_longitude = that.longitude
					post_data.order_latitude = that.latitude
					post_data.order_delivery_time = time2
					post_data.maintenance_mileage_number = that.maintenance_mileage_number
					post_data.order_img = that.order_origin_img.join(',')
				} else {
					post_url = 'http://qx.51zhengrui.com/wechat_api/order/order_edit'
					post_data.order_no = that.order_no
					post_data.next_oil_change_time = time
					post_data.order_money = that.result
					post_data.order_detail_list = JSON.stringify(order_detail)
					post_data.order_longitude = that.longitude
					post_data.order_latitude = that.latitude
					post_data.order_delivery_time = time2
					post_data.maintenance_mileage_number = that.maintenance_mileage_number
					post_data.order_img = that.order_origin_img.join(',')
				}
				wx.request({
					url: post_url,
					data: post_data,
					method: 'POST',
					header: {
						'token': that.$store.state.token,
						'content-type': 'application/json'
					},
					success(res) {
						if (res.data.code == 0) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
								duration: 1000,
								mask: true,
								success: () => {
									setTimeout(function() {
										uni.redirectTo({
											url: "/pages/list/list",
											success: () => {
												uni.hideLoading();
												that.init()
											}
										})
									}, 1000)
								}
							});
						}
					},
					complete() {

					}
				})
			},
			docomplete(){
				this.$http('/wechat_api/order/order',{
					order_status:3
				}).then(res=>{
					console.log('订单完成',res)
				})
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
					flex: 1;
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
					flex: 1;
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

			.hide-pick-time {
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

						.location-info {}

						.location-icon {
							width: 70rpx;
							height: 70rpx;
							display: flex;
							justify-content: center;
							align-items: center;

							image {
								width: 46rpx;
								height: 46rpx;
							}
						}

					}

					.info-value-date-wrapper {
						flex: 1;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						position: relative;

						.info-value-date {
							width: calc(100% - 40rpx);

							&.no-value {
								color: #C8C7CE;
							}
						}

						.info-car-icon {
							width: 40rpx;
							height: 40rpx;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 12rpx;
								height: 6rpx;
								margin-left: 10rpx;
							}
						}
					}
				}
			}

			.info-picture {
				padding: 0 23rpx 0 38rpx;
				display: flex;

				.info-picture-left {
					height: 98rpx;
					line-height: 98rpx;
					flex-basis: 239rpx;
					padding-left: 19rpx;
					box-sizing: border-box;
				}

				.info-picture-right {
					display: flex;
					flex-wrap: wrap;

					.info-picture-box {
						width: 100rpx;
						height: 100rpx;
						border: 1rpx dashed #bfbfbf;
						margin-top: 20rpx;
						margin-right: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						&:nth-child(4n) {
							margin-right: 0;
						}

						.info-picture-cell {
							width: 100%;
							height: 100%;
						}

						.info-picture-add {
							width: 64rpx;
							height: 64rpx;
						}
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
						width: 50rpx;
						height: 50rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 26rpx;

						image {
							width: 20rpx;
							height: 20rpx;
						}
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
							min-width: 48rpx;
							text-align: center;
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
					display: flex;
					align-items: center;

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
