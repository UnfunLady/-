<template>
	<view class="content">

		<view class="mask">
		</view>
		<view class="header-top">
			<view class="leftButton">
				<span class="iconfont icon-faxian"></span>
			</view>
			<view class="searchInput">
				<view class="searchIcon">
					<span class="iconfont icon-fangdajing"></span>
				</view>
				<view class="searchText">
					<!-- 	<u--input color="#c1c4cf" fontSize="26rpx" placeholder=" 请输入内容" border="none">
					</u--input> -->
					<!-- <span style="color: #c1c4cf; font-size: 26rpx;">请输入搜索内容</span> -->
					<view class="swiperContentHotKey">
						<swiper :disable-touch="true" class="swiper" easing-function="easeInOutCubic" circular
							autoplay="true" :duration="1000" :interval="4000" vertical>
							<swiper-item v-for="item in hotKeyList">
								<view class=" swiper-item uni-bg-red" @click="toSearch(item.hotWord)">{{item.hotWord}}
								</view>
							</swiper-item>

						</swiper>
					</view>
				</view>
			</view>
			<view class="rightButton">
				快讯
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['hotKeyList'],
		name: "navbar",
		data() {
			return {
				title: 'navbar'
			}
		},
		onLoad() {

		},
		methods: {
			toSearch(hotWord) {
				uni.navigateTo({
					url: `/pages/searchPage/searchPage?keyword=${hotWord}`,
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.mask {
		position: absolute;
		width: 100%;
		height: 485rpx;
		// background: linear-gradient(to right, #afc6df, #acacac);
		background-color: #afc6df;

		z-index: -999;

	}

	.header-top {
		position: fixed;
		top: 0;
		display: flex;
		width: 100%;
		height: 80rpx;
		align-items: center;
		justify-content: left;
		padding-top: 20rpx;
	}

	.leftButton {
		width: 100rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 30rpx;
		color: white;

		span {
			font-size: 40rpx
		}
	}

	.searchInput {
		width: 70%;
		height: 50rpx;
		border-radius: 10rpx;
		align-items: center;
		display: flex;
		background-color: #f9f9f9;
		opacity: .9;
		margin-left: -30rpx;

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

	.rightButton {
		display: flex;
		margin-left: 30rpx;
		flex: 1;
		color: #f9f9f9;
		font-size: 28rpx
	}
</style>
