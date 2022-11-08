<template>
	<view class="container">
		<BackTop :backTop="backTop" :isShowBackTop="isShowBackTop" />
		<Navbar :hotKeyList="hotKeyList" />
		<view class="header">
			<scroll-view scroll-x="true" class="scrollX" :scroll-into-view="tabCurrent">
				<view @tap.stop="changeActiveTopbar(item.id)" v-for="(item) in topBarList" :id="'top'+item.id"
					:key="item.id" class="scroll-view-item">
					<text :class="activeIndex===item.id?'scroll-active':''"> {{item.title}}</text>
				</view>
			</scroll-view>
			<!-- 内容 -->
			<swiper class="swiper-box-list" :style="'height:'+clientHeight+'px;'" :current="activeIndex"
				@change.stop="swiperChange">
				<swiper-item class="swiper-topic-list" v-for="item in topBarList" :key="item.id">
					<scroll-view :scroll-top="scrollTop" @scroll="scroll" @scrolltolower="reachBottom"
						@refresherrefresh.stop="onRefresh" refresher-enabled="false" :refresher-triggered="isFlash"
						refresher-background="#f5f5f5" scroll-y="true" :style="'height:'+clientHeight+'px;'">
						<view class="mainView">
							<view v-if="item.id===0&&activeIndex===0">
								<HotNews />
							</view>
							<view v-if="item.id===1&&activeIndex===1">
								<HotPoiont />
							</view>
							<view v-if="item.id===2&&activeIndex===2">
								<GuangZhou />
							</view>
							<view v-if="item.id===3&&activeIndex===3">
								<DefenseEvil />
							</view>
							<view v-if="item.id===4&&activeIndex===4">
								<FunNews />
							</view>
							<view v-if="item.id===5&&activeIndex===5">
								<Sport />
							</view>
							<view v-if="item.id===6&&activeIndex===6">
								<Finance />
							</view>
							<view v-if="item.id===7&&activeIndex===7">
								<WarNews />
							</view>
							<BottomIcon :isLoading="isLoading" v-if="(item.id!==6&&item.id!==7)" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<Tabbar />
		</view>
	</view>
</template>

<script>
	import Navbar from '@/components/navbar/navbar.vue'
	import BottomIcon from '@/components/bottomIcon/bottomIcon.vue'
	import Tabbar from '@/components/tabbar/tabbar.vue'
	import HotNews from '@/pages/hotNews/hotNews.vue'
	import HotPoiont from '@/pages/hotPoint/hotPoint.vue'
	import GuangZhou from '@/pages/locationNews/locationNews.vue'
	import DefenseEvil from '@/pages/defenseEvil/defenseEvil.vue'
	import FunNews from '@/pages/funNews/funNews.vue'
	import Sport from '@/pages/sport/sport.vue'
	import Finance from '@/pages/finance/finance.vue'
	import WarNews from '@/pages/warNews/warNews.vue'
	import BackTop from '@/components/backTop/backTop.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'
	import _ from 'lodash'
	export default {
		components: {
			Navbar,
			BackTop,
			Tabbar,
			HotNews,
			HotPoiont,
			GuangZhou,
			DefenseEvil,
			FunNews,
			Sport,
			Finance,
			BottomIcon,
			WarNews
		},
		data() {
			return {
				activeIndex: 0,
				tabCurrent: 'top',
				isFlash: false,
				isLoading: false,
				// 内容块的高度值
				clientHeight: 0,
				// 关键词
				hotKeyList: [],
				// 返回顶部
				scrollTop: 0,
				isShowBackTop: false,
				topBarList: [{
						id: 0,
						title: "要闻",
					},
					{
						id: 1,
						title: "热点",
					},
					{
						id: 2,
						title: "广州",
					}, {
						id: 3,
						title: "抗疫",
					},
					{
						id: 4,
						title: "娱乐",
					},
					{
						id: 5,
						title: "体育",
					},
					{
						id: 6,
						title: "财经",
					},
					{
						id: 7,
						title: "军事",
					},
				],

			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// rpx转px
					// 获取可视区高度
					// 减去导航栏的高度  通过upx2px转换
					this.clientHeight = res.windowHeight - uni.upx2px(390) + uni.upx2px(50);
				}
			})
		},
		onLoad() {
			this._flashing = false;
			this.sizeCount = 0;

		},
		mounted() {
			this.getHotPoint();

		},
		methods: {
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
				if (this.scrollTop > 1200) {
					this.isShowBackTop = true;
				} else {
					this.isShowBackTop = false;
				}
			},
			backTop() {
				this.scrollTop = 0;
				this.isShowBackTop = false;
			},
			// 热点信息关键字
			async getHotPoint() {
				const res = await this.$API.hotPoint.getHotPointList();
				if (res) {
					this.hotKeyList = res.data.rollHotWordList;
				}
			},
			changeActiveTopbar(id) {
				if (this.activeIndex === id) {
					return;
				}
				this.activeIndex = id
				this.tabCurrent = 'top' + id
			},
			swiperChange(e) {
				this.changeActiveTopbar(e.detail.current)
			},
			// 刷新
			onRefresh() {
				this.isFlash = true;
				if (this._flashing) return;
				this._flashing = true;
				setTimeout(() => {
					this.isFlash = false
					this._flashing = false;
				}, 1000)
			},
			// 触底判断
			reachBottom: _.throttle(function() {
				switch (this.activeIndex) {
					case 0:
						this.reachFun(40, 'reachBottomIndex');
						break;
					case 1:
						this.reachFun(20, 'reachBottomNews');
						break;
					case 2:
						this.reachFun(10, 'reachBottomLocalNews');
						break;
					case 3:
						this.reachFun(20, 'reachBottomLocalEvil');
						break;
					case 4:
						this.reachFun(20, 'reachBottomLocalFun');
						break;
					case 5:
						this.reachFun(20, 'reachBottomLocalSport');
						break;
				}

			}, 5000),
			reachFun(size, name) {
				this.sizeCount += size;
				eventBus.$emit(name, this.sizeCount)
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
				}, 2000)
			}
		}
	}
</script>

<style lang="less" scoped>
	* {
		font-family: "Microsoft YaHei", "STHeiti Light", "Trebuchet MS", Tahoma, Arial, sans-serif
	}

	.header {
		position: fixed;
		top: 140rpx;
		// 父盒子必须有宽度才能横向滑动
		width: 100%;

		.scrollX {
			width: 100%;
			white-space: nowrap;
		}

		.scroll-view-item {
			min-width: 64rpx;
			color: #fafafa;
			padding: 10rpx 30rpx;
			font-size: 32rpx;
			height: 80rpx;
			display: inline-block;
		}

		.scroll-active {
			padding: 4rpx 0;
			font-size: 34rpx;
			border-bottom: 6rpx solid #ffffff;
		}

		.bottomInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			color: #acacac;
			font-size: 26rpx;
		}
	}
</style>
