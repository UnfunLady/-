<template>
	<view>
		<view class="cardContent" v-for="(card,index) in searchResultList" :key="index"
			:class="card.imgurl.length>1?'cardContentFlexD':''">
			<view class="leftBox">
				<view class="topInfo">
					<view class="videoType" v-if="card.skipType=='video'">
						<view style="transform: scale(.9);">视频</view>
					</view>
					<view class="title" v-html="card.title">
						<!-- <u--text :lines="2" :text="card.title"></u--text> -->
					</view>
				</view>
				<view class="bottomInfo" :class="card.imgurl.length>1?'bottomInfoImgs':''">
					<view class="which">
						{{card.source}}
					</view>
					<view class="time">
						{{getTimeGap(card)}}
					</view>
					<view class="repry">
						{{card.replyCount?card.replyCount:0}}回复
					</view>
				</view>
			</view>
			<view class="rightBox" :class="card.imgurl.length>1?'rightBoxImgs':''">
				<view class="maskIcon" v-if="card.skipType=='video'">
					<u--image :showLoading="true" src="../../static/images/play.png" width="40rpx" height="40rpx">
					</u--image>
				</view>
				<u--image v-for="(img,index) in card.imgurl" :key="index" :showLoading="true" :src="img" width="215rpx"
					height="170rpx" radius="8">
				</u--image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['searchResultList'],
		data() {
			return {
				keyWord: "",

			};
		},
		mounted() {

		},
		onLoad(e) {
			this.keyWord = e.keyWord
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
		}
	}
</script>

<style lang="scss" scoped>
	.cardContentFlexD {
		flex-direction: column;
	}

	.cardContent {
		padding: 20rpx 10rpx 20rpx 10rpx;
		margin: 0 20rpx 20rpx 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		position: relative;
		justify-content: space-around;

		.leftBox {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 15rpx;

			.topInfo {
				display: flex;
				width: 100%;

				.videoType {
					flex: 1;
					text-align: center;
					min-width: 50rpx;
					max-width: 50rpx;
					margin-top: 10rpx;
					margin-right: 10rpx;
					font-size: 20rpx;
					background-color: red;
					line-height: 30rpx;
					height: 30rpx;
					border-radius: 5rpx;
					color: white;
				}

				.title {
					/* 1.溢出隐藏 */
					overflow: hidden;
					/* 2.用省略号来代替超出文本 */
					text-overflow: ellipsis;
					/* 3.设置盒子属性为-webkit-box  必须的 */
					display: -webkit-box;
					/* 4.-webkit-line-clamp 设置为2，表示超出2行的部分显示省略号，如果设置为3，那么就是超出3行部分显示省略号 */
					-webkit-line-clamp: 2;
					/* 5.字面意思：单词破坏：破坏英文单词的整体性，在英文单词还没有在一行完全展示时就换行  即一个单词可能会被分成两行展示 */
					word-break: break-all;
					/* 6.盒子实现多行显示的必要条件，文字是垂直展示，即文字是多行展示的情况下使用 */
					-webkit-box-orient: vertical;
					padding-bottom: 20px;
				}
			}

			.bottomInfoImgs {
				position: absolute;
				bottom: 15rpx;
			}

			.bottomInfo {
				display: flex;
				color: #999999;
				font-size: 20rpx;
				margin-top: 20rpx;


				.which,
				.time,
				.repry {
					margin-right: 20rpx;
				}
			}
		}

		.rightBoxImgs {
			margin: 10rpx 15rpx 40rpx 15rpx;
		}

		.rightBox {
			display: flex;
			justify-content: space-between;
			margin-left: 15rpx;
			margin-right: 15rpx;
			position: relative;
		}

		.maskIcon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 999;
		}

	}
</style>
