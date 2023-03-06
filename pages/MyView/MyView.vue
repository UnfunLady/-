<template>
	<view class="container">
		<scroll-view scroll-y="true" :style="{height: `calc(100% + 100rpx)`}">
			<view class="topBox">
				<view class="userAvatar">
					<u-avatar style="border:6rpx solid white;" :src="userAvatar" size="140"></u-avatar>
				</view>
				<view class="userInfo">
					<view class="username">
						Unfunlady
					</view>
					<view class="config">
						<view class="configItem">
							<span>
								<u-icon name="../../static/images/level.svg" size="28"></u-icon>
							</span>
							<span>我的等级</span>
						</view>
						<view class="configItem">
							<span>
								<u-icon name="../../static/images/VIP.svg" size="28"></u-icon>
							</span>
							<span>LV1</span>
						</view>
					</view>
				</view>
				<view class="userSetting">
					<u-icon name="../../static/images/setting.svg" size="58"></u-icon>
				</view>
			</view>

			<view class="mainBox">
				<view class="leftRightBox">
					<view class="topTitle">
						<view class="left">
							<span>
								<u-icon name="../../static/images/vip1.svg" size="38"></u-icon>
							</span>
							<span class="vipText">会员中心</span>
							<span class="more">更多权益</span>
						</view>
						<view class="right">
							<span>
								<u-icon name="../../static/images/vip2.svg" size="38"></u-icon>
							</span>
							<span class="vipText">PLUS会员</span>
							<span class="more">立即开通</span>
						</view>
					</view>
					<view class="bottomInfo">
						<view class="detail">
							<view class="num">
								1986
							</view>
							<view class="title">
								我的积分
							</view>
						</view>
						<view class="detail">
							<view class="num">
								5
							</view>
							<view class="title">
								我的奖品
							</view>
						</view>
						<view class="detail">
							<view class="num">
								9798
							</view>
							<view class="title">
								成长值
							</view>
						</view>

					</view>
				</view>
			</view>
			<MyBox :actionsList="actionsList" :size="88">
				<template v-slot:clock>
					<view class="clock">
						<view class="leftIcon">
							<u-icon name="../../static/images/jifen.svg" size="88"></u-icon>
						</view>
						<view class="textInfo">
							<view class="top">
								每日签到获取积分
							</view>
							<view class="bottom">
								+5成长值(0/1)
							</view>
						</view>
						<view class="go">
							去完成
						</view>
					</view>
				</template>
			</MyBox>
			<MyBox :actionsList="actionsList1" :size="50" title="个人详情">
				<template v-slot:userDetail>
					<view class="detail">
						<view class="detailItem">
							<view class="dnum">
								50
							</view>
							<view class="dtext">
								关注
							</view>
						</view>
						<view class="detailItem">
							<view class="dnum">
								23
							</view>
							<view class="dtext">
								粉丝
							</view>
						</view>
						<view class="detailItem">
							<view class="dnum">
								10
							</view>
							<view class="dtext">
								动态
							</view>
						</view>
					</view>
				</template>

			</MyBox>

			<view class="ad" @tap="close" v-show="showAd">
				<u--image mode="widthFit" :showLoading="true" src="../../static/images/ad.jpg" width="100%" radius="8">
				</u--image>
				<view class="close">
					×
				</view>
			</view>

		</scroll-view>
	</view>


</template>

<script>
	import MyBox from "@/components/myBox/myBox.vue"
	export default {
		components: {
			MyBox
		},
		data() {
			return {
				showAd: true,
				userAvatar: "../../static/images/avatar.jpg",
				actionsList: [{
						id: 1,
						iconPath: "../../static/images/my1.svg",
						detailText: "每日签到"
					},
					{
						id: 2,
						iconPath: "../../static/images/m2.svg",
						detailText: "积分商城"
					},
					{
						id: 3,
						iconPath: "../../static/images/my3.svg",
						detailText: "关注的人"
					},
					{
						id: 4,
						iconPath: "../../static/images/my5.svg",
						detailText: "我的成就"
					},
				],
				actionsList1: [{
						id: 1,
						iconPath: "../../static/images/history.svg",
						detailText: "历史记录"
					},
					{
						id: 2,
						iconPath: "../../static/images/zan.svg",
						detailText: "我的点赞"
					},
					{
						id: 3,
						iconPath: "../../static/images/pinglun.svg",
						detailText: "我的评论"
					},
					{
						id: 4,
						iconPath: "../../static/images/shoucang.svg",
						detailText: "我的收藏"
					},
					{
						id: 5,
						iconPath: "../../static/images/tiezi.svg",
						detailText: "我发布的"
					},
				]
			}
		},
		methods: {
			close() {
				this.showAd = false;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #efefef;
		height: 100vh;

		.topBox {
			display: flex;
			height: 300rpx;
			background: linear-gradient(to bottom, #aec8dd 10%, #dfe6e8);
			align-items: center;
			padding-top: 40rpx;
			position: relative;

			.userAvatar {
				padding: 0rpx 40rpx 0rpx 40rpx;
			}

			.userInfo {
				display: flex;

				flex-flow: column wrap;

				.username {
					color: #0a0a0b;
				}

				.config {
					margin-top: 20rpx;
					display: flex;

					.configItem {
						display: flex;
						align-items: center;
						height: 40rpx;
						line-height: 40rpx;
						margin-right: 20rpx;
						border-radius: 50rpx;
						background-color: #fff;
						font-size: 20rpx;
						padding: 0 10rpx 0 10rpx;

						span {
							margin-right: 10rpx;
						}
					}

				}

			}

			.userSetting {
				position: absolute;
				right: 30rpx;
				top: 130rpx;
			}

		}

		.mainBox {
			position: relative;
			z-index: 99;
			background-color: #fff;
			margin: -30rpx 20rpx 0rpx 20rpx;
			border-radius: 8rpx;

			.leftRightBox {

				padding: 0rpx 0rpx 20rpx;
				width: 100%;

				.topTitle {
					display: flex;
					align-items: center;
					width: 100%;

					@mixin leftRight {
						display: flex;
						width: 50%;
						justify-content: space-around;
						align-items: center;
						padding: 20rpx;

						.vipText {
							font-size: 26rpx;
							margin-left: 10rpx;
						}

						.more {
							font-size: 20rpx;
							transform: scale(.8);
							background-color: #eacdaa;
							padding: 5rpx;
							width: 120rpx;
							text-align: center;
							border-radius: 15rpx;

						}
					}



					.left {
						@include leftRight;
						background-color: #fff;
						border-radius: 6rpx;
					}

					.right {
						@include leftRight;
						color: white;
						background-color: #464c63;
						border-radius: 6rpx;

						.more {
							background-color: #464c63;
							border: 1rpx solid #fff;
						}
					}
				}

			}

			.bottomInfo {
				display: flex;

				.detail {
					margin-top: 26rpx;
					width: 33.33%;
					display: flex;
					align-items: center;
					flex-flow: column wrap;

					.num {
						font-weight: bold;
						color: #7d797f;
					}

					.title {
						margin-top: 10rpx;
						font-size: 28rpx;
					}
				}
			}

		}
	}

	.clock {
		margin-top: 10rpx;
		background-color: #f9f9f9;
		display: flex;
		padding: 20rpx;
		align-items: center;
		position: relative;

		.leftIcon {}

		.textInfo {
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;

			.top {
				font-size: 28rpx;
			}

			.bottom {
				color: #ef9e63;
				font-size: 22rpx;

			}
		}

		.go {
			font-size: 28rpx;
			position: absolute;
			color: #ef9e63;
			right: 20rpx;
		}
	}

	.detail {
		display: flex;
		justify-content: space-around;

		.detailItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			width: 33.33%;
			padding: 20rpx;

			.dnum {
				font-weight: bold;
				font-size: 36rpx;
			}

			.dtext {
				margin-top: 10rpx;
				font-size: 30rpx;
			}
		}

		.detailItem:after {
			position: absolute;
			right: 0;
			width: 2rpx;
			color: #d9d9d9;
			content: "|";
			top: 50%;

			transform: translate(-50%, -50%);
		}

		.detailItem:last-child::after {
			content: "";
		}


	}

	.ad {
		margin: 30rpx;
		position: relative;

		.close {
			position: absolute;
			top: 10rpx;
			width: 50rpx;
			height: 50rpx;
			text-align: center;
			right: 10rpx;
			color: #fff;
			border-radius: 50%;
			background-color: #00488a;
		}
	}
</style>
