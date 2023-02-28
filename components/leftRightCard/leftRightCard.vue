<template>
	<view class="leftRightBox">
		<view class="left">
			<view class="leftItem">
				<view class="title">
					<span class="bigTitle">
						厨师课程免费分享
					</span>
					<span class="explain">
						速成学习资源免费
					</span>
				</view>
				<view class="image">
					<u--image size="88" height="180" width="180" src="../../static/images/lr_1.svg"></u--image>
				</view>
			</view>
		</view>
		<view class="right">
			<view class="rightItem">
				<view class="title">
					<span class="bigTitle">
						满足你对魔法幻想
					</span>
					<span class="explain">
						最新魔法电源推荐
					</span>
				</view>
				<view class="image">
					<u--image mode="widthFit" height="90" width="90" src="../../static/images/lr_2.svg"></u--image>
				</view>
			</view>
			<view class="rightItem">
				<view class="title">
					<span class="bigTitle">
						网红猫咪最新动态
					</span>
					<span class="explain">
						没人拒绝可爱猫咪
					</span>
				</view>
				<view class="image">
					<u--image mode="widthFit" width="90" height="90" src="../../static/images/lr_3.svg"></u--image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.leftRightBox {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		display: flex;
		padding-left: 20rpx;
		height: 280rpx;

		.left {
			width: 35%;


			.leftItem {
				display: flex;
				flex-direction: column;


				.title {

					display: flex;
					flex-direction: column;
					margin-bottom: 20rpx;
					font-size: 28rpx;

					.explain {
						font-size: 22rpx;
						margin-top: 5rpx;
						color: gray;
					}
				}
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: center;
			justify-content: space-between;

			.rightItem {
				display: flex;
				height: 134rpx;
				align-items: center;

				.title {
					display: flex;
					flex-direction: column;
					margin-bottom: 20rpx;
					font-size: 28rpx;

					.explain {
						font-size: 22rpx;
						margin-top: 5rpx;
						color: gray;
					}
				}
			}
		}
	}
</style>
