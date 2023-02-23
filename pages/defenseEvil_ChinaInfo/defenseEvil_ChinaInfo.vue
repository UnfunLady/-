<template>
	<view>
		<view class="content">
			<view class="topInfo">
				<view class="topImg">
					<u--image :showLoading="true" src="../../static/images/fangyi.png" width="100%" height="422"
						@click="click"></u--image>
				</view>
				<view class="topText">
					<h1>「国内疫情」</h1>
					<h2>肺炎疫情实时播报</h2>
				</view>
			</view>
			<view class="topCard">
				<view style="margin-top: 10rpx; font-size: 34rpx; font-weight: bold;">今日疫情简讯</view>
				<view class="topInfo">
					<view class="cardInfo" v-if="todayInfo.today">
						<view class="title">
							<h4>新增确诊</h4>
						</view>
						<view class="number">

							<h2>{{todayInfo.today.confirm}}</h2>
						</view>
					</view>
					<view class="cardInfo" v-if="todayInfo.total">
						<view class="title">
							<h4>累计确诊</h4>

						</view>
						<view class="number">

							<h2>{{todayInfo.total.confirm}}</h2>
						</view>
					</view>
				</view>
				<view class="bottomInfo">
					<view class="title">
						{{firstLastUpdateTime}}
					</view>
					<div class="explain">
						<text style="color: #bc1f00"> 数据来源:官方渠道公开数据</text>
					</div>
				</view>
			</view>

			<view class="detailCard">
				<view class="carTabs" @click="active">
					<view class="tabs " :class="tabActive===1?'active':''">
						全国疫情数据(含港澳台)
					</view>
					<view class="tabs" :class="tabActive===2?'active':''">
						{{ipCityName}}疫情数据
					</view>
				</view>
				<view class="cardData" v-if="tabActive===1&&chinaCardInfo.length>0">
					<view class="card">
						<view class="cardItem" v-for="(item,index) in chinaCardInfo" :key="item.id">
							<view class="cardTitle cardText">
								<text :style="{color:item.color}"> {{item.title}}</text>
							</view>
							<view class="cardNumber cardText">
								<u-count-to :startVal="30" :color="item.color" fontSize="40" :endVal="item.oneText">
								</u-count-to>
							</view>
							<view class="cardGap cardText">
								<text style="color: #8b8b8b;font-size: 20rpx;">较昨日:</text>
								<text
									:style="{color: item.color,fontSize: 20+'rpx'}">{{item.twoText>0?'+':(item.twoText===0?'':'-')}}</text>
								<u-count-to :startVal="30" fontSize="18" :color="item.color" :endVal="item.twoText">
								</u-count-to>
							</view>
						</view>
					</view>
					<view class="bottomExplain">
						<view class="time">
							{{firstLastUpdateTime}}
						</view>
						<view class="source" style="color: #bc1f00">
							数据来源：官方渠道公开数据
						</view>
					</view>
				</view>
				<view class="cardData" v-if="tabActive===2">
					<view class="card">
						<view class="cardItem" v-for="(item,index) in ipCityData" :key="item.id">
							<view class="cardTitle cardText">
								<text :style="{color:item.color}"> {{item.title}}</text>
							</view>
							<view class="cardNumber cardText">
								<u-count-to :startVal="30" :color="item.color" fontSize="40" :endVal="item.oneText">
								</u-count-to>
							</view>
							<view class="cardGap cardText">
								<text style="color: #8b8b8b;font-size: 20rpx;">较昨日:</text>

								<text
									:style="{color: item.color,fontSize: 20+'rpx'}">{{item.twoText>0?'+':(item.twoText===0?'':'-')}}</text>
								<u-count-to :startVal="30" fontSize="18" :color="item.color" :endVal="item.twoText">
								</u-count-to>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="mapInfo">
				<view class="mapExplain">
					国内疫情示例图
				</view>
				<view class="mapCard" ref="chinaMap" id="chartone">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	import '@/static/outJS/china.js'
	export default {
		data() {
			return {
				todayInfo: {},
				chinaCardInfo: [],
				firstLastUpdateTime: 0,
				tabActive: 1,
				mapData: [],
				ipCityCode: 0,
				ipCityName: '',
				ipCityData: []

			};
		},
		mounted() {
			this.getInitDataInfo()
		},
		methods: {
			randomData() {
				return Math.round(Math.random() * 100);
			},
			transformFontSize(fontsize) {
				// 获取屏幕宽度
				const width = window.screen.width
				const ratio = width / 1920
				// 取下整
				return parseInt(fontsize * ratio)
			},
			async getInitDataInfo() {
				// 获取时间戳
				const t = new Date().getTime() * 2;
				console.log();
				const res = await this.$API.defenseEvilChinaApi.getChinaInfo(t);
				if (res.data.chinaTotal) {
					// 获取Ip城市编号
					const res1 = await this.$API.defenseEvilPolicyApi.getIpLocation()
					this.ipCityCode = res1.result.administrativeCode;
					// 数据整理
					this.todayInfo = res.data.chinaTotal;
					this.firstLastUpdateTime = res.data.lastUpdateTime;
					this.chinaCardInfo = [{
							id: 0,
							title: '境外输入',
							oneText: this.todayInfo.total.input,
							twoText: this.todayInfo.today.input,
							color: '#ffa352'
						},
						{
							id: 1,
							title: '无症状感染者',
							oneText: this.todayInfo.extData.noSymptom,
							twoText: this.todayInfo.extData.incrNoSymptom,
							color: '#791618'
						},

						{
							id: 2,
							title: '现有确诊',
							oneText: this.todayInfo.total.confirm - this.todayInfo.total.heal - this.todayInfo
								.total.dead,
							twoText: this.todayInfo.today.storeConfirm,
							color: '#e44a3d'
						},
						{
							id: 3,
							title: '累积确诊',
							oneText: this.todayInfo.total.confirm,
							twoText: this.todayInfo.today.confirm,
							color: '#a31d13'
						},
						{
							id: 4,
							title: '累计死亡',
							oneText: this.todayInfo.total.input,
							twoText: this.todayInfo.today.input,
							color: '#333333'
						},
						{
							id: 5,
							title: '累计治愈',
							oneText: this.todayInfo.total.heal,
							twoText: this.todayInfo.today.heal,
							color: '#34aa9e'
						},
					]
					this.mapData = res.data.areaTree[2].children.map((city) => {
						// ip城市疫情信息
						city.children.map((ccity) => {
							if (ccity.id == this.ipCityCode) {
								this.ipCityName = city.name;
								this.ipCityData = [{
										id: 0,
										title: '累积确诊',
										oneText: city.total.confirm,
										twoText: city.today.confirm,
										color: '#a31d13'
									},
									{
										id: 1,
										title: '累计死亡',
										oneText: city.total.dead,
										twoText: city.today.dead,
										color: '#333333'
									},
									{
										id: 2,
										title: '累计治愈',
										oneText: city.total.heal,
										twoText: city.today.heal,
										color: '#34aa9e'
									},
								]
							}
						})
						const cityData = {
							name: city.name,
							value: city.total.confirm - city.total.heal - city.total.dead,
						}
						return cityData
					})


				}

				this.initData()

			},
			active() {
				this.tabActive === 1 ? this.tabActive = 2 : this.tabActive = 1;
			},
			initData() {
				var optionMap = {
					backgroundColor: '#fcfcfc',
					title: {
						text: '全国疫情分布图',
						left: 10,
						y: '5%',
						x: 'center'
					},

					tooltip: {
						backgroundColor: 'rgba(0,0,0,0.5)',
						padding: 0,
						borderWidth: 0,
						trigger: 'item',
						formatter: function(val) {
							return `
<div style="padding:15px"><span style="color: #fff;font-size:12px">所在城市：${val.data.name}</span>
<br/>
<span style="color: #fff;margin-top:20px;font-size:12px">确诊人数：${val.data.value} 人</span></div>`
						}
					},

					//左侧小导航图标
					visualMap: {
						show: true,
						x: 'left',
						y: 'bottom',
						textStyle: {
							fontSize: '20px',
						},
						pieces: [{
							gte: 999,
							label: ">=1000",
							color: "#772526"
						}, {
							gt: 499,
							lt: 999,
							label: "500-999",
							color: "#bb3937"
						}, {
							gt: 99,
							lt: 499,
							label: "100-499",
							color: "#d56355"
						}, {
							gt: 9,
							lt: 99,
							label: "10-99",
							color: "#e9a188",
						}, {
							gt: 0,
							lt: 9,
							label: "1-9",
							color: "#faebd2"
						}, {
							lte: 0,
							label: "0",
							color: "#ffffff"
						}, ],

					},

					//配置属性
					series: [{
						zoom: 1.2,
						roam: true,
						name: '确诊人数',
						type: 'map',
						map: 'china',
						label: {
							show: true, //省份名称，
							fontSize: this.transformFontSize(35),


						},
						itemStyle: {
							borderWidth: .3,
							borderColor: 'rgba(0,0,0,.3)',
							color: (params) => {
								if (params.data && params.data.value >= 1000) {
									return '#fff'
								}

							}
						},
						data: this.mapData.map((params) => {
							if (params.value && params.value >= 1000) {
								params.label = {
									color: "#ff0004"
								}
							}

							return params
						}) //数据
					}]
				};
				//初始化echarts实例
				var myChart = echarts.init(document.querySelector('.mapCard'));
				myChart.setOption(optionMap);
				window.onresize = function() {
					myChart.resize();
				};
			}
		}
	}
</script>

<style lang="scss">
	.content {
		min-height: 100vh;

		.topInfo {
			position: relative;

			.topText {
				position: absolute;
				bottom: 0;
				top: 30%;
				left: 8%;
				color: white;
			}
		}

		.topCard {
			position: relative;
			width: 90%;
			background-color: white;
			margin: -100rpx auto;
			border-radius: 6rpx;
			padding-top: 10rpx;
			box-shadow: 0 0 20px #b9b9b9;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.topInfo {
				display: flex;

				.cardInfo {
					display: flex;
					padding: 10rpx 30rpx 30rpx;
					align-items: center;

					.title {
						min-width: 100rpx;
						font-size: 26rpx;
					}

					.number {
						color: #ff5a0e;
						margin-left: 20rpx;
						font-size: 28rpx;
					}
				}

			}

			.bottomInfo {
				display: flex;
				width: 100%;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.title {
					margin: 0 20rpx;
					color: #a1a1a1;
					font-size: 22rpx;
				}

				.explain {
					margin: 0 20rpx;
					color: #a1a1a1;
					font-size: 22rpx;
				}
			}
		}

		.detailCard {
			width: 90%;
			background-color: white;
			position: relative;
			margin: 140rpx auto;
			border-radius: 15rpx !important;
			box-shadow: 0 0 20px #b9b9b9;
			overflow: hidden;

			.carTabs {
				display: flex;
				justify-content: space-around;
				width: 100%;

				.tabs {
					padding-top: 20rpx;
					width: 50%;
					text-align: center;
					height: 60rpx;
					font-size: 28rpx;
					background-color: #f1f1f1;
				}

				.active {
					background-color: #fff;
				}
			}

			.cardData {
				display: flex;
				flex-direction: column;

				.card {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					justify-content: center;

					.cardItem {
						width: 27%;
						display: flex;
						flex-direction: column;
						padding: 20rpx 20rpx 20rpx;
						text-align: center;


						.cardText {
							margin: 8rpx;
						}

						.cardTitle {

							font-size: 28rpx;
							font-weight: bold;
						}

						.cardNumber {
							font-size: 40rpx;
						}

						.cardGap {
							font-size: 24rpx;
						}
					}
				}

				.bottomExplain {
					display: flex;
					justify-content: space-around;
					margin-bottom: 20rpx;

					.time {
						font-size: 22rpx;
						color: #a1a1a1;
					}

					.source {
						font-size: 22rpx;
						color: #a1a1a1;
					}
				}
			}
		}

		.mapInfo {

			// margin-top: -100rpx;
			margin-top: -100rpx;
			height: 800rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 20rpx;

			.mapExplain {

				position: relative;
				height: 104rpx;
				padding: 0 32rpx 0 54rpx;
				font: 700 34rpx/104rpx -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
				color: #333;
			}

			.mapExplain::before {
				content: "";
				position: absolute;
				left: 32rpx;
				top: 38rpx;
				width: 8rpx;
				height: 38rpx;
				background: #cf2b1e;
			}

			.mapCard {
				width: 100%;
				height: 800rpx;
				display: inline;
				border: 1px solid #e7e7e7;
			}


		}
	}
</style>
