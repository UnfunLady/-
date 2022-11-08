<template>
	<view>
		<view class="content">
			<view class="cardContent" v-for="(card,index) in cardList" :key="index">
				<view class="allContent">
					<view class="leftNumberBox "
						:class="index===0?'oneNumber':(index===1?'twoNumber':(index===2?'threeNumber':''))">
						<text>{{index+1}}</text>
					</view>
					<view class="rightBox">
						<view class="topBox">
							<view class="explainBox">
								<view class="topTitle">
									<u--text size="32" :bold="true" :lines="2"
										:text="card.doc_title?card.doc_title:card.title">
									</u--text>
								</view>
								<view class="whichTime">
									<view class="videoText" v-if="card.type==='video'">
										<u--text size="22" :bold="true" color="green	" :lines="1" text="视频">
										</u--text>
									</view>

									<view class="hotValue wtext" v-if="!card.hotScore">
										<u--text size="20" :bold="true" color="red"
											:text="card.hotScore?card.hotScore+'万热度':tansformNumber(card.hotValue)+'热度'">
										</u--text>
									</view>
									<view class="who wtext">
										{{card.source}}
									</view>
									<view class="repry wtext">
										{{card.replyCount?tansformNumber(card.replyCount):tansformNumber(card.commentCount)}}回复
									</view>
								</view>
							</view>
							<view class="imageBox" v-if="card.doc_image!==''">
								<view class="maskIcon" v-if="card.type==='video'">
									<u--image :showLoading="true" src="../../static/images/play.png" width="40rpx"
										height="40rpx">
									</u--image>
								</view>
								<view class="videoTime" v-if="card.type==='video'">
									<u--text size="15" :bold="true" color="white" :lines="1"
										:text="card.videoInfo.length+'s'">
									</u--text>
								</view>
								<u--image :showLoading="true" radius="8" :src="card.doc_image?card.doc_image:card.img"
									width="6.5rem" height="5rem">
								</u--image>
							</view>
						</view>
						<view class="bottomBox" v-if="card.wondCmtContent&&card.wondCmtContent!=''">
							<view class="leftIcon">
								<u-icon name="../../static/images/repry.svg" size="40"></u-icon>
							</view>
							<view class="rightText">
								<u--text color="#666666" :lines="2" size="29" :text="card.wondCmtContent"></u--text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NTM from '@/common/utils/numbetTomillion.js'
	export default {
		props: {
			cardList: {
				type: Array,
			}
		},
		data() {
			return {

			};
		},
		methods: {
			tansformNumber(number) {
				return NTM(number)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cardContent {
		width: 100%;
		background-color: white;
		border-radius: 15rpx;
		display: flex;
		margin-top: 20rpx;


		.allContent {
			padding: 20rpx 0 20rpx 0;
			display: flex;
			width: 100%;
			justify-content: start;

			.leftNumberBox {
				font-size: 36rpx;
				padding-left: 15rpx;
				padding-right: 10rpx;
			}

			.oneNumber {
				color: #d4113f;
			}

			.twoNumber {
				color: #f56b1b;
			}

			.threeNumber {
				color: #ffaa00;
			}

			.rightBox {
				display: flex;
				margin: 0 10rpx 0 10rpx;
				flex-direction: column;
				width: 100%;

				.topBox {
					display: flex;

					.explainBox {
						display: flex;
						flex-direction: column;
						width: 100%;
						justify-content: space-between;

						.hotValue {
							min-width: 100rpx;
						}

						.whichTime {
							display: flex;
							align-items: center;

							.wtext {
								font-size: 22rpx;
								margin-left: 10rpx;
								color: #9a9a9a;
							}

							.who {
								text-overflow: ellipsis;
								overflow: hidden;
							}

							.repry {

								overflow: hidden;
							}

							.whichText {
								margin-left: 20rpx;
							}

						}
					}

					.imageBox {
						position: relative;
						padding: 0rpx 20rpx 0rpx 20rpx;

						.maskIcon {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							z-index: 999;
						}

						.videoTime {
							position: absolute;
							top: 90%;
							left: 80%;
							transform: translate(-80%, -80%);
							z-index: 999;
						}
					}


				}

				.bottomBox {
					width: 89%;
					display: flex;
					padding: 30rpx;
					margin: 20rpx 0 0rpx 0;
					border-radius: 15rpx;
					background-color: #f0f0f0;

					.rightText {
						margin-left: 20rpx;
					}
				}
			}
		}


	}
</style>
