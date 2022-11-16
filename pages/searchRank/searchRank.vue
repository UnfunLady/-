<template>
	<view>
		<view class="content">
			<BackTop :isShowBackTop="backTop" :backTop="toTop" />
			<view class="topImg">
				<view class="maskText">
					<view class="topText">
						资讯热榜
					</view>
					<view class="bottomText">
						全网热点 一榜打尽
					</view>
				</view>
				<u--image :showLoading="true" src="../../static/images/redian.png" width="100%" height="310"></u--image>
			</view>
			<view class="mainInfo">
				<view class="topTabs">
					<NormalTabs :list="rankList" :change="changeTab" />
				</view>
				<view class="cardInfo">
					<swiper :style="'height:'+clientHeight+'px;'" :current="activeIndex" @change="swiperChange"
						:interval="3000" :duration="1000">
						<swiper-item v-for="item in rankList" :key="item.id">
							<scroll-view @scroll="scroll" :scroll-top="scrollTop" @scrolltolower="reachBottom(item)"
								:style="'height:'+clientHeight+'px;'" :scroll-y="true">
								<view class="mainView">
									<view v-if="item.id===0&&activeIndex===0">
										<HotRepry />
									</view>
									<view v-if="item.id===1&&activeIndex===1">
										<HotNews />
									</view>
									<view v-if="item.id===2&&activeIndex===2">
										<HotSearch />
									</view>
									<view v-if="item.id===3&&activeIndex===3">
										<HotVideo />
									</view>
								</view>

							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NormalTabs from '@/components/normalTabs/normalTabs.vue'
	import BackTop from '@/components/backTop/backTop.vue'
	// import BottomIcon from '@/components/bottomIcon/bottomIcon.vue'
	import HotRepry from './hotRepry/hotRepry.vue'
	import HotNews from './hotNews/hotNews.vue'
	import HotSearch from './hotSearch/hotSearch.vue'
	import HotVideo from './hotVideo/hotVideo.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'
	export default {
		components: {
			NormalTabs,
			BackTop,
			// BottomIcon,
			HotRepry,
			HotNews,
			HotSearch,
			HotVideo
		},
		data() {
			return {
				rankList: [{
					id: 0,
					name: '热议榜',
				}, {
					id: 1,
					name: '热闻榜',
				}, {
					id: 2,
					name: '热搜榜'
				}, {
					id: 3,
					name: '视频榜'
				}, ],
				activeIndex: 0,
				clientHeight: 0,
				scrollTop: 0,
				backTop: false,
				isLoading: false

			};
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// rpx转px
					// 获取可视区高度
					// 减去导航栏的高度  通过upx2px转换
					this.clientHeight = res.windowHeight - uni.upx2px(434) + uni.upx2px(50);
				}
			})
		},
		methods: {
			changeTab(current) {
				this.activeIndex = current.index;
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop;
				if (this.scrollTop > 1200) {
					this.backTop = true;
				} else {
					this.backTop = false;
				}
			},
			swiperChange(current) {
				this.activeIndex = current.detail.current;
				eventBus.$emit('swiperChange', this.activeIndex);
			},
			reachBottom(item) {

			},
			toTop() {
				this.scrollTop = 0
				this.backTop = false;

			}
		}
	}
</script>

<style lang="scss">
	.content {
		.topImg {
			position: relative;

			.maskText {

				// position: absolute;
				.topText {
					position: absolute;
					top: 43%;
					left: 50%;
					z-index: 999;
					transform: translate(-50%, -50%);
					color: white;
					font-size: 80rpx;

					text-align: center;
					font-style: italic;
					font-weight: 900;

				}

				.bottomText {
					position: absolute;
					top: 70%;
					left: 50%;
					font-style: italic;
					font-weight: 900;
					z-index: 999;
					font-size: 34rpx;

					transform: translate(-50%, -50%);
					background: linear-gradient(to right, #ffffff, #ffffff, #fefefe, #ffffff);
					color: transparent;
					background-clip: text;

				}
			}
		}

		.mainInfo {
			.topTabs {
				width: 100%;

			}
		}
	}
</style>
