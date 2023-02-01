<template>
	<view>
		<view class="content">
			<view>
				<u-notice-bar speed="80" bgColor="#afc6df69" fontSize="25" color="white"
					style="position: fixed;z-index: 999;top: 0;right: 0;left: 0; border-radius: 5rpx;"
					:text="evilTextInfo" mode="closable">
				</u-notice-bar>
			</view>
			<view class="topInfo">
				<view class="topImg" v-show="topImgInfo!={}">
					<view class="mask">
					</view>
					<u--image :showLoading="true" shape="square" radius="10" width="100%" height="370"
						:src="topImgInfo.imgsrc" @click="click"></u--image>
					<view class="imgText">
						<u--text size="34" color="#fff" :lines="1" :text="topImgInfo.title?topImgInfo.title:'暂无最新信息'">
						</u--text>
					</view>
				</view>
				<Actions :actionsList="actionsList" />
				<!-- 				<view class="topNumbers" v-for="(item,index) in evilInfo" :key="index">
					<view class="topTitleInfo">
						<view class="title">
							{{item.epidemicInfo.title}}
						</view>
						<view class="time">
							{{item.epidemicInfo.lastUpdateTime}}
						</view>
						<view class="icon">
						</view>
					</view>
					<view class="mainDetail">
						<view class="scrollItem">
							<scroll-view scroll-x="true" class="scrollX">
								<view id="demo1" class="scroll-view-item scrollView">
									<view class="mainContent" v-for="(evil,index) in item.epidemicInfo.epidemicData"
										:key="index">
										<view class="scrollViewTitle">
											<text>{{evil.mainLabel}}</text>
										</view>
										<view class="viewNumber">
											<u-count-to color="rgb(120, 6, 31)" :start-val="30" :end-val="evil.mainNum"
												:duration="3000" :useEasing="true"></u-count-to>
										</view>
										<view class="subNum">
											昨日:
											<span style="color:red;margin-left: 8rpx;">
												<span style="color: red;">{{evil.subNum>0?'+':null}}</span>
												<u-count-to color="red" :start-val="30" :end-val="evil.subNum"
													:duration="3000" :useEasing="true"></u-count-to>
											</span>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<u-gap height="10" bgColor="#f9f9f9"></u-gap>
		<view class="card">
			<NormalCard :cardList="cardList.slice(3)" />
		</view>
	</view>
</template>

<script>
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import Actions from '@/components/actions/actions.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'

	export default {
		components: {
			NormalCard,
			Actions
		},
		data() {
			return {
				topImgInfo: {},
				evilTextInfo: "戴口罩、勤洗手，测体温、勤消毒，少聚集、勤通风  早发现、早报告、早隔离、早治疗，对自己负责，对他人负责",
				evilInfo: [],
				cardList: [],
				actionsList: [{
						id: 0,
						title: '隔离政策',
						imgsrc: '../../static/images/safe.svg',
						url: '/pages/defenseEvil_policy/defenseEvil_policy'
					},
					{
						id: 1,
						title: '辟谣一线',
						imgsrc: '../../static/images/piyao.svg',
						url: '/pages/defenseEvil_FakeNews/defenseEvil_FakeNews'
					},
					{
						id: 2,
						title: '详情信息',
						imgsrc: '../../static/images/xiangqing.svg',
						url: '/pages/defenseEvil_ChinaInfo/defenseEvil_ChinaInfo'
					},
				]
			}
		},
		mounted() {
			this.getEvilInfo();
			eventBus.$on("reachBottomLocalEvil", (start) => {
				this.getEvilInfo(start);

			})
		},
		destroyed() {
			eventBus.$off('reachBottomLocalEvil');
		},
		methods: {
			// 获取信息
			async getEvilInfo(start) {
				const res = await this.$API.defenseEvil.getEvilInfo(start);
				this.cardList = [...this.cardList, ...res.data.items];
				this.topImgInfo = this.cardList[0];
				this.evilInfo = this.cardList.slice(1, 3);
			},

		}
	}
</script>

<style scoped lang="scss">
	.content {


		.topInfo {
			display: flex;
			position: relative;
			flex-direction: column;
			align-items: center;

			.topImg {
				position: relative;
				width: 100%;
				font-size: 34rpx;

				.mask {
					position: absolute;
					background-color: #434343;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					bottom: 0;
					right: 0;
					z-index: 99;
					opacity: .3;
				}

				.imgText {
					position: absolute;
					bottom: 20rpx;
					left: 20rpx;
					color: white;
					z-index: 9999;
				}
			}

			.topActions {
				width: 100%;
				margin-top: 20rpx;
				min-height: 100rpx;
				border: 1px solid #eeeeee;
				background-color: #fdfdfd;
				border-radius: 8rpx;
				display: flex;
				flex-wrap: wrap;


				.action {
					width: 33.33%;
					margin-top: 10rpx;
					display: flex;
					font-size: 26rpx;
					align-items: center;
					color: #1f4163;

					.icon {
						padding-right: 10rpx;
					}
				}

			}

			.topNumbers {
				display: flex;
				width: 100%;
				border: 1px solid #eeeeee;
				margin-top: 20rpx;
				min-height: 200rpx;
				flex-direction: column;

				.topTitleInfo {
					display: flex;
					border-radius: 8rpx;
					width: 100%;
					line-height: 50rpx;
					height: 50rpx;

					.title {
						margin-top: 10rpx;
						margin-left: 10rpx;
						font-size: 28rpx;
						color: #3d3d3d;
						font-weight: 600;
					}

					.time {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #acacac;
						margin-left: 20rpx;
					}
				}

				.mainDetail {

					.scrollX {
						width: 100%;
						white-space: nowrap;

						.scrollView {
							display: flex;
							width: 20%;

							.mainContent {
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								margin: 20rpx;
								text-align: center;
								border-radius: 8rpx;

								.scrollViewTitle {
									font-size: 26rpx;

								}

								.viewNumber {
									margin-top: 10rpx;
									font-size: 24rpx;
									color: rgb(120, 6, 31);
								}

								.subNum {
									font-size: 22rpx;
									margin-top: 10rpx;
									transform: scale(0.8);
									color: #676767;
								}
							}
						}

					}
				}
			}
		}

	}
</style>
