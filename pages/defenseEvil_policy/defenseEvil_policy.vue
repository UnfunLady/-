<template>
	<view>
		<view class="contentBox">
			<view class="topInfo">
				<view class="topImg">
					<u--image :showLoading="true" width="100%" height="370" src="../../static/images/fangyi3.png">
					</u--image>
				</view>
				<view class="topText">
					<h3> 疫情隔离政策查询</h3>
				</view>
			</view>
			<view class="selectInfo">
				<view class="topInfo">
					<view class="topForm" @click="selectForm">
						<view class="topTitle">
							出发地
						</view>
						<view class="bottomShow">
							<view class="leftText">
								{{formText!==''?formText:'选择出发地'}}
							</view>
							<view class="rightIcon">
								<u-icon name="../../static/images/dropDown.svg"></u-icon>
							</view>
						</view>
					</view>
					<view class="transform" @click="transformToForm">
						<u-icon name="../../static/images/tran.svg" size="45"></u-icon>
					</view>
					<view class="topTo" @click="selectTo">
						<view class="topTitle">
							目的地
						</view>
						<view class="bottomShow">
							<view class="leftText">
								{{toText!==''?toText:'选择目的地'}}
							</view>
							<view class="rightIcon">
								<u-icon name="../../static/images/dropDown.svg"></u-icon>
							</view>
						</view>
					</view>
				</view>

				<view class="bottomInfo">
					<view class="explainText">
						<text> 更新时间：</text>
						<u--text color="#c52c3c" :text="this.updateTime" mode="date">
						</u--text>
					</view>
				</view>
			</view>
			<view class="outMainInfo" v-if="JSON.stringify(outDataList)!=='{}'">
				<view class="titleInfo">
					<view class="type">
						出城
					</view>
					<view class="cityName">
						{{outDataList.data.items[0].city}}
					</view>
					<view class="HighRisk risk" v-if="outHighCityListLength!==0">
						<u-tag :text="outHighCityListLength+'个高风险地区'" type="error" size="mini" icon="error-circle"
							plain>
						</u-tag>
					</view>
					<view class="mediumRisk risk" v-if="outMediumCityListLength!==0">
						<u-tag :text="outMediumCityListLength+'个中风险地区'" type="warning" size="mini" icon="warning" plain>
						</u-tag>
					</view>
					<view class="risk" v-else>
						<u-tag text="低风险地区" type="success" size="mini" icon="checkbox-mark" plain>
						</u-tag>
					</view>
				</view>
				<!-- 出城政策 -->
				<view class="outCityWarning">
					<view class="topTitle">
						出城政策
					</view>
					<view class="contentInfo" v-for="(cinfo,index) in outDataList.data.items[0].leavePolicyList"
						:key="index">
						{{cinfo}}
					</view>
				</view>
				<view class="highAndMedium">
					<view class="topTitle" v-show="outHighCityListLength>0||outMediumCityListLength>0">
						{{outHighCityListLength+outMediumCityListLength}}个中高风险地区
					</view>
					<view class="mainInfo" v-for="(item,index) in outDataList.data.items[0].poiList" :key="index">
						<u-tag text="高风险" size="mini" type="error" plain v-show="item.type=='1'"></u-tag>
						<u-tag text="中风险" size="mini" type="warning" plain v-show="item.type=='2'"></u-tag>
						<span style="margin-left:96rpx;" v-show="item.type=='0'"></span>
						<text style="margin-left: 20rpx;"> {{item.area}}</text>
					</view>

					<view class="bottomInfo">
						<text style="font-size: 26rpx;"> 数据来源：当地卫健委和权威网站 </text>
						<span style="display: flex;font-size: 24rpx;margin-top: 10rpx;">发布时间：<u--text color="#c52c3c"
								:text="outDataList.timestamp" mode="date">
							</u--text></span>
					</view>
				</view>

			</view>
			<view class="inMainInfo" v-if="JSON.stringify(inDataList)!=='{}'">
				<view class="titleInfo ">
					<view class="type">
						进城
					</view>
					<view class="cityName">
						{{inDataList.data.items[0].city}}
					</view>
					<view class="HighRisk risk" v-if="inHighCityListLength!==0">
						<u-tag :text="inHighCityListLength+'个高风险地区'" type="error" size="mini" icon="error-circle" plain>
						</u-tag>
					</view>
					<view class="mediumRisk risk" v-if="inMediumCityListLength!==0">
						<u-tag :text="inMediumCityListLength+'个中风险地区'" type="warning" size="mini" icon="warning" plain>
						</u-tag>
					</view>
					<view class="risk" v-else>
						<u-tag text="低风险地区" type="success" size="mini" icon="checkbox-mark" plain>
						</u-tag>
					</view>
				</view>
				<view class="mainInfo">
					<view class="titleInfo">
						入城政策
					</view>
					<view class="contentInfo" v-for="(cinfo,index) in inDataList.data.items[0].backPolicyList"
						:key="index">
						{{cinfo}}
					</view>
					<view class="highAndMedium">
						<view class="topTitle" v-show="inHighCityListLength>0||inMediumCityListLength>0">
							{{inHighCityListLength+inMediumCityListLength}}个中高风险地区
						</view>
						<view class="main" v-for="(item,index) in inDataList.data.items[0].poiList">
							<u-tag text="高风险" size="mini" type="error" plain v-show="item.type=='1'"></u-tag>
							<u-tag text="中风险" size="mini" type="warning" plain v-show="item.type=='2'"></u-tag>
							<span style="margin-left:96rpx;" v-show="item.type=='0'"></span>
							<text style="margin-left: 20rpx;"> {{item.area}}</text>
						</view>
					</view>
					<view class="bottomInfo">
						<text> 数据来源：当地卫健委和权威网站 </text>
						<span style="display: flex;">发布时间：<u--text color="#c52c3c" :text="inDataList.timestamp"
								mode="date">
							</u--text></span>
					</view>
				</view>
			</view>
			<view class="empty" v-if="JSON.stringify(outDataList)==='{}'&&JSON.stringify(inDataList)==='{}'">
				当前暂无数据~
			</view>
			<!-- 选择列表 -->
			<view class="mpicker">
				<u-picker :show="showSelect" :itemHeight="88" :defaultIndex='defaultSelectArray' ref="uPicker"
					:columns="JSON.parse(JSON.stringify(this.columns))" @confirm="confirm" @change="changeHandler"
					@cancel="cancel" @close="cancel" keyName="name" :closeOnClickOverlay="true">
				</u-picker>
			</view>
		</view>
		<!-- 警告提示 -->
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showIp" :closeOnClickOverlay="true" @close="cancelIpSearch" @confirm="confirmIpSearch"
			@cancel="cancelIpSearch" :showCancelButton="true" :buttonReverse="true" :content='ipContent'></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ipCityCode: 0,
				ipCity: 0,
				ipContent: '',
				// 用来ip地址选择后点击出发地的列表集合遍历取出对应的数组下标用
				selectArrayByIp: [],
				showIp: false,
				showSelect: false,
				columns: [],
				formText: '',
				toText: '',
				updateTime: 0,
				columnData: [

				],
				edit: '',
				allCityNumber: [],
				alertMessage: '',
				showAlert: false,
				// 出
				outDataList: {},
				// 入
				inDataList: {},
				// 出城高风险地区集合数量
				outHighCityListLength: [],
				// 出城种中风险地区集合数量
				outMediumCityListLength: [],
				// 如城高风险地区集合数量
				inHighCityListLength: [],
				// 入城中风险地区集合数量
				inMediumCityListLength: [],
				// 记录当前选择的地区数组
				defaultSelectArray: [],
				// 打开选择时默认左右边数据
				formRightData: [],
				toRightData: [],
				formLeftData: [],
				toLeftData: [],
				formCityId: 0,
				toCityId: 0
			};
		},
		mounted() {

			this.getLocation()
		},
		methods: {
			async getLocation() {
				const res = await this.$API.defenseEvilPolicyApi.getIpLocation()
				this.ipCity = res.result.city;
				this.ipCityCode = res.result.administrativeCode
				this.ipContent = `您当前定位城市为${res.result.city},是否选择${res.result.city}为出发地`;
				this.showIp = true;
				this.getOptions();
			},
			confirmIpSearch() {
				this.showIp = false;
				this.searchInfoByName(this.ipCityCode, 'Form', true)
			},
			cancelIpSearch() {
				this.showIp = false;
			},
			async getOptions() {
				// 获取城市信息
				const res = await this.$API.defenseEvilPolicyApi.getSelectOptions()
				const leftData = res.data.items.map((city) => {
					// 把所有城市id号存起来
					const citys = {
						id: city.id,
						name: city.name
					}
					return citys
				})
				const rightData = res.data.items.map((city) => {
					return city
				})
				this.selectArrayByIp = res.data.items;
				this.columns.push(leftData);
				// 打开时右边的默认数据
				this.columns.push([res.data.items[0].list[0]])
				this.columnData.push(rightData);
				// 获取时间戳
				this.updateTime = res.timestamp;


			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					indexs,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// 	 picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, JSON.parse(JSON.stringify(this.columnData))[0][index].list)
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				switch (this.edit) {
					case 'Form':
						// 判断是不是对象
						this.formText = e.value[e.value.length - 1].name
						this.searchInfoByName(e.value[e.value.length - 1].id, 'Form')
						this.formRightData = e.values[1]
						this.formLeftData = e.indexs
						break;
					case 'To':
						this.toText = e.value[e.value.length - 1].name
						this.searchInfoByName(e.value[e.value.length - 1].id, 'To')
						this.toRightData = e.values[1]
						this.toLeftData = e.indexs
						break;
				}
				this.showSelect = false
			},
			cancel() {
				this.showSelect = false
			},
			selectForm() {
				this.edit = 'Form';
				this.showSelect = true;
				if (this.formRightData.length > 0) {
					this.columns[1] = this.formRightData;
					this.$refs.uPicker.setIndexs(this.formLeftData)
				} else {
					this.$refs.uPicker.setIndexs([0, 0])
				}
			},
			selectTo() {
				this.edit = 'To';
				this.showSelect = true;
				if (this.toRightData.length > 0) {
					this.columns[1] = this.toRightData;
					this.$refs.uPicker.setIndexs(this.toLeftData)
				} else {
					this.$refs.uPicker.setIndexs([0, 0])
				}
			},
			// 根据传递的name值获取id查找信息
			async searchInfoByName(cityId, type, isIp = false) {
				// 根据cityId找
				// 如果是默认ip地址进入的
				if (isIp) {
					this.formCityId = cityId;
					this.outHighCityListLength = 0;
					this.outMediumCityListLength = 0;
					const res = await this.$API.defenseEvilPolicyApi.getInfoData(this.formCityId);
					this.outDataList = res;
					this.formText = res.data.items[0].city;
					if (res.data.items[0].poiList) {
						res.data.items[0].poiList.map((city) => {
							if (city.type == '1') {
								this.outHighCityListLength++
							}
						})
						res.data.items[0].poiList.map((city) => {
							if (city.type == '2') {
								this.outMediumCityListLength++;
							}
						})
					}
					this.selectArrayByIp.some((city, index) => {
						return city.list.some((ccity, cindex) => {
							if (ccity.id === cityId) {
								// index就是省级的下标 cindex就是ip地址所对应的下标 
								// 再把city的list赋值给rightData 下标整合数组给leftData
								this.formLeftData = [index, cindex];
								this.formRightData = city.list;
								return true
							} else {
								return false
							}
						})

					})

				} else {
					switch (type) {
						case 'Form':
							this.formCityId = cityId;
							this.outHighCityListLength = 0;
							this.outMediumCityListLength = 0;
							const res = await this.$API.defenseEvilPolicyApi.getInfoData(this.formCityId);
							this.outDataList = res;
							this.formText = res.data.items[0].city;
							if (res.data.items[0].poiList) {
								res.data.items[0].poiList.map((city) => {
									if (city.type == '1') {
										this.outHighCityListLength++
									}
								})
								res.data.items[0].poiList.map((city) => {
									if (city.type == '2') {
										this.outMediumCityListLength++;
									}
								})
							}
							break;
						case 'To':
							this.toCityId = cityId;
							this.inHighCityListLength = 0;
							this.inMediumCityListLength = 0;
							const res2 = await this.$API.defenseEvilPolicyApi.getInfoData(this.toCityId);
							this.inDataList = res2;
							if (res2.data.items[0].poiList) {
								res2.data.items[0].poiList.map((city) => {
									if (city.type == '1') {
										this.inHighCityListLength++
									}
								})
								res2.data.items[0].poiList.map((city) => {
									if (city.type == '2') {
										this.inMediumCityListLength++;
									}
								})
							}
							break;
					}
				}


			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				})
			},
			// 点击转换时候 切换名字 并获取信息
			transformToForm() {
				if (this.toLeftData.length > 0 && this.toRightData.length &&
					this.formLeftData.length > 0 && this
					.formRightData.length > 0) {
					const tempLeft = this.formLeftData;
					const tempRight = this.formRightData;
					this.formLeftData = this.toLeftData;
					this.formRightData = this.toRightData;
					this.toLeftData = tempLeft;
					this.toRightData = tempRight;
				}
				if (this.formText !== '' && this.toText !== '') {
					let temp = this.formCityId;
					this.formCityId = this.toCityId;
					this.toCityId = temp;
					let temp2 = this.formText;
					this.formText = this.toText;
					this.toText = temp2;

					this.searchInfoByName(this.formCityId, 'Form')
					this.searchInfoByName(this.toCityId, 'To')
				} else {
					this.showToast({
						type: 'default',
						message: "请先选择出发地和目的地城市",
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.contentBox {
		display: flex;
		flex-direction: column;
		background-color: #eef1f4;
		min-height: 100vh;
		align-items: center;
		padding-bottom: 80rpx;

		.topInfo {
			position: relative;
			width: 100%;

			.topText {
				position: absolute;
				top: 40%;
				left: 50%;
				width: 100%;
				text-align: center;
				font-style: italic;
				font-weight: bold;
				z-index: 999;
				font-size: 60rpx;
				transform: translate(-50%, -50%);
				background: linear-gradient(to bottom, #ffffff, #53afff, #f0e9ef, #55aaff);
				color: transparent;
				background-clip: text;
			}
		}

		.selectInfo {
			position: relative;
			margin-top: -160rpx;
			width: 95%;
			background-color: white;
			border-radius: 15rpx;


			.topInfo {
				display: flex;
				padding: 30rpx;
				align-items: center;

				.topForm,
				.topTo {
					min-width: 214rpx;
					display: flex;
					flex-direction: column;

					.topTitle {
						color: #777;
						font-size: 24rpx;
					}

					.bottomShow {
						display: flex;
						padding-bottom: 20rpx;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #c5c5c5;

						.leftText {
							margin-top: 20rpx;
							color: #333333;
							font-size: 32rpx;
							font-weight: bold;
						}

						.rightIcon {
							margin-top: 20rpx;
							margin-left: 30rpx;
						}
					}
				}

				.transform {
					margin-top: 30rpx;
					padding: 0 70rpx 0 70rpx;
				}
			}

			.bottomInfo {
				padding: 0 30rpx 30rpx 30rpx;
				color: #c5c5c5;
				font-size: 24rpx;

				.explainText {
					display: flex;
					justify-content: flex-start;
				}
			}
		}

		.outMainInfo {
			width: 95%;
			border-radius: 8rpx;
			background-color: white;
			flex-direction: column;
			display: flex;
			margin-top: 20rpx;

			.titleInfo {
				margin: 30rpx;
				width: 95%;
				display: flex;
				align-items: center;


				.type {
					font-size: 20rpx;
					min-width: 80rpx;
					min-height: 35rpx;
					text-align: center;
					border-radius: 5rpx;
					background-color: #e50003;
					color: white;
				}

				.cityName {
					font-weight: bold;
					font-size: 28rpx;
					margin-left: 5rpx;

				}
			}

			.outCityWarning {
				display: flex;
				flex-direction: column;
				width: 95%;
				margin: 0 30rpx 30rpx;

				.topTitle {
					font-weight: bold;
					font-size: 34rpx;
				}

				.contentInfo {
					margin-top: 10rpx;
					font-size: 28rpx;
					text-indent: 40rpx;
					color: #4d4d4d;
					line-height: 60rpx;
				}
			}

			.highAndMedium {
				width: 95%;
				display: flex;
				flex-direction: column;
				margin: 0 30rpx 30rpx 20rpx;

				.topTitle {
					font-weight: bold;
					font-size: 34rpx;
					margin-bottom: 20rpx;
				}

				.mainInfo {
					margin: 0rpx 0 20rpx;
					display: flex;
					align-items: center;
					text-align: left;
					font-size: 26rpx;

				}

				.bottomInfo {

					font-size: 26rpx;
					color: #c5c5c5;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-top: 1px solid #f0f0f0;
					padding: 20rpx;
				}
			}
		}

		.inMainInfo {
			width: 95%;
			border-radius: 8rpx;
			background-color: white;
			flex-direction: column;
			display: flex;
			margin-top: 25rpx;
			align-items: center;

			.titleInfo {
				margin: 30rpx 0rpx 0;
				width: 95%;
				display: flex;
				align-items: center;
			justify-content: flex-start;

				.type {

					font-size: 24rpx;
					min-width: 80rpx;
					min-height: 35rpx;
					text-align: center;
					border-radius: 5rpx;
					background-color: #ffaa00;
					color: white;
				}

				.cityName {
					font-weight: bold;
					font-size: 28rpx;
					margin-left: 5rpx;
				}
			}

			.mainInfo {
				width: 95%;
				display: flex;
				flex-direction: column;
				margin: 0 0rpx 30rpx 0;

				.titleInfo {
					font-weight: bold;
					font-size: 36rpx;

				}

				.contentInfo {
					margin: 15rpx 30rpx 0rpx;
					font-size: 28rpx;
					text-indent: 40rpx;
					line-height: 45rpx;
					color: #4d4d4d;
				}

				.highAndMedium {
					width: 95%;
					display: flex;
					flex-direction: column;
					margin: 0 30rpx 30rpx;

					.topTitle {
						font-weight: bold;
						font-size: 34rpx;
						margin-top: 20rpx;
						margin-bottom: 20rpx;

					}

					.main {
						margin: 0rpx 0 20rpx;
						display: flex;
						align-items: center;
						text-align: left;
						font-size: 26rpx;

					}


				}

				.bottomInfo {

					font-size: 26rpx;
					color: #c5c5c5;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-top: 1px solid #f0f0f0;
					margin-top: 20rpx;
					padding: 20rpx;
				}

			}

		}

		.risk {
			transform: scale(.8);
		}

		.empty {
			margin-top: 200rpx;
			font-size: 32rpx;
			color: #a5a5a5;
		}
	}
</style>
