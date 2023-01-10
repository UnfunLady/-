<template>
	<view class="videoContainer">
		<view class="videoCard" v-for="(item,index) in videoList" :key="index">
			<view class="topContent">
				<view class="topImg">
					<img :src="item.fullSizeImg?item.fullSizeImg:item.cover" alt="">
				</view>
				<view class="mask">

				</view>
				<view class="playIcon">
					<img src="../../static/images/play.png">
				</view>
				<view class="videoPlayCount">
					{{transformPlayCount(item.playCount)+"次播放"}}
				</view>
				<view class="videoLength">
					{{transformVideoTime(item.length)}}
				</view>
			</view>
			<view class="bottomContent">
				<view class="topTitle">
					<u--text :lines="2" size="26rpx" :bold="true" :text="item.title"></u--text>
				</view>
				<view class="detailInfo">
					<view class="tag">
						{{item.tagList&&item.tagList.length>0?item.tagList[0].text:""}}
					</view>
					<view class="author">
						{{item.videoTopic.tname}}
					</view>
					<view class="repry">
						{{item.replyCount?item.replyCount+"人回复":""}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NTM from '../../common/utils/numbetTomillion.js'
	import GVT from '../../common/utils/getVideoTime.js'
	export default {
		props: ["videoList"],
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			transformPlayCount(value) {
				return NTM(value)
			},
			transformVideoTime(value) {
				return GVT(value)
			}
		}
	}
</script>
<style lang="less">
	.videoContainer {

		background-color: #eef1f4;
		padding-top: 10px;


		.videoCard {
			display: flex;
			flex-direction: column;
			margin: 0px 10px 15px;
			background-color: #fff;
			border-radius: 10px;
			overflow: hidden;


			.topContent {
				width: 100%;

				position: relative;


				.topImg {
					width: 100%;
					height: 400rpx;
					overflow: hidden;


					img {
						width: 100%;
						object-fit: cover !important;
					}
				}

				.playIcon {
					position: absolute;
					top: 50%;
					left: 50%;
					z-index: 99;
					transform: translate(-50%, -50%);
				}

				.videoPlayCount {
					position: absolute;
					bottom: 30rpx;
					color: #fff;
					font-size: 24rpx;
					
					left: 4%;

				}

				.videoLength {
					position: absolute;
					bottom: 30rpx;
					right: 50rpx;
					color: #fff;
					font-size: 24rpx;
				}

				.mask {
					position: absolute;
					background-color: #000000;
					opacity: .15;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				}
			}

			.bottomContent {
				display: flex;
				flex-direction: column;
				margin: 10px;
				justify-content: start;

				.topTitle {}

				.detailInfo {
					display: flex;
					margin-top: 18rpx;
					font-size: 24rpx;

					.tag {
						color: #fa0000;
						margin-right: 30rpx;
					}

					.author {
						color: #a6a8aa;
						max-width: 120rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-right: 15rpx;
					}

					.repry {
						color: #a6a8aa;
					}



				}
			}

		}
	}
</style>
