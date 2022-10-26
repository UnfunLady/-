<template>
	<view>
		<view class="top">
			<view class="newsInfo" v-for="item in topList" :key="item.id">
				<view class="text">
					<view class="isTop" v-if="item.isSpecial=='true'?true:false">
						专题
					</view>
					<u--text :lines="item.isSpecial=='true'?1:2" size="30" :text="item.title"></u--text>
				</view>
				<view class="bottomContent">
					<view class="icon textStyle">
						<text>置顶</text>
					</view>
					<view class="whichSend textStyle">
						<text>{{item.whichSend}}</text>
					</view>
					<view class="beforeTime textStyle">
						{{item.beforeTime}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				topList: [{
						id: 0,
						title: "马斯克就台海议题发言，外交部给予积极评价，我大使也表示感谢",
						whichSend: "外交部",
						beforeTime: "2小时前",
						isSpecial: "false"
					},
					{
						id: 1,
						title: "一中学收取学生20元“树叶费”给植被保暖 当地教育局回应",
						whichSend: "焦点视频",
						beforeTime: "1小时前",
						isSpecial: "true"
					},
					{
						id: 2,
						title: "福奇警告“新变异毒株”！",
						whichSend: "今日头条",
						beforeTime: "12小时前",
						isSpecial: "false"
					},
				]
			};
		},

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
					width: 66rpx;
					font-size: 22rpx;
					background-color: #3c9cff;
					color: white;
					text-align: center;
					border-radius: 4rpx;

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
