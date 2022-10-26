<template>
	<view>
		<!-- 广州 -->
		<view class="content">
			<view class="bgImg">
				<view class="bg">
					<img src="../../static/images/weather.png"></img>
				</view>
			</view>
			<view class="weatherInfo">
				<view class="leftInfo">
					<view class="temp">

						{{weatherList.real}}
					</view>
					<view class="weatherIcon">
						<img src="../../static/images/duoyun.png" alt="">
					</view>
					<view class="detailInfo">
						<view class="type">
							{{weatherList.weather}} {{weatherList.highest}}/{{weatherList.lowest}}℃
						</view>
						<view class="windQuality">
							{{weatherList.wind}} {{weatherList.quality}}
						</view>
					</view>
					<view class="rightInfo">
						<view class="icon">
							<img src="../../static/images/changeWeather.png" alt="">
						</view>
						<view class="text">
							切换城市
						</view>
					</view>
				</view>
			</view>

			<view class="moreAction">
				<view class="actions">
					<view class="action">
						<view class="icon">
							<u-icon name="warning-fill" color="#2f8bff" size="60"></u-icon>
						</view>
						<view class="explain">
							隔离政策
						</view>
					</view>
					<view class="action">
						<view class="icon">
							<u-icon name="map-fill" color="#eb1951" size="60"></u-icon>
						</view>
						<view class="explain">
							城市疫情
						</view>
					</view>
					<view class="action">
						<view class="icon">
							<u-icon name="star-fill" color="#23c631" size="60"></u-icon>
						</view>
						<view class="explain">
							城市风景
						</view>
					</view>
					<view class="action">
						<view class="icon">
							<u-icon name="../../static/images/hesuan.svg" size="60"></u-icon>
						</view>
						<view class="explain">
							核酸检测
						</view>
					</view>

				</view>
				<view class="bottomInfo">
					<view class="line">
					</view>
					<view class="newsInfo">
						<view class="textInfo">
							本地疫情:
							<u--text :lines="1" color='#e24b00' :text="localNes[0]?localNes[0].title:'暂无信息'">
							</u--text>
						</view>
						<view class="icon">
							<u-icon name="../../static/images/right.svg" size="40"></u-icon>
						</view>
					</view>
				</view>
			</view>

		</view>
		<u-divider text="分割线" :dot="true"></u-divider>
		<view class="cardInfo">
			<NormalCard :cardList="localNes" />
		</view>
	</view>
</template>

<script>
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'

	export default {
		components: {
			NormalCard
		},
		data() {
			return {
				localNes: [],
				weatherList: {}
			}
		},
		mounted() {
			this.getWeatherInfo();
			this.getLocalNews();
			eventBus.$on("reachBottomLocalNews", (size) => {
				this.getLocalNews(size);
			})

		},
		destroyed() {
			eventBus.$off('reachBottomLocalNews');
		},
		methods: {
			// 获取本地新闻
			async getLocalNews(size = 0) {
				const res = await this.$API.locationNews.getLocalNews(size);
				if (res.code === 200) {
					this.localNes = [...this.localNes, ...res.data];

				} else {
					this.$refs.uNotify.show({
						top: 10,
						type: 'error',
						color: '#000',
						bgColor: '#e8153b',
						message: '获取本地新闻失败！',
						duration: 1000 * 2,
						fontSize: 20,
						safeAreaInsetTop: true
					})
				}
			},
			// 获取天气
			getWeatherInfo() {
				uni.request({
					url: 'http://api.tianapi.com/tianqi/index',
					method: 'GET',
					data: {
						// 天行api
						key: '3fc0a98a6f2fa29aa2c1fadbc54d6a84',
						// 城市 id  中国天气网可查
						city: '101280101',
						// 1实时 7一周
						type: 1
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.weatherList = res.data.newslist[0];
						}

					},
					fail: () => {
						this.$refs.uNotify.show({
							top: 10,
							type: 'error',
							color: '#000',
							bgColor: '#e8153b',
							message: '获取本地天气失败！',
							duration: 1000 * 2,
							fontSize: 20,
							safeAreaInsetTop: true
						})
					}
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.content {
		min-height: 350rpx;
		position: relative;

		.bgImg {
			width: 100%;
			position: absolute;

			.bg {
				position: absolute;
				top: 0;
				width: 100% !important;
				height: 250rpx;

				img {
					width: 100% !important;
					height: 200rpx;
					opacity: .5;
				}
			}

		}

		.weatherInfo {
			padding: 30rpx;
			width: 100%;
			position: absolute;
			display: flex;

			.leftInfo {
				display: flex;
				justify-content: center;
				align-items: center;

				.temp {
					color: #5f5f5f;
					font-size: 35rpx;
				}

				.weatherIcon,
				.detailInfo {
					margin-left: 20rpx;
				}

				.weatherIcon {
					img {
						width: 70rpx;

					}
				}

				.detailInfo {
					font-size: 26rpx;
					color: #5f5f5f;
				}

				.rightInfo {

					position: absolute;
					right: 10%;
					text-align: center;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.icon {
						img {
							width: 28rpx;
							margin-top: 6rpx;
						}
					}

					.text {
						margin-left: 10rpx;
						color: #5f5f5f;
					}
				}
			}
		}

		.moreAction {
			display: flex;
			flex-direction: column;
			width: 90%;
			height: 230rpx;
			border: 1px solid #f2f2f2;
			position: absolute;
			background-color: white;
			border-radius: 8rpx;
			left: 50%;
			z-index: 999;
			top: 68%;
			transform: translate(-50%, -50%);
			align-items: center;

			.actions {
				width: 100%;
				display: flex;
				justify-content: center;
				justify-content: space-around;

				.action {
					margin: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.explain {
						margin-top: 10rpx;
						color: #6ca2e5;
						font-size: 26rpx;
					}
				}
			}

			.bottomInfo {
				height: 60rpx;
				display: flex;
				justify-content: center;
				width: 100%;
				flex-direction: column;
				align-items: center;

				.line {
					width: 90%;
					margin-top: 20rpx;
					border-top: 1rpx solid #e8e8e8;
				}

				.newsInfo {
					display: flex;
					width: 90%;
					text-align: center;
					font-size: 24rpx;

					.textInfo {
						display: flex;
						margin-top: 20rpx;
						color: #6f6f6f;
						width: 93%;

						.textOneColor {
							color: red;
							margin-right: 20rpx;
						}

						.textTwoColor {
							color: orange;
						}
					}

					.icon {
						margin-top: 18rpx;
						flex: 1;
						position: absolute;
						right: 5%;
					}
				}


			}

		}
	}
</style>
