<template>
	<view class="">
		<!-- 轮播图 -->
		<NormalSwiper :swiperList="swiperList" />
		<NormalCard :cardList="normalList" />
	</view>
</template>

<script>
	import NormalSwiper from './normalSwiper/normalSwiper.vue'
	import NormalCard from './normalCard/normalCard.vue'
	import _ from 'lodash';
	import {
		eventBus
	} from '../../common/utils/utils.js'

	export default {
		name: "normalCardInfo",
		components: {
			NormalSwiper,
			NormalCard
		},
		mounted() {
			this.getPageInfo();
			this.getTopList();
			eventBus.$on('reachBottomIndex', (size) => {
				this.getReachBottomInfo(size);
			})
		},
		data() {
			return {
				swiperList: [],
				normalList: [],

			};
		},
		methods: {
			// 获取要闻信息
			getPageInfo: _.throttle(async function(size) {
				const res = await this.$API.index.getIndexPageInfo(size);
				this.normalList = [...this.normalList, ...res.T1348647853363.slice(1)]
			}, 1000),
			// 获取轮播图
			getTopList: _.throttle(async function() {
				const res = await this.$API.index.getTopListInfo();
				if (res) {
					this.swiperList = res.T1467284926140.slice(0, 3);
				}
			}, 1000),
			// 触底时
			getReachBottomInfo(size) {
				let that = this;
				let flag = null;
				if (flag) {
					return null;
				}
				flag = setTimeout(function() {
					that.getPageInfo(size);
				}, 1000)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15rpx;

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

					.explain {
						font-size: 30rpx;
						letter-spacing: 4rpx;
						font-weight: 400 !important;
						-webkit-line-clamp: 3;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.rightBox {
					display: flex;
					align-items: center;
					justify-content: center;
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


	}
</style>
