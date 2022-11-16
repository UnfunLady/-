<template>
	<view>
		<view class="content" v-for="item in cardList">
			<view class="videoMainInfo" v-if="item.videoTopic">
				<view class="videoSourceInfo">
					<view class="topInfo">
						<view class="avatar">

							<u--image :showLoading="true" shape="circle" :src="item.videoTopic.topic_icons"
								width="60rpx" height="60rpx">
							</u--image>
						</view>
						<view class="nickname">
							<text>{{item.videoTopic.tname}}</text>
						</view>
						<view class="iconV" v-if="item.videoTopic.certificationImg">
							<u--image :showLoading="true" shape="circle" :src="item.videoTopic.certificationImg"
								width="35rpx" height="35rpx">
							</u--image>
						</view>
					</view>
					<view class="titleInfo">
						<view class="titleText" style="margin-top: 10rpx;">
							{{item.title}}
						</view>
					</view>
					<view class="videoInfo">
						<view class="videoCoverImage">

							<img v-lazy="item.videoinfo.cover==''?item.videoinfo.firstFrameImg:item.videoinfo.cover"
								alt="">
							<view class="repryText">
								<view class="">
									<text>{{item.replyCount}}条回复</text>
								</view>
								<view class="repryConfig">
									...
								</view>
							</view>
							<view class="playIcon">
								<u--image width="60rpx" height="60rpx" :showLoading="true"
									src="../../static/images/play.png">
								</u--image>
							</view>
							<div class="videoTime">
								{{getVideoTimeFun(item.length)}}
							</div>
						</view>
					</view>
				</view>
			</view>
			<div v-else class="mainInfo">
				<div class="leftRightBox" :style="(item.imgextra||item.imgsrc3gtype=='3')?'flex-direction:column':null">
					<div class="leftBox">
						<div class="explain" style="margin: 0  0 15rpx 0;">
							<view class="special" v-if="item.TAG||item.specialID||item.imgextra||item.skipType">
								{{item.TAG?item.TAG:item.specialID?'专题':(item.skipType=='live'?'直播':(item.skipType=='video')?'视频':(item.skipType=='photoset')?'图集':item.imgextra.length>0?'图集':null)}}
							</view>
							<text class="explainText">
								<text>{{item.title}}</text>
							</text>
						</div>
					</div>

					<div class="rightBox" v-if="item.imgsrc||item.picInfo">
						<view class="imgs">
							<view class="extraImg" v-if="item.imgextra" style="display: flex;">
								<u--image v-for="exImg in item.imgextra" class="rightImg" width="234rpx" height="173rpx"
									radius="6" :src="exImg.imgsrc">
									<template v-slot:loading>
										<u-loading-icon color="#90c7ff"></u-loading-icon>
									</template>
								</u--image>
							</view>

							<view v-if="item.imgsrc3gtype=='3'" style="width: 100%;">
								<u--image class="rightImg" width="100%" height="335rpx" radius="6"
									:src="item.imgsrc?item.imgsrc:(item.picInfo[0] ? item.picInfo[0].url : null)">
									<template v-slot:loading>
										<u-loading-icon color="#90c7ff"></u-loading-icon>
									</template>
								</u--image>
							</view>
							<view style="flex: 1;" class="" v-else>
								<u--image class="rightImg" width="234rpx" height="173rpx" radius="6"
									:src="item.imgsrc?item.imgsrc:(item.picInfo[0] ? item.picInfo[0].url : null)">
									<template v-slot:loading>
										<u-loading-icon color="#90c7ff"></u-loading-icon>
									</template>
								</u--image>
							</view>
						</view>
					</div>
				</div>
				<div class="bottomBox">
					<div class="which">
						<!-- <text v-if="item.modelmode" style="color:red;margin: 0 10rpx 0rpx 0;">图集</text> -->
						<text>{{item.source}}</text>
					</div>
					<div class="repry">
						<text>{{item.replyCount?item.replyCount:(item.tcount?item.tcount:item.commentCount)}}回复</text>
					</div>
					<div class="time">
						<!-- {{item.mtime}} -->
						{{getTimeGap(item)}}
					</div>
					<div class="control">
						...
					</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	import getVideoTime from '../../../common/utils/getVideoTime.js'
	export default {
		props: [
			"cardList"
		],
		data() {
			return {}
		},
		mounted() {

		},
		methods: {
			getTimeGap(item) {
				if (item.lmodify) {
					const gapTime = new Date(item.lmodify).getTime() - new Date().getTime();
					return Math.floor(Math.abs(gapTime) / 1000 / 60 / 60) < 1 ? 1 + "小时前" : (Math.floor(Math.abs(
							gapTime) / 1000 / 60 / 60) > 24 ? '大于24小时' : Math.floor(Math.abs(
								gapTime) / 1000 / 60 /
							60) +
						"小时前");
				} else {
					if (item.ptime) {
						const gapTime = new Date(item.ptime).getTime() - new Date().getTime();
						return Math.floor(Math.abs(gapTime) / 1000 / 60 / 60) < 1 ? 1 + "小时前" : (Math.floor(Math.abs(
								gapTime) / 1000 / 60 / 60) > 24 ? '大于24小时' : Math.floor(Math.abs(
									gapTime) / 1000 / 60 /
								60) +
							"小时前");
					}
				}
			},
			getVideoTimeFun(t) {
				return getVideoTime(t)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 10rpx 15rpx 15rpx 15rpx;

		.mainInfo {
			width: 100%;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #f1f1f1;

			.leftRightBox {
				display: flex;
				flex-wrap: nowrap;
				width: 100%;
				padding-right: 10rpx;

				.leftBox {
					flex: 1;
					padding: 0 15rpx 0 0;

					.explain {
						font-size: 30rpx;
						font-weight: 400 !important;
						display: flex;
						justify-content: start;

						.special {
							text-align: center;
							padding: 0 8rpx 0;
							min-width: 50rpx;
							max-width: 120rpx;
							height: 35rpx;
							font-size: 22rpx;
							transform: scale(.9);
							line-height: 35rpx;
							background-color: red;
							border-radius: 4rpx;
							color: white;
							margin-right: 10rpx;
						}

						.explainText {
							-webkit-line-clamp: 3;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							overflow: hidden;
							text-overflow: ellipsis;
						}



					}
				}

				.rightBox {
					display: flex;
					align-items: center;
					justify-content: space-between;



					.imgs {
						display: flex;
						width: 100%;
						flex-wrap: nowrap;

						.rightImg {
							margin: 5rpx;

						}
					}
				}
			}

			.bottomBox {
				width: 100%;
				position: relative;
				flex: 1;
				display: flex;
				justify-content: start;
				align-items: center;
				padding-bottom: 20rpx;

				div {
					padding-left: 10rpx;
					font-size: 24rpx;
					color: #b0bbb0;
				}

				.control {
					position: absolute;
					right: 3%;
				}

			}
		}

		.videoSourceInfo {
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #f1f1f1;

			.topInfo {
				align-items: center;
				display: flex;

				.avatar {}

				.nickname {
					margin-left: 20rpx;
					font-size: 28rpx;
					font-weight: 600;
				}

				.iconV {
					margin-left: 20rpx;
				}
			}

			.videoCoverImage {

				display: flex;
				flex-direction: column;
				position: relative;
				opacity: .9;

				img: {
					min-width: 100rpx;
					min-height: 100rpx;

				}

				img:first-child {
					margin-top: 10rpx;
					border-radius: 10rpx;

				}
			}



			.playIcon {
				position: absolute;
				top: 45%;
				left: 50%;
				transform: translate(-50%, -45%);
				margin: auto;
			}

			.videoTime {
				min-width: 180rpx;
				position: absolute;
				text-align: center;
				overflow: hidden;
				top: 80%;
				left: 99%;
				transform: translate(-85%, -99%);
				z-index: 9999;
				font-size: 28rpx;
				color: white;
			}

			.repryText {
				position: relative;
				align-items: center;
				display: flex;
				font-size: 26rpx;
				margin-left: 2%;
				padding: 20rpx 0 20rpx 0;
				color: #b0bbb0;

			}

			.repryConfig {
				position: absolute;
				font-size: 26rpx;
				right: 20rpx;
				vertical-align: middle;
			}

		}

	}
</style>
