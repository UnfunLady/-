<template>
	<view>
		<view class="content">
			<view class="topImg">
				<u--image :showLoading="true" width="100%" height="370" src="../../static/images/piyao1.png">
				</u--image>
				<view class="searchInput">
					<view class="searchIcon">
						<span class="iconfont icon-fangdajing"></span>
					</view>
					<view class="searchText">
						<view class="swiperContentHotKey">
							<swiper :disable-touch="true" class="swiper" easing-function="easeInOutCubic" circular
								autoplay="true" :duration="1000" :interval="3500" vertical>
								<swiper-item v-for="(fakeNew,index) in fakeNewsSearchList" :key="index">
									<view class=" swiper-item uni-bg-red" @click="toSearch(fakeNew.title)">
										{{fakeNew.title}}
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<scroll-view class="scroll-view_H" scroll-y="true" :style="'height:'+clientHeight+'px;'"
				@scrolltolower="reachBottom">
				<view>
					<view class="mainInfo" v-for="(item,index) in fakeNewsList" :key="index">
						<view class="cardInfo">
							<view class="titleInfo">
								<view class="topTitle">
									{{item.title}}
								</view>
								<view class="bottomTime">
									{{item.ptime}}
								</view>
							</view>
							<view class="imgInfo">
								<u--image :showLoading="true" :src="item.imgsrc" radius="8" width="30vw" height="160">
								</u--image>
							</view>
						</view>
					</view>
				</view>

				<view style="padding: 50rpx;">
					<BottomIcon :isLoading="isLoading" />
				</view>

				<!-- <view class="bottomContent" v-if="searchResultList.length>0&&!hasMore">
					<span>已无更多数据...</span>
				</view> -->
			</scroll-view>


		</view>
	</view>
</template>

<script>
	import BottomIcon from '@/components/bottomIcon/bottomIcon.vue'
	export default {
		components: {
			BottomIcon
		},
		data() {
			return {
				fakeNewsSearchList: [],
				fakeNewsList: [],
				isLoading: false,
				clientHeight: 0,
				limit: 12,
				offset: 0,
			};
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// rpx转px
					// 获取可视区高度
					// 减去导航栏的高度  通过upx2px转换
					this.clientHeight = res.windowHeight;
				}
			})
		},
		mounted() {
			this.getFakeNew()
			this.getFakeListNews()
		},
		methods: {
			async getFakeNew() {
				const res = await this.$API.defenseEvilFakeNewsApi.getFakeNews()
				this.fakeNewsSearchList = res.data.items
			},
			async getFakeListNews(limit = this.limit, offset = this.limit) {
				const res = await this.$API.defenseEvilFakeNewsApi.getFakeList(limit, offset);
				if (res.data.items) {
					this.fakeNewsList = [...this.fakeNewsList, ...res.data.items];
					this.isLoading = false;
				}
			},
			reachBottom() {
				this.isLoading = true;
				this.limit += 12;
				this.offset += 12;
				this.getFakeListNews()
			},
			toSearch(title) {
				uni.navigateTo({
					url: `/pages/defenseEvil_FakeNews/fakeNewsSearch/fakeNewsSearch?keyWord=${title}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;

		background-color: #eef1f4;
		min-height: 100vh;

		.searchInput {
			width: 70%;
			height: 80rpx;
			border-radius: 50rpx;
			align-items: center;
			display: flex;
			opacity: .9;
			margin-left: -30rpx;
			position: absolute;
			top: 245rpx;
			left: 0;
			margin: 0 auto;
			right: 0;
			background: #fff;

			.searchIcon {
				color: #dedede;
				padding-left: 20rpx;
			}

			.searchText {
				padding-left: 10rpx;
				height: 34rpx;
				width: 100%;
				font-size: 12rpx;
				overflow: hidden;

				.swiperContentHotKey {
					color: #999999;
					width: 100%;

				}

			}
		}


		.mainInfo {
			display: flex;
			width: 90%;
			margin: 20rpx auto;
			padding: 20rpx;
			background-color: white;
			border-radius: 10rpx;

			.cardInfo {
				display: flex;

				.titleInfo {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.topTitle {
						line-height: 50rpx;
					}

					.bottomTime {
						font-size: 26rpx;
						color: #959595;
					}
				}

			}
		}
	}
</style>
