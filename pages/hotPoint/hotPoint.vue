<template>
	<view class="mainContent">
		<view class="content">
			<view class="topInfo">
				<view class="leftText">
					<text>热点榜</text>
				</view>
				<view class="rightText">
					每30分钟更新一次
				</view>
			</view>
			<view class="mainInfo">
				<view v-for="(item,index) in hotList" :key="item.hotWord">
					<view :class="index===0?'oneText':(index===1?'twoText':'threeText')">
						<view class="leftSquare">
							<text>{{index+1}}</text>
						</view>
						<view class="hotTextInfo">
							<u--text :lines="1" :text="item.hotWord"></u--text>

						</view>
					</view>
				</view>

			</view>
			<view class="bottomInfo">
				<text style="font-size: 26rpx;" @click="toRank">查看完整榜单</text>
				<u-icon color="#535353" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="gap">
			<u-gap height="10" bgColor="#f3f4f6"></u-gap>
		</view>
		<NormalCard :cardList="newsList" />
	</view>


</template>

<script>
	import _ from 'lodash';
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'

	export default {
		name: 'hotPoint',
		components: {
			NormalCard
		},
		data() {
			return {
				hotList: [],
				newsList: []
			}
		},
		mounted() {
			this.getHotPoint();
			eventBus.$on('reachBottomNews', (size) => {
				this.getNewsInfo(size)
			})
		},
		destroyed() {
			eventBus.$off('reachBottomNews');
		},
		methods: {
			// 热点信息
			async getHotPoint() {
				const res = await this.$API.hotPoint.getHotPointList();
				if (res) {
					this.hotList = res.data.rollHotWordList.slice(0, 3);
				}
				this.getNewsInfo();
			},
			// 获取新闻
			async getNewsInfo(size = 0) {
				const res = await this.$API.hotPoint.getNews(size);
				this.newsList = [...this.newsList, ...res.T1467284926140];
			},
			toRank() {
				uni.navigateTo({
					url: "/pages/searchRank/searchRank"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;


		.topInfo {
			padding: 0rpx 10rpx 0 10rpx;
			display: flex;
			align-items: center;
			height: 60rpx;

			.leftText {
				font-weight: 700;
				background: linear-gradient(to right, #84272d, #d9133e);
				color: transparent;
				background-clip: text;
			}

			.rightText {
				font-size: 24rpx;
				transform: scale(.9);
				color: #b1b1b1;
				margin-left: 10rpx;
				margin-top: 10rpx;
			}
		}

		.mainInfo {
			padding: 10rpx 10rpx 0 10rpx;

			.oneText,
			.twoText,
			.threeText {
				display: flex;
				flex-direction: row;
				padding-top: 25rpx;
				padding-bottom: 25rpx;
				border-bottom: 1px solid #f5f5f5;
				text-align: center;

				.leftSquare {
					width: 35rpx;
					height: 35rpx;
					border-radius: 7rpx;
					text-align: center;
					line-height: 35rpx;
					font-size: 24rpx;
					color: white;
				}

				.hotTextInfo {
					margin-left: 20rpx;
					font-size: 26rpx;
				}
			}

			.oneText .leftSquare {
				background-color: #d4113f;
			}

			.twoText .leftSquare {
				background-color: #f56b1b;
			}

			.threeText .leftSquare {
				background-color: #ffaa00;
			}
		}

		.bottomInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 25rpx;
			font-size: 30rpx;
			color: #535353;
		}


	}
</style>
