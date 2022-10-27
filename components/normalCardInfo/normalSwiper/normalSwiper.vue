<template>
	<view class="swiperContainer">
		<view class="swiperContent">
			<div class="swiperImage">
				<!-- <u-swiper previousMargin="40" nextMargin="40" :autoplay="false" height="350" circular width="750rpx"
					class="swiperList" :list="swiperList" /> -->
				<swiper class="swiper" @change="changeSwiper" circular previous-margin="40rpx" next-margin="40rpx"
					:autoplay="false">
					<swiper-item :class="activeIndex===index?'active':''" v-for="(item,index) in swiperList"
						:key="item.postid">
						<view class="swiper-item ">
							<u--image :showLoading="true" width="100%" shape="square" height="300rpx"
								:src="item.imgsrc">
							</u--image>
						</view>
						<div class="explainInfo">
							<view class="infoText">
								<div class="explainIcon">
									<span><img src="../../../static/images/hotPoint.png" width="20rpx" alt=""></span>
									<text style="margin-left: 10rpx;">{{item.TAG?item.TAG:"今日要闻"}}</text>
									<div class="moreAction">
										<text style="margin-right: 5rpx;margin-top: -10rpx;">更多</text>
										<span><img src="../../../static/images/right.png" width="16rpx" alt=""></span>
									</div>
								</div>
							</view>
							<div class="bottomInfo">
								<div class="title">
									{{item.digest===""?item.title:item.digest}}
								</div>
								<div class="whichInfo">
									<div class="which">
										{{item.source}}
									</div>
									<div class="some">
										{{item.replyCount?item.replyCount+"回复":null}}
									</div>
									<div class="time">
										{{ getTimeGap(item)}}
									</div>
								</div>
							</div>
						</div>
					</swiper-item>
				</swiper>
			</div>

		</view>

	</view>
</template>

<script>
	export default {
		props: ['swiperList'],
		data() {
			return {
				activeIndex: 0
			}
		},
		mounted() {

		},
		methods: {
			getTimeGap(item) {
				const gapTime = new Date(item.mtime).getTime() - new Date().getTime();
				return Math.floor(Math.abs(gapTime) / 1000 / 60 / 60) < 1 ? 1 + "小时前" : Math.floor(Math.abs(gapTime) /
					1000 / 60 / 60) + "小时前";
			},
			changeSwiper(e) {
				this.activeIndex = e.detail.current
			}
		},

	}
</script>

<style scoped lang="scss">
	.swiperContainer {
		border-radius: 10rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #ececec;

	}

	.swiperContent {
		position: relative;
		// box-shadow: 10rpx 20rpx 10rpx -14rpx #cacaca;
		height: 100%;

		.swiperImage {
			width: 100%;
			top: 0;


			.swiper-item {

				width: 100%;
				display: inline-block;
				padding: 0 10rpx 0 10rpx;

				img {
					border-radius: 20rpx !important;
				}
			}
		}

		.explainInfo {
			.infoText {
				position: absolute;
				width: 100%;
				z-index: 999;
				top: 0;
				display: flex;
				padding: 0 10rpx 10rpx 20rpx;

				.explainIcon {
					padding-top: 20rpx;
					color: white;
					font-size: 26rpx;
					display: flex;

					.moreAction {
						top: 20rpx;
						display: flex;
						position: absolute;
						right: 10%;

						align-items: center;

						img {
							width: 32rpx;
						}


					}
				}
			}

			.bottomInfo {
				// display: flex;
				position: absolute;
				width: 100%;
				z-index: 999;
				bottom: 3%;
				color: white;

				.title {
					font-size: 28rpx;
					font-weight: 600 !important;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					padding-left: 30rpx;
					padding-right: 10rpx;
				}

				.whichInfo {
					display: flex;
					font-size: 22rpx;
					padding: 10rpx 20rpx 0 10rpx;

					div {
						margin-left: 15rpx;
					}
				}
			}
		}

	}

	.active {
		position: absolute;

	}
</style>
