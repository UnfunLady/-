<template>
	<view>
		<view class="top">
			<view class="newsInfo" v-for="item in topList" :key="item.id">
				<view class="text">
					<view class="isTop" v-if="item.special?true:false">
						<text class="text">专题</text>
					</view>
					<u--text :lines="item.special?1:2" size="30" :text="item.title"></u--text>
				</view>
				<view class="bottomContent">
					<view class="icon textStyle">
						<text>{{item.label}}</text>
					</view>
					<view class="whichSend textStyle">
						<text>{{item.source}}</text>
					</view>
					<view class="beforeTime textStyle">
						{{getTimeGap(item)}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		async mounted() {
			const res = await this.$API.toutiaoApi.getTopNewsInfo();
			this.topList = res.data.slice(0, 3);

		},
		data() {
			return {
				topList: []
			};
		},
		methods: {
			getTimeGap(item) {
				const gapTime = new Date(item.datetime).getTime() - new Date().getTime();
				return Math.floor(Math.abs(gapTime) / 1000 / 60 / 60) < 1 ? 1 + "小时前" : (Math.floor(Math.abs(
						gapTime) / 1000 / 60 / 60) > 24 ? '大于24小时' : Math.floor(Math.abs(
							gapTime) / 1000 / 60 /
						60) +
					"小时前");
			},
		}

	}
</script>

<style lang="scss">
	.top {
		border-bottom: 1px solid #f1f1f1;
		padding: 0 15rpx 15rpx 15rpx;
		display: flex;
		flex-wrap: wrap;
		font-family: "Microsoft YaHei",
			微软雅黑,
			"MicrosoftJhengHei",
			华文细黑,
			STHeiti,
			MingLiu !important;

		.newsInfo {
			margin-top: 10rpx;
			width: 100%;

			.text {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;

				.isTop {
					font-size: 22rpx;
					margin-right: 15rpx;
					background-color: #3c9cff;
					color: white;
					text-align: center;

					border-radius: 4rpx;

					.text {
						transform: scale(.8);
					}
				}
			}

			.bottomContent {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				align-items: center;
				height: 40rpx;

				.textStyle {
					font-size: 22rpx;
					line-height: 40rpx;

				}

				.icon {
					color: #3c9cff;
				}

				.whichSend {
					color: #b0b0b0;
					margin-left: 30rpx;
				}

				.beforeTime {
					color: #b0b0b0;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
